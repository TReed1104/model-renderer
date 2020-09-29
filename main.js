function main() {
    // Shader Source Code
    var vertexShaderCode = '\
        attribute vec2 coordinates; \
        void main(void) { \
            gl_Position = vec4(coordinates,0.0, 1.0); \
        }';
    var fragmentShaderCode = '\
        void main(void) { \
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1); \
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

}

main();