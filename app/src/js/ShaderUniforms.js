import { webgl } from "./Core.js";
import Shader from "./Shader.js";

export default class ShaderUniforms {
    constructor(id, shaderObject) {
        this.id = id;
        this.vertexPosition = -1;
        this.vertexColour = -1;
        this.vertexUV = -1;
        this.modelMatrix = -1;
        this.viewMatrix = -1;
        this.projectionMatrix = -1;
        this.enableTextures = -1;
        this.textureSampler = -1;
    }
}
