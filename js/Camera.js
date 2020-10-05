import { canvas } from "./Webgl.js"
import matrix4 from "./Matrix4.js"
import ExtendedMaths from "./ExtendedMaths.js"

export default class Camera {
    constructor(id, position, lookAt, up, fieldOfViewAngle, nearZ, farZ) {
        // Set the object variables
        this.id = id;
        this.position = position;
        this.lookAt = lookAt;
        this.up = up;
        this.fieldOfViewAngle = fieldOfViewAngle;
        this.nearZ = nearZ;
        this.farZ = farZ;

        // Setup the camera matrix
        this.projectionMatrix = matrix4.perspective(ExtendedMaths.degreesToRadians(this.fieldOfViewAngle), canvas.width / canvas.height, this.nearZ, this.farZ);
        this.viewMatrix = matrix4.inverse(matrix4.lookAt(this.position, this.lookAt, this.up));
    }

    update(deltaTime) {
        // Update the camera matrix
        this.projectionMatrix = matrix4.perspective(ExtendedMaths.degreesToRadians(this.fieldOfViewAngle), canvas.width / canvas.height, this.nearZ, this.farZ);
        this.viewMatrix = matrix4.inverse(matrix4.lookAt(this.position, this.lookAt, this.up));
    }
}
