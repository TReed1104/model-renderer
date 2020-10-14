import { webgl } from "./Webgl.js"
import matrix4 from "./Matrix4.js"
import Texture from "./Texture.js"

export default class Mesh {
    constructor(indices, colour, uvs, normals, position, rotation, scale, textureFileLocation) {
        // Cache the object data
        this.vertices = vertices;
        this.indices = indices;
        this.colours = colour;
        this.uvs = uvs;
        this.normals = normals;

        // Texturing
        this.isObjectUVMapped = false;
        this.texture = new Texture(textureFileLocation, textureFileLocation);

        // Generate the Vertex array object
        this.vertexArray = this.generateVertexArray(this.vertices, this.indices, this.colours, this.uvs, this.normals);

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

    generateVertexArray(vertices, indices, colours, uvs, normals) {
        // Create a vertex array object
        let vertexArrayObject = webgl.createVertexArray();
        webgl.bindVertexArray(vertexArrayObject);
        // Check we have vertices and indices for drawing an object
        if (vertices == undefined || vertices == null || indices == undefined || indices == null) {
            webgl.bindVertexArray(null);
            return null
        }
        // Check if the Vertex data was supplied
        if (vertices != undefined || vertices != null) {
            // Check there is data in the array
            if (vertices.length > 0) {
                // Create a new buffer for the vertices
                webgl.bindBuffer(webgl.ARRAY_BUFFER, webgl.createBuffer());
                webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(vertices), webgl.STATIC_DRAW);
                webgl.vertexAttribPointer(0, 3, webgl.FLOAT, false, 0, 0);
                webgl.enableVertexAttribArray(0);
                webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
            }
        }
        // Check if the Indices data was supplied
        if (indices != undefined || indices != null) {
            // Check there is data in the array
            if (indices.length > 0) {
                // Create a new buffer for the indices
                webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, webgl.createBuffer());
                webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), webgl.STATIC_DRAW);
                webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
            }
        }
        // Check if the colour data was supplied
        if (colours != undefined || colours != null) {
            // Check there is data in the array
            if (colours.length > 0) {
                // Create a new buffer for the colour data
                webgl.bindBuffer(webgl.ARRAY_BUFFER, webgl.createBuffer());
                webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(colours), webgl.STATIC_DRAW);
                webgl.vertexAttribPointer(1, 3, webgl.FLOAT, false, 0, 0);
                webgl.enableVertexAttribArray(1);
                webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
            }
        }
        // Check if the texture uv data was supplied
        if (uvs != undefined || uvs != null) {
            // Check there is data in the array
            if (uvs.length > 0) {
                // Create a new buffer for the UV data
                webgl.bindBuffer(webgl.ARRAY_BUFFER, webgl.createBuffer());
                webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(uvs), webgl.STATIC_DRAW);
                webgl.vertexAttribPointer(2, 2, webgl.FLOAT, false, 0, 0);
                webgl.enableVertexAttribArray(2);
                webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
                this.isObjectUVMapped = true;
            }
            else {
                this.isObjectUVMapped = false;
            }
        }
        // Check if the surface normal data was supplied
        if (normals != undefined || normals != null) {
            // Check there is data in the array
            if (normals.length > 0) {
                console.log("TODO: Surface Normals Buffer setup");
            }
        }
        // Unbind the VAO
        webgl.bindVertexArray(null);
        return vertexArrayObject
    }
}
