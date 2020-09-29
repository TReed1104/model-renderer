// Renderable Object Class Definition
class RenderableObject {
    constructor(shader, vertices, indices, colour) {
        this.vertices = vertices;
        this.indices = indices;
        this.colours = colour;

        this.vao = webgl.createVertexArray();
        webgl.bindVertexArray(this.vao);

        // Create a new buffer for the vertices
        this.vertexBuffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, this.vertexBuffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(this.vertices), webgl.STATIC_DRAW);
        webgl.vertexAttribPointer(0, 3, webgl.FLOAT, false, 0, 0);
        webgl.enableVertexAttribArray(0);

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

        webgl.bindVertexArray(null);
    }

    update(deltaTime) {
    }

    draw(shader) {
        shader.enable()
        webgl.bindVertexArray(this.vao);
        webgl.drawElements(webgl.TRIANGLES, this.indices.length, webgl.UNSIGNED_SHORT, 0);
        webgl.bindVertexArray(null);
        shader.disable()
    }
}
