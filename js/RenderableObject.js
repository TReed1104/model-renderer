// Imports
import { webgl } from "./Webgl.js"
import { matrix4 } from "./Matrix4.js"

// Renderable Object Class Definition
export default class RenderableObject {
    constructor(id, vertices, indices, colour, uvs, normals, position, rotation, scale) {
        // Identifier for the object
        this.id = id

        // Index in the shader register of the shader for this object
        this.shaderIndex = 0;

        // Cache the object data
        this.vertices = vertices;
        this.indices = indices;
        this.colours = colour;
        this.uvs = uvs;
        this.normals = normals;

        // Generate the Vertex array object
        this.vertexArray = this.generateVertexArray(this.vertices, this.indices, this.colours, this.uvs, this.normals);

        // Setup the transformation data
        this.position = position
        this.rotation = rotation
        this.scale = scale

        // Setup the model matrix
        this.modelMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        this.transformedModelMatrix = matrix4.translate(this.modelMatrix, this.position[0], this.position[1], this.position[2]);
        this.transformedModelMatrix = matrix4.xRotate(this.transformedModelMatrix, this.rotation[0]);
        this.transformedModelMatrix = matrix4.yRotate(this.transformedModelMatrix, this.rotation[1]);
        this.transformedModelMatrix = matrix4.zRotate(this.transformedModelMatrix, this.rotation[2]);
        this.transformedModelMatrix = matrix4.scale(this.transformedModelMatrix, this.scale[0], this.scale[1], this.scale[2]);
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
                console.log("TODO: Texture UV Buffer setup");
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

    update(deltaTime) {
        // Transform the model with the current model data
        this.transformedModelMatrix = matrix4.translate(this.modelMatrix, this.position[0], this.position[1], this.position[2]);
        this.transformedModelMatrix = matrix4.xRotate(this.transformedModelMatrix, this.rotation[0]);
        this.transformedModelMatrix = matrix4.yRotate(this.transformedModelMatrix, this.rotation[1]);
        this.transformedModelMatrix = matrix4.zRotate(this.transformedModelMatrix, this.rotation[2]);
        this.transformedModelMatrix = matrix4.scale(this.transformedModelMatrix, this.scale[0], this.scale[1], this.scale[2]);
    }

    draw(shader, projectionMatrix, viewMatrix) {
        // Enable the shader for the object
        shader.enable()
        webgl.bindVertexArray(this.vertexArray);
        // Link to the MVP matrix in the shader
        webgl.uniformMatrix4fv(webgl.getUniformLocation(shader.program, "pMatrix"), false, projectionMatrix);
        webgl.uniformMatrix4fv(webgl.getUniformLocation(shader.program, "vMatrix"), false, viewMatrix);
        webgl.uniformMatrix4fv(webgl.getUniformLocation(shader.program, "mMatrix"), false, this.transformedModelMatrix);
        // Render the object
        webgl.drawElements(webgl.TRIANGLES, this.indices.length, webgl.UNSIGNED_SHORT, 0);
        webgl.bindVertexArray(null);
        // Disable the shader for the object - Make sure its cleared for the next object
        shader.disable()
    }
}
