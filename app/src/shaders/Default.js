var VertexCode =
`   #version 300 es
    // Vertex In - From Program
    layout (location=0) in vec3 vertexPosition;
    layout (location=1) in vec3 vertexColour;

    // Vertex Out - To Fragment
    out vec3 fragmentPosition;
    out vec3 fragmentColour;

    // Uniforms - From Program
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;
    
    // Vertex Shader Entry
    void main() {
        fragmentPosition = vec3(modelMatrix * vec4(vertexPosition, 1.0));
        fragmentColour = vertexColour;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertexPosition, 1.0);
    }
`;

var FragmentCode =
`   #version 300 es
    precision highp float;

    // Fragment In - From Vertex
    in vec3 fragmentPosition;
    in vec3 fragmentColour;

    // Fragment Out - To Frame Buffer
    out vec4 outputColour;

    // Fragment Shader Entry
    void main(void) {
        outputColour = vec4(fragmentColour, 1.0f);
    }
`;

export { VertexCode, FragmentCode };
