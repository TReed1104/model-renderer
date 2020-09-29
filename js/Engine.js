// Prep the canvas and get our webgl context
var canvas = document.getElementById('main-canvas')
var webgl = canvas.getContext('webgl2');

class Engine {
    constructor() {
        this.shaderRegister = []                // A register of all the shaders
        this.renderableObjectRegister = []      // A register of all the renderable objects
    }

    // Load the shaders
    loadShaders() {
        // Basic Vertex Shader Source Code
        let vertexShaderSourceCode = '\
        attribute vec3 vertexPosition; \
        attribute vec3 vertexColour; \
        varying vec3 fragmentColour; \
        void main(void) { \
            gl_Position = vec4(vertexPosition, 1.0); \
            fragmentColour = vertexColour; \
        }';

        // Basic Fragment Shader Source Code
        let fragmentShaderSourceCode = '\
        precision mediump float; \
        varying vec3 fragmentColour; \
        void main(void) { \
            gl_FragColor = vec4(fragmentColour, 1.); \
        }';

        // Create the shader
        this.shaderRegister.push(new Shader(vertexShaderSourceCode, fragmentShaderSourceCode));
    }

    // Load our renderable objects
    loadObjects() {
        // Create a basic GameObject
        this.renderableObjectRegister.push(new RenderableObject(this.shaderRegister[0], [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0], [3, 2, 1, 3, 1, 0,], [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1,]));
    }


    // Engine Update
    updateScene(deltaTime) {
    }
    
    // Engine Render
    renderScene() {
        // Start a Render
        webgl.viewport(0, 0, canvas.width, canvas.height);
        webgl.clearColor(0.5, 0.5, 0.5, 0.9);
        webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
        webgl.enable(webgl.DEPTH_TEST);
        this.renderableObjectRegister[0].draw(this.shaderRegister[0]);
        webgl.disable(webgl.DEPTH_TEST);
    }

    // Engine "Game-Loop"
    sceneLoop = (timestamp) => {
        this.updateScene(timestamp);
        this.renderScene();
        window.requestAnimationFrame(this.sceneLoop);
    }

    // Engine Execution call
    run() {
        this.loadShaders();
        this.loadObjects();
        window.requestAnimationFrame(this.sceneLoop);
    }
}
