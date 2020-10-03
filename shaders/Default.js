var VertexCode =
`   #version 300 es
    layout (location=0) in vec3 vertexPosition;
    layout (location=1) in vec3 vertexColour;
    out vec3 fragmentColour;
    uniform mat4 pMatrix;
    uniform mat4 vMatrix;
    uniform mat4 mMatrix;
    
    void main() {
        fragmentColour = vertexColour;
        gl_Position = pMatrix * vMatrix * mMatrix * vec4(vertexPosition, 1.0);
    }
`;

var FragmentCode =
`   #version 300 es
    precision highp float;
    in vec3 fragmentColour;
    out vec4 outputColour;

    void main(void) {
        outputColour = vec4(fragmentColour, 1.0);
    }
`;

export { VertexCode, FragmentCode };
