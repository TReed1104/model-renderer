var VertexCode =
`   #version 300 es
    // Vertex Ins - From Program
    layout (location=0) in vec3 vertexPosition;
    layout (location=1) in vec3 vertexColour;

    // Vertex Outs - To Fragment
    out vec3 fragmentColour;

    // Uniforms - From Program
    uniform mat4 pMatrix;
    uniform mat4 vMatrix;
    uniform mat4 mMatrix;
    
    // Vertex Shader Entry
    void main() {
        fragmentColour = vertexColour;
        gl_Position = pMatrix * vMatrix * mMatrix * vec4(vertexPosition, 1.0);
    }
`;

var FragmentCode =
`   #version 300 es
    precision highp float;

    // Fragment Ins - From Vertex
    in vec3 fragmentColour;

    // Fragment Outs - To Frame Buffer
    out vec4 outputColour;

    // Fragment Shader Entry
    void main(void) {
        outputColour = vec4(fragmentColour, 1.0);
    }
`;

export { VertexCode, FragmentCode };
