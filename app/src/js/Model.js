import { webgl } from "./Webgl.js"
import matrix4 from "./Matrix4.js"
import Mesh from "./Mesh.js"

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
        this.modelMatrix = matrix4.multiply(matrix4.multiply(this.scaleMatrix, this.rotationMatrix), this.translationMatrix);
    }

    async loadModel(modelFileLocation) {
        // Load the file
        const objFileRequest = await fetch(modelFileLocation);
        // Get the raw text from the loaded file
        const objFileString = await objFileRequest.text();
        
        // Key words
        const objKeys = {
            vertices: "v",
            uvs: "vt",
            normals: "vn",
            groupName: "g",
            face: "f",
            material: "usemtl"
        }
        // The data read from the file
        var meshData = {
            vertices: [],
            colours: [],
            uvs: [],
            normals: []
        }
        // Array of the indices data
        let meshes = []
        
        // Split the file into an array of its lines
        let fileLines = objFileString.split("\n");
        // Iterate through the file line-by-line
        fileLines.forEach(line => {
            // Check the line doesn't start with a comment
            if (!line.startsWith("#")) {
                let lineSplit = line.trim();        // Trim the whitespace from the start and end of the line
                lineSplit = line.split(/\s+/);      // Split the line by any whitespace between characters - spaces, tabs, double space etc.
                // If the line key is for the object vertices
                if (lineSplit[0] == objKeys.vertices) {
                // If the line key is for the texture UVs
                else if (lineSplit[0] == objKeys.uvs) {
                }
                // If the line key is for the vertex normal
                else if (lineSplit[0] == objKeys.normals) {
                }
                else if (lineSplit[0] == objKeys.groupName) {
                }
                else if (lineSplit[0] == objKeys.material) {
                }
            }
        });
        console.log(meshes);
        console.log(meshData);
        console.log(fileLines);

        // Test meshes
        var vertices = [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,];
        var colours = [5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
        var indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
        var uvs = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
        var normals = []
        this.meshes.push(new Mesh(vertices, indices, colours, uvs, normals, [0, 0, 0], [0, 0, 0], [1, 1, 1], "content/textures/cubetexture.png"));
        this.meshes.push(new Mesh(vertices, indices, colours, uvs, normals, [2, 0, 0], [0, 0, 0], [1, 1, 1], "content/textures/cubetexture.png"));
    }

    update(deltaTime) {
        this.translationMatrix = matrix4.translate(this.baseMatrix, this.position);
        this.rotationMatrix = matrix4.rotate(this.baseMatrix, this.rotation);
        this.scaleMatrix = matrix4.scale(this.baseMatrix, this.scale);
        this.modelMatrix = matrix4.multiply(matrix4.multiply(this.scaleMatrix, this.rotationMatrix), this.translationMatrix);
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