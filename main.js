// Prep the canvas and get our webgl context
var canvas = document.getElementById('main-canvas')
var webgl = canvas.getContext('webgl2');

// Basic Vertex Shader Source Code
var vertexShaderCode = '\
    attribute vec3 vertexPosition; \
    attribute vec3 vertexColour; \
    varying vec3 fragmentColour; \
    void main(void) { \
        gl_Position = vec4(vertexPosition, 1.0); \
        fragmentColour = vertexColour; \
    }';
// Basic Fragment Shader Source Code
var fragmentShaderCode = '\
    precision mediump float; \
    varying vec3 fragmentColour; \
    void main(void) { \
        gl_FragColor = vec4(fragmentColour, 1.); \
    }';


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

    draw(shader) {
        webgl.useProgram(shader);
            webgl.bindVertexArray(this.vao);
                webgl.drawElements(webgl.TRIANGLES, this.indices.length, webgl.UNSIGNED_SHORT, 0);
            webgl.bindVertexArray(null);
        webgl.useProgram(null);
    }
}

function compileShaderProgram(vertexSource, fragmentSource) {
    // Compile the Vertex Shader
    let vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
    webgl.shaderSource(vertexShader, vertexSource);
    webgl.compileShader(vertexShader);
    // Compile the Fragment Shader
    let fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
    webgl.shaderSource(fragmentShader, fragmentSource);
    webgl.compileShader(fragmentShader);
    // Link together the shader objects
    let shaderProgram = webgl.createProgram();
    webgl.attachShader(shaderProgram, vertexShader);
    webgl.attachShader(shaderProgram, fragmentShader);
    webgl.linkProgram(shaderProgram);
    // Return the created shaderProgram
    return shaderProgram
}

// Main function
function main() {
    let basicShaderProgram = compileShaderProgram(vertexShaderCode, fragmentShaderCode);
    
    // Create a basic GameObject
    let vertices = [ -0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0 ];
    let indices = [ 3, 2, 1, 3, 1, 0, ];
    let colours = [ 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, ];
    let basicObject = new RenderableObject(basicShaderProgram,vertices, indices, colours);

    // Start a Render
    webgl.viewport(0, 0, canvas.width, canvas.height);
    webgl.clearColor(0.5, 0.5, 0.5, 0.9);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
    webgl.enable(webgl.DEPTH_TEST);

    basicObject.draw(basicShaderProgram);

    webgl.disable(webgl.DEPTH_TEST);
}

main();