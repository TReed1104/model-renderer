import { webgl } from "./Core.js";
import Shader from "./Shader.js";

export default class ShaderUniforms {
    constructor(id, shaderObject) {
        // Identifer for the Uniform mapping
        this.id = id;

        // Vertex data
        this.vertexPosition = webgl.getUniformLocation(shaderObject, "vertexPosition");
        this.vertexColour = webgl.getUniformLocation(shaderObject, "vertexColour");
        this.vertexUV = webgl.getUniformLocation(shaderObject, "vertexUV");

        // MVP Matrix
        this.modelMatrix = webgl.getUniformLocation(shaderObject, "modelMatrix");
        this.viewMatrix = webgl.getUniformLocation(shaderObject, "viewMatrix");
        this.projectionMatrix = webgl.getUniformLocation(shaderObject, "projectionMatrix");

        // Texturing
        this.enableTextures = webgl.getUniformLocation(shaderObject, "enableTextures");
        this.textureSampler = webgl.getUniformLocation(shaderObject, "textureSampler");
    }
}
