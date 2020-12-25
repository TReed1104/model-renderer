// Imports
import { webgl } from "./Core.js";
import ShaderUniforms from "./ShaderUniforms.js"

export default class Shader {
    constructor(id, config) {
        this.id = id;
        // Parse the config data
        (config.enabled != undefined) ? this.enabled = config.enabled : this.enabled = false;
        (config.vertex != undefined) ? this.vertexShaderCode = config.vertex : this.vertexShaderCode = "Invalid Vertex Source Code";
        (config.fragment != undefined) ? this.fragmentShaderCode = config.fragment : this.fragmentShaderCode = "Invalid Framgnet Source Code";
        // Compile the shader
        this.program = this.compileShaderProgram(this.vertexShaderCode, this.fragmentShaderCode);
    }

    compileShaderProgram(vertexSource, fragmentSource) {
        // Compile the Vertex Shader
        let vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
        webgl.shaderSource(vertexShader, vertexSource);
        webgl.compileShader(vertexShader);
        if (!webgl.getShaderParameter(vertexShader, webgl.COMPILE_STATUS)) {
            console.log("Vertex Shader -", this.id, "- failed to compile:\n" + webgl.getShaderInfoLog(vertexShader));
        }
        // Compile the Fragment Shader
        let fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
        webgl.shaderSource(fragmentShader, fragmentSource);
        webgl.compileShader(fragmentShader);
        if (!webgl.getShaderParameter(fragmentShader, webgl.COMPILE_STATUS)) {
            console.log("Fragment Shader -", this.id, "- failed to compile:\n" + webgl.getShaderInfoLog(fragmentShader));
        }
        // Link together the shader objects
        let shaderProgram = webgl.createProgram();
        webgl.attachShader(shaderProgram, vertexShader);
        webgl.attachShader(shaderProgram, fragmentShader);
        webgl.linkProgram(shaderProgram);
        // Return the created shaderProgram
        return shaderProgram;
    }

    enable() {
        webgl.useProgram(this.program);
    }

    disable() {
        webgl.useProgram(null);
    }
}
