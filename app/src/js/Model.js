import { webgl } from "./Webgl.js"
import matrix4 from "./Matrix4.js"
import Mesh from "./Mesh.js"
import { OBJ as objLoader } from "webgl-obj-loader"

export default class Model {
    constructor(id, config) {
        // Identifier for the object
        this.id = id;
        
        // Parse the config data object, if any required fields are missing set a default value
        (config.shaderIndex != undefined) ? this.shaderIndex = config.shaderIndex : this.shaderIndex = 0;
        (config.enabled != undefined) ? this.enabled = config.enabled : this.enabled = false;
        (config.modelFile != undefined) ? this.loadModels(config.modelFile) : this.meshes = [];
        (config.position != undefined) ? this.position = config.position : this.position = [0, 0, 0];
        (config.rotation != undefined) ? this.rotation = config.rotation : this.rotation = [0, 0, 0];
        (config.scale != undefined) ? this.scale = config.scale : this.scale = [1, 1, 1];

        // Setup the Model transformation matrix -> (T*R*S)
        this.baseMatrix = matrix4.create(1);
        this.translationMatrix = matrix4.translate(this.baseMatrix, this.position);
        this.rotationMatrix = matrix4.rotate(this.baseMatrix, this.rotation);
        this.scaleMatrix = matrix4.scale(this.baseMatrix, this.scale);
        this.modelMatrix = matrix4.multiply(matrix4.multiply(this.translationMatrix, this.rotationMatrix), this.scaleMatrix);
    }

    loadModels(models) {
        // Create/clear the mesh array
        this.meshes = [];
        // webgl-obj-loaders web-request to load the .obj files
        objLoader.downloadMeshes(models, (meshes) => {
            // For loaded file, parse the data to our Mesh class
            for (let key of Object.keys(meshes)) {
                // Shallow copy for access speed
                let mesh = meshes[key];

                // Setup vertex colouring for the mesh
                let vertexColours = [];
                mesh.vertices.forEach(vertex => {
                    vertexColours.push(1);
                });

                // For texturable section of the model, spawn a mesh
                mesh.indicesPerMaterial.forEach(indices => {
                    this.meshes.push(new Mesh(mesh.vertices, indices, vertexColours, mesh.textures, mesh.normals, [0, 0, 0], [0, 0, 0], [1, 1, 1], "content/textures/cubetexture.png"));
                });
            }
        });
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