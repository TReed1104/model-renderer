import { webgl } from "./Core.js";
import Shader from "./Shader.js";

export default class ShaderUniforms {
    constructor(id, shaderObject) {
        // Identifer for the Uniform mapping
        this.id = id;

        // Vertex data
        this.vertexPosition = -1;
        this.vertexColour = -1;
        this.vertexUV = -1;

        // MVP Matrix
        this.modelMatrix = -1;
        this.viewMatrix = -1;
        this.projectionMatrix = -1;

        // Texturing
        this.enableTextures = -1;
        this.textureSampler = -1;
    }
}
