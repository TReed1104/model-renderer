// Import WebGL
import { canvas, webgl } from "./Core.js";

// Import the Engine Classes
import Shader from "./Shader.js";
import Model from "./Model.js";
import Camera from "./Camera.js";
import Light from "./Light.js";

// Import the Configs
import ConfigShaders from '../configs/ShaderList.js';
import ConfigTextures from '../configs/TextureList.js';
import ConfigModels from '../configs/ModelList.js';
import ConfigLights from '../configs/LightList.js';

export default class Engine {
    constructor() {
        // Registers
        this.shaderRegister = [];               // A register of all the shaders
        this.cameraRegister = [];               // A list of all the world cameras
        this.modelRegister = [];                // A register of all the renderable objects
        this.lightRegister = [];                // A register of all the scene lights

        // Indexers
        this.indexOfMainCamera = 0;
        this.indexOfDraggableObject = 0;

        // Delta Time variables
        this.previousFrameTime = 0;

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

    // Load the shaders
    loadShaders() {
        // Iterate through the shader config list
        for (let key of Object.keys(ConfigShaders)) {
            // Check if the shader to be compiled
            if (ConfigShaders[key].load) {
                // Create the shader object
                this.shaderRegister.push(new Shader(key, ConfigShaders[key]));
            }
        }
    }

    // Create the cameras to be used by the engine
    loadCameras() {
        // Create the main Camera
        this.cameraRegister.push(new Camera("Main Camera", [0, 2, 5], [0, 0, 0], [0, 1, 0], 90, 1, 100));
    }

    // Load the defined textures
    loadTextures() {
        // Load each texture in the config list
        for (let key of Object.keys(ConfigTextures)) {
        }
    }

    // Load our renderable objects
    loadModels() {
        // Load each model in the list
        for (let key of Object.keys(ConfigModels)) {
            // Check if the model is to be loaded
            if (ConfigModels[key].load) {
                this.modelRegister.push(new Model(key, ConfigModels[key]));
            }
        }
    }

    // Load the lights for the engine scenes
    loadLights() {
        // Load each light in the list
        for (let key of Object.keys(ConfigLights)) {
            if (ConfigLights[key].load) {
                this.lightRegister.push(new Light(key, ConfigLights[key]));
            }
        }
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
        // Calculate the delta between the current frame and the previous frame -> we use this for smoothing transformations and animations
        let deltaTime = (timestamp - this.previousFrameTime) / 1000;
        // Update the scene -> update the logic of the world, do transformations, animations etc.
        this.updateScene(deltaTime);
        // Draw the scene to the Canvas
        this.renderScene();
        // Store the current timer ready for the next frames delta calculation
        this.previousFrameTime = timestamp;
        // Canvas frame update callback
        window.requestAnimationFrame(this.sceneLoop);
    }

    // Engine Execution call
    run() {
        // Call the load functions
        this.loadShaders();
        this.loadCameras();
        this.loadTextures();
        this.loadModels();
        this.loadLights();

        // Start the run-time loop
        window.requestAnimationFrame(this.sceneLoop);
    }

    getIndexOfShader(shaderID) {
        // Get the index of the loaded shader with the specified ID
        return this.shaderRegister.findIndex((shader) => shader.id == shaderID);
    }

    getIndexOfModel(modelID) {
        // Get the index of the loaded model with the specified ID
        return this.modelRegister.findIndex((model) => model.id == modelID);
    }

    getIndexOfCamera(cameraID) {
        // Get the index of the loaded camera with the specified ID
        return this.cameraRegister.findIndex((camera) => camera.id == cameraID);
    }

    getIndexOfLight(lightID) {
        // Get the index of the loaded light with the specified ID
        return this.lightRegister.findIndex((light) => light.id == lightID);
    }
}
