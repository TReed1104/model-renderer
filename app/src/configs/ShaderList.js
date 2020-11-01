// Import the Shaders
import * as ShaderDefault from "../shaders/Default.js";
import * as ShaderTexturing from "../shaders/Texturing.js";

// The list of shaders for the Engine to load and compile
var ShaderList = {
    default: {
        load: true,
        enabled: true,
        vertex: ShaderDefault.VertexCode,
        fragment: ShaderDefault.FragmentCode
    },
    texturing: {
        load: true,
        enabled: true,
        vertex: ShaderTexturing.VertexCode,
        fragment: ShaderTexturing.FragmentCode
    },
};

export default ShaderList;