// Renderable Object Class Definition
class RenderableObject {
    constructor(id, vertices, indices, colour) {
        // Identifier for the object
        this.id = id

        // Index in the shader register of the shader for this object
        this.shaderIndex = 0;

        // Vertex data for rendering the object
        this.vertices = vertices;
        this.indices = indices;
        this.colours = colour;

        // Create the Vertex array object for the object
        this.vao = webgl.createVertexArray();
        webgl.bindVertexArray(this.vao);
        // Create a new buffer for the vertices
        this.vertexBuffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vertexBuffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(this.vertices), webgl.STATIC_DRAW);
        webgl.vertexAttribPointer(0, 3, webgl.FLOAT, false, 0, 0);
        webgl.enableVertexAttribArray(0);
        webgl.bindBuffer(webgl.ARRAY_BUFFER, null);

        // Create a new buffer for the indices
        this.indicesBuffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), webgl.STATIC_DRAW);

        // Create a new buffer for the colour data
        this.colourBuffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, this.colourBuffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(this.colours), webgl.STATIC_DRAW);
        webgl.vertexAttribPointer(1, 3, webgl.FLOAT, false, 0, 0);
        webgl.enableVertexAttribArray(1);
        webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
        webgl.bindVertexArray(null);

        // Setup the transformation data
        this.position = [0, 0, 0]
        this.rotationAngle = [0, 0, 0]
        this.scale = [1, 1, 1]

        // Setup the model matrix
        this.modelMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        this.transformedModelMatrix = matrix4.translate(this.modelMatrix, this.position[0], this.position[1], this.position[2]);
        this.transformedModelMatrix = matrix4.xRotate(this.transformedModelMatrix, this.rotationAngle[0]);
        this.transformedModelMatrix = matrix4.yRotate(this.transformedModelMatrix, this.rotationAngle[1]);
        this.transformedModelMatrix = matrix4.zRotate(this.transformedModelMatrix, this.rotationAngle[2]);
        this.transformedModelMatrix = matrix4.scale(this.transformedModelMatrix, this.scale[0], this.scale[1], this.scale[2]);
    }

    update(deltaTime) {
        // Transform the model with the current model data
        this.transformedModelMatrix = matrix4.translate(this.modelMatrix, this.position[0], this.position[1], this.position[2]);
        this.transformedModelMatrix = matrix4.xRotate(this.transformedModelMatrix, this.rotationAngle[0]);
        this.transformedModelMatrix = matrix4.yRotate(this.transformedModelMatrix, this.rotationAngle[1]);
        this.transformedModelMatrix = matrix4.zRotate(this.transformedModelMatrix, this.rotationAngle[2]);
        this.transformedModelMatrix = matrix4.scale(this.transformedModelMatrix, this.scale[0], this.scale[1], this.scale[2]);
    }

    draw(shader, projectionMatrix, viewMatrix) {
        // Enable the shader for the object
        shader.enable()
        webgl.bindVertexArray(this.vao);
        webgl.uniformMatrix4fv(webgl.getUniformLocation(shader.program, "mMatrix"), false, this.transformedModelMatrix);
        // Render the object
        webgl.drawElements(webgl.TRIANGLES, this.indices.length, webgl.UNSIGNED_SHORT, 0);
        webgl.bindVertexArray(null);
        // Disable the shader for the object - Make sure its cleared for the next object
        shader.disable()
    }
}
