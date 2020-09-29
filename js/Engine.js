// Prep the canvas and get our webgl context
var canvas = document.getElementById('main-canvas')
var webgl = canvas.getContext('webgl2');

class Engine {
    constructor() {
        this.shaderRegister = []                // A register of all the shaders
        this.renderableObjectRegister = []      // A register of all the renderable objects
        this.oldTime = 0;

        this.projectionMatrix = matrix4.projection(40, canvas.width / canvas.height, 1, 100);
        this.viewMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        this.viewMatrix[14] = this.viewMatrix[14] - 6;

        // Variables for drag-rotating an object
        this.indexOfDraggableObject = 0;
        this.mouseClicked = false;
        this.oldMouseXPos = 0;
        this.oldMouseYPos = 0;

        // Register the mouse events for the mouse drag object rotation
        canvas.addEventListener("mousedown", this.mouseButtonClicked, false);
        canvas.addEventListener("mouseup", this.mouseButtonReleased, false);
        canvas.addEventListener("mouseout", this.mouseButtonReleased, false);
        canvas.addEventListener("mousemove", this.mouseMovement, false);
    }

    // Mouse movement function
    mouseButtonClicked = (event) => {
        // The mouse has been clicked, get the click location in orthogonal space
        this.mouseClicked = true;
        this.oldMouseXPos = event.pageX;
        this.oldMouseYPos = event.pageY;
    };

    mouseButtonReleased = (event) => {
        // The mouse click has been released, stop the "drag" calculations
        this.mouseClicked = false;
    };

    mouseMovement = (event) => {
        // Check if the mouse is clicked
        if (!this.mouseClicked) {
            return false;
        }

        // Calculate the delta in the X and Y position of the mouse from the previous frame, then convert it to a rotation in radians and add it to the current rotational Angles of the chosen object
        this.renderableObjectRegister[this.indexOfDraggableObject].rotation[1] += (event.pageX - this.oldMouseXPos) * 2 * Math.PI / canvas.width;
        this.renderableObjectRegister[this.indexOfDraggableObject].rotation[0] += (event.pageY - this.oldMouseYPos) * 2 * Math.PI / canvas.height;

        // Set the old mouse position ready for the next frame
        this.oldMouseXPos = event.pageX;
        this.oldMouseYPos = event.pageY;
    };

    // Load the shaders
    loadShaders() {
        // Basic Vertex Shader Source Code
        let vertexShaderSourceCode = '\
        attribute vec3 vertexPosition; \
        attribute vec3 vertexColour; \
        varying vec3 fragmentColour; \
        uniform mat4 pMatrix; \
        uniform mat4 vMatrix; \
        uniform mat4 mMatrix; \
        void main(void) { \
            gl_Position = pMatrix * vMatrix * mMatrix * vec4(vertexPosition, 1.0); \
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
        var vertices = [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,];
        var colours = [5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
        var indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
        // Create a basic GameObject
        this.renderableObjectRegister.push(new RenderableObject("Colourful Cube", vertices, indices, colours, [0, 0, 0], [0, 0, 0], [1, 1, 1]));
    }

    // Engine Update
    updateScene(deltaTime) {
        // Update all the objects
        this.renderableObjectRegister.forEach(renderable => {
            renderable.update(deltaTime);
        });
    }

    // Engine Render
    renderScene() {
        // Start a Render
        webgl.viewport(0, 0, canvas.width, canvas.height);
        webgl.clearColor(0.5, 0.5, 0.5, 0.9);
        webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
        webgl.enable(webgl.DEPTH_TEST);
        this.renderableObjectRegister.forEach(renderable => {
            renderable.draw(this.shaderRegister[renderable.shaderIndex], this.projectionMatrix, this.viewMatrix);
        });
        webgl.disable(webgl.DEPTH_TEST);
    }

    // Engine "Game-Loop"
    sceneLoop = (timestamp) => {
        let deltaTime = (timestamp - this.oldTime) / 1000;
        this.updateScene(deltaTime);
        this.renderScene();
        this.oldTime = timestamp;
        window.requestAnimationFrame(this.sceneLoop);
    }

    // Engine Execution call
    run() {
        this.loadShaders();
        this.loadObjects();
        window.requestAnimationFrame(this.sceneLoop);
    }
}
