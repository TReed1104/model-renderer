// Imports
import { canvas, webgl } from "./Webgl.js"
import Shader from "./Shader.js";
import Model from "./Model.js"
import Camera from "./Camera.js"

// Import the Shaders
import * as ShaderDefault from "../shaders/Default.js"
import * as ShaderTextured from "../shaders/Textured.js"

export default class Engine {
    constructor() {
        // Registers
        this.shaderRegister = []                // A register of all the shaders
        this.cameraRegister = []                // A list of all the world cameras
        this.modelRegister = []      // A register of all the renderable objects

        // Indexers
        this.indexOfMainCamera = 0;
        this.indexOfDraggableObject = 0;

        // Delta Time variables
        this.oldTime = 0;

        // Variables for drag-rotating an object
        this.mouseClickedLeft = false;
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
        // On Left Click
        if (event.button == 0) {
            // The mouse has been clicked, get the click location in orthogonal space
            this.mouseClickedLeft = true;
            this.oldMouseXPos = event.pageX;
            this.oldMouseYPos = event.pageY;
        }
    };

    mouseButtonReleased = (event) => {
        // On Left Click
        if (event.button == 0) {
            // The mouse click has been released, stop the "drag" calculations
            this.mouseClickedLeft = false;
        }
    };

    mouseMovement = (event) => {
        // Check if the mouse is clicked
        if (!this.mouseClickedLeft) {
            return false;
        }

        // Calculate the delta in the X and Y position of the mouse from the previous frame, then convert it to a rotation in radians and add it to the current rotational Angles of the chosen object
        this.modelRegister[this.indexOfDraggableObject].rotation[1] += (event.pageX - this.oldMouseXPos) * 2 * Math.PI / canvas.width;
        this.modelRegister[this.indexOfDraggableObject].rotation[0] += (event.pageY - this.oldMouseYPos) * 2 * Math.PI / canvas.height;

        // Set the old mouse position ready for the next frame
        this.oldMouseXPos = event.pageX;
        this.oldMouseYPos = event.pageY;
    };

    loadCameras() {
        // Create the main Camera
        this.cameraRegister.push(new Camera("Main Camera", [0, 0, 8], [0, 0, 0], [0, 1, 0], 90, 1, 100));
    }

    // Load the shaders
    loadShaders() {
        // Create the shader
        this.shaderRegister.push(new Shader("Default", ShaderDefault.VertexCode, ShaderDefault.FragmentCode));
        this.shaderRegister.push(new Shader("Textured", ShaderTextured.VertexCode, ShaderTextured.FragmentCode));
    }

    // Load our renderable objects
    loadObjects() {
        // Create a basic GameObject
        this.modelRegister.push(new Model("Model Test", 1, "content/models/cat.obj", [0, 0, 0], [0, 0, 0], [1, 1, 1]));
    }

    // Engine Update
    updateScene(deltaTime) {
        // Update all the cameras
        this.cameraRegister.forEach(camera => {
            camera.update(deltaTime);
        });

        // Update all the objects
        this.modelRegister.forEach(renderable => {
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
        this.modelRegister.forEach(renderable => {
            renderable.draw(this.shaderRegister[renderable.shaderIndex], this.cameraRegister[this.indexOfMainCamera].projectionMatrix, this.cameraRegister[this.indexOfMainCamera].viewMatrix);
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
        // Call the load functions
        this.loadShaders();
        this.loadCameras();
        this.loadObjects();

        // Start the run-time loop
        window.requestAnimationFrame(this.sceneLoop);
    }
}
