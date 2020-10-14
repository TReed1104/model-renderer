import { webgl } from "./Webgl.js"
import matrix4 from "./Matrix4.js"
import Texture from "./Texture.js"

export default class Mesh {
    constructor(indices, colour, uvs, normals, position, rotation, scale, textureFileLocation) {
        // Cache the object data
        this.vertices = vertices;
        this.indices = indices;
        this.colours = colour;
        this.uvs = uvs;
        this.normals = normals;

        // Texturing
        this.isObjectUVMapped = false;
        this.texture = new Texture(textureFileLocation, textureFileLocation);

        // Generate the Vertex array object
        this.vertexArray = this.generateVertexArray(this.vertices, this.indices, this.colours, this.uvs, this.normals);

        // Setup the transformation data
        this.position = position
        this.rotation = rotation
        this.scale = scale

        // Setup the model matrix
        this.baseMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        this.translationMatrix = matrix4.translate(this.baseMatrix, this.position);
        this.rotationMatrix = matrix4.rotate(this.baseMatrix, this.rotation);
        this.scaleMatrix = matrix4.scale(this.baseMatrix, this.scale);
        this.modelMatrix = matrix4.multiply(matrix4.multiply(this.translationMatrix, this.rotationMatrix), this.scaleMatrix);
    }
}
