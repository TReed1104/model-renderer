function main() {
    // Shader Source Code
    let vertexShaderCode = '\
        attribute vec3 vertexPosition; \
        attribute vec3 vertexColour; \
        varying vec3 fragmentColour; \
        void main(void) { \
            gl_Position = vec4(vertexPosition, 1.0); \
            fragmentColour = vertexColour; \
        }';
    let fragmentShaderCode = '\
        precision mediump float; \
        varying vec3 fragmentColour; \
        void main(void) { \
            gl_FragColor = vec4(fragmentColour, 1.); \
        }';
    // Prep the canvas and get our webgl context
    let canvas = document.getElementById('main-canvas')
    let webgl = canvas.getContext('experimental-webgl');

    // Vertices for a Square    
    let squareVertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,];

    // Create a new buffer object and bind it
    let vertexBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(squareVertices), webgl.STATIC_DRAW);
    webgl.bindBuffer(webgl.ARRAY_BUFFER, null);

    // Create and compile the Vertex Shader
    let vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
    webgl.shaderSource(vertexShader, vertexShaderCode);
    webgl.compileShader(vertexShader);

    // Create and compile the Fragment Shader
    let fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
    webgl.shaderSource(fragmentShader, fragmentShaderCode);
    webgl.compileShader(fragmentShader);

    // Create a shader program
    let shaderProgram = webgl.createProgram();
    webgl.attachShader(shaderProgram, vertexShader);
    webgl.attachShader(shaderProgram, fragmentShader);
    webgl.linkProgram(shaderProgram);
    webgl.useProgram(shaderProgram);
}

main();