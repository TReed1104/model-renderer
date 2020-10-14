import matrix4 from "./Matrix4.js"
import Mesh from "./Mesh.js"

export default class Model {
    constructor(modelFileLocation, position, rotation, scale) {
        this.id = id;
        this.modelFileLocation = modelFileLocation;
        this.meshes = [];

        this.loadModel(this.modelFileLocation);

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
    update(deltaTime) {
        this.translationMatrix = matrix4.translate(this.baseMatrix, this.position);
        this.rotationMatrix = matrix4.rotate(this.baseMatrix, this.rotation);
        this.scaleMatrix = matrix4.scale(this.baseMatrix, this.scale);
        this.modelMatrix = matrix4.multiply(matrix4.multiply(this.translationMatrix, this.rotationMatrix), this.scaleMatrix);
        // Update the positions of all the meshes
        this.meshes.forEach( mesh => {
            mesh.update(deltaTime, this.translationMatrix, this.rotationMatrix, this.scaleMatrix);
        });
    }
}