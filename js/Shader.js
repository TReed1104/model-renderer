// Imports
import { webgl } from "./Webgl.js"

export default class Shader {
    constructor(id, vertexShaderSourceCode, fragmentShaderSourceCode) {
        this.id = id;
        // Cache a copy of the shader code
        this.vertexShaderCode = vertexShaderSourceCode;
        this.fragmentShaderCode = fragmentShaderSourceCode;
        // Compile the shader
        this.program = this.compileShaderProgram(vertexShaderSourceCode, fragmentShaderSourceCode);
    }

    compileShaderProgram(vertexSource, fragmentSource) {
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

    enable() {
        webgl.useProgram(this.program);
    }

    disable() {
        webgl.useProgram(null);
    }
}
