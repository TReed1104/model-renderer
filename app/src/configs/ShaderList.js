// Import the Shaders
import * as ShaderDefault from "../shaders/Default.js";
import * as ShaderTextured from "../shaders/Textured.js";

// The list of shaders for the Engine to load and compile
var ShaderList = {
    default: {
        compile: true,
        vertex: ShaderDefault.VertexCode,
        fragment: ShaderDefault.FragmentCode
    },
    texturing: {
        compile: true,
        vertex: ShaderTextured.VertexCode,
        fragment: ShaderTextured.FragmentCode
    },
}

export default ShaderList;