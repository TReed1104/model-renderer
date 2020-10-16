import { webgl } from "./Webgl.js"
import matrix4 from "./Matrix4.js"
import Mesh from "./Mesh.js"
import { Mesh as objLoaderMesh } from  "webgl-obj-loader"

export default class Model {
    constructor(id, shaderIndex, modelFileLocation, position, rotation, scale) {
        // Identifier for the object
        this.id = id;

        // Index in the shader register of the shader for this object
        (shaderIndex != undefined) ? this.shaderIndex = shaderIndex : this.shaderIndex = 0;

        // Model details
        this.modelFileLocation = modelFileLocation;
        this.meshes = [];

        this.loadModel(this.modelFileLocation);

        // Setup the transformation data
        this.position = position
        this.rotation = rotation
        this.scale = scale

        // Setup the model matrix
        this.baseMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        this.translationMatrix = matrix4.translate(this.baseMatrix, this.position);
        this.rotationMatrix = matrix4.rotate(this.baseMatrix, this.rotation);
        this.scaleMatrix = matrix4.scale(this.baseMatrix, this.scale);
        this.modelMatrix = matrix4.multiply(matrix4.multiply(this.translationMatrix, this.rotationMatrix), this.scaleMatrix);
    }

    async loadModel(modelFileLocation) {
        // Load the file
        const objFileRequest = await fetch(modelFileLocation);
        // Get the raw text from the loaded file
        const objFileString = await objFileRequest.text();
        // Load the model data using webgl-obj-loader
        let model = new objLoaderMesh(objFileString);

        // Setup vertex colouring for the mesh
        let vertexColours = [];
        model.vertices.forEach(vertex => {
            vertexColours.push(1);
        });

        // For texturable section of the model, spawn a mesh
        model.indicesPerMaterial.forEach(indices => {
            this.meshes.push(new Mesh(model.vertices, indices, vertexColours, model.textures, model.normals, [0, 0, 0], [0, 0, 0], [1, 1, 1], "content/textures/cubetexture.png"));
        })

    }

    update(deltaTime) {
        this.translationMatrix = matrix4.translate(this.baseMatrix, this.position);
        this.rotationMatrix = matrix4.rotate(this.baseMatrix, this.rotation);
        this.scaleMatrix = matrix4.scale(this.baseMatrix, this.scale);
        this.modelMatrix = matrix4.multiply(matrix4.multiply(this.translationMatrix, this.rotationMatrix), this.scaleMatrix);
        // Update the positions of all the meshes
        this.meshes.forEach(mesh => {
            mesh.update(deltaTime, this.modelMatrix);
        });
    }

    draw(shader, projectionMatrix, viewMatrix) {
        shader.enable();
        this.meshes.forEach(mesh => {
            webgl.bindVertexArray(mesh.vertexArray);
            // Link to the MVP matrix in the shader
            webgl.uniformMatrix4fv(webgl.getUniformLocation(shader.program, "modelMatrix"), false, mesh.modelMatrix);
            webgl.uniformMatrix4fv(webgl.getUniformLocation(shader.program, "viewMatrix"), false, viewMatrix);
            webgl.uniformMatrix4fv(webgl.getUniformLocation(shader.program, "projectionMatrix"), false, projectionMatrix);

            // Check if object has been configure for texturing and there is a loaded texture
            let enableTexturing = (mesh.texture.isLoaded && mesh.isObjectUVMapped);
            webgl.uniform1i(webgl.getUniformLocation(shader.program, "enableTextures"), enableTexturing);
            if (enableTexturing) {
                webgl.activeTexture(webgl.TEXTURE0);
                webgl.bindTexture(webgl.TEXTURE_2D, mesh.texture.webglTexture);
                webgl.uniform1i(webgl.getUniformLocation(shader.program, "textureSampler"), 0);
            }
            // Render the object
            webgl.drawElements(webgl.TRIANGLES, mesh.indices.length, webgl.UNSIGNED_SHORT, 0);
            webgl.bindVertexArray(null);
            // Clean up the bound texture
            if (enableTexturing) {
                webgl.bindTexture(webgl.TEXTURE_2D, null);
            }
        });
        shader.disable()
    }
}