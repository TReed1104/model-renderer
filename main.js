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
}

main();