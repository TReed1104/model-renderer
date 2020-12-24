import { webgl } from "./Core.js";
import Shader from "./Shader.js";

export default class ShaderUniforms {
    constructor(id, shaderObject) {
        // Identifer for the Uniform mapping
        this.id = id;

        // Vertex data
        this.vertexPosition = webgl.getUniformLocation(shaderObject.program, "vertexPosition");
        this.vertexColour = webgl.getUniformLocation(shaderObject.program, "vertexColour");
        this.vertexUV = webgl.getUniformLocation(shaderObject.program, "vertexUV");

        // MVP Matrix
        this.modelMatrix = webgl.getUniformLocation(shaderObject.program, "modelMatrix");
        this.viewMatrix = webgl.getUniformLocation(shaderObject.program, "viewMatrix");
        this.projectionMatrix = webgl.getUniformLocation(shaderObject.program, "projectionMatrix");

        // Texturing
        this.enableTextures = webgl.getUniformLocation(shaderObject.program, "enableTextures");
        this.textureSampler = webgl.getUniformLocation(shaderObject.program, "textureSampler");
    }
}
