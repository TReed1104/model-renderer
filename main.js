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
    // Vertices
    let vertices = [
        -0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.5, 0.5, 0.0
    ];
    // Indices
    let indices = [3, 2, 1, 3, 1, 0];
    // Colours
    let colours = [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1,];

    // Create a new buffer for the vertices
    let vertexBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(vertices), webgl.STATIC_DRAW);
    webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
    // Create a new buffer for the indices
    let indicesBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), webgl.STATIC_DRAW);
    webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, null);
    // Create a new buffer for the colour data
    let colourBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, colourBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(colours), webgl.STATIC_DRAW);
    webgl.bindBuffer(webgl.ARRAY_BUFFER, null);

    let basicShaderProgram = compileShaderProgram(vertexShaderCode, fragmentShaderCode);

    // Start a Render
    webgl.viewport(0, 0, canvas.width, canvas.height);
    webgl.clearColor(0.5, 0.5, 0.5, 0.9);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
    webgl.useProgram(basicShaderProgram);
        webgl.enable(webgl.DEPTH_TEST);
            webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
                webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
                    // Get the attribute location for the coordinates
                    let coordShaderLocation = webgl.getAttribLocation(basicShaderProgram, "vertexPosition");
                    webgl.vertexAttribPointer(coordShaderLocation, 3, webgl.FLOAT, false, 0, 0);
                    webgl.enableVertexAttribArray(coordShaderLocation);
                    webgl.bindBuffer(webgl.ARRAY_BUFFER, colourBuffer);
                        // Get the 
                        let colourShaderLocation = webgl.getAttribLocation(basicShaderProgram, "vertexColour");
                        webgl.vertexAttribPointer(colourShaderLocation, 3, webgl.FLOAT, false,0,0) ;
                        webgl.enableVertexAttribArray(colourShaderLocation);
                        // Draw the vertices
                        webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_SHORT, 0);
                    webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
                webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, null);
            webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
        webgl.disable(webgl.DEPTH_TEST);
    webgl.useProgram(null);
}

main();