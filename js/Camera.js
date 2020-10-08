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
        this.fieldOfViewRadians = ExtendedMaths.degreesToRadians(this.fieldOfViewAngle)
        this.nearZ = nearZ;
        this.farZ = farZ;

        // Setup the camera matrix
        this.projectionMatrix = matrix4.perspective(this.fieldOfViewRadians, canvas.width / canvas.height, this.nearZ, this.farZ);
        this.viewMatrix = matrix4.inverse(matrix4.lookAt(this.position, this.lookAt, this.up));
    }

    update(deltaTime) {
        // Update the camera matrix
        this.projectionMatrix = matrix4.perspective(this.fieldOfViewRadians, canvas.width / canvas.height, this.nearZ, this.farZ);
        this.viewMatrix = matrix4.inverse(matrix4.lookAt(this.position, this.lookAt, this.up));
    }

    resetup(position, lookAt, up, fieldOfViewAngle, nearZ, farZ) {
        this.position = position;
        this.lookAt = lookAt;
        this.up = up;
        this.fieldOfViewAngle = fieldOfViewAngle;
        this.fieldOfViewRadians = ExtendedMaths.degreesToRadians(this.fieldOfViewAngle)
        this.nearZ = nearZ;
        this.farZ = farZ;
        this.projectionMatrix = matrix4.perspective(this.fieldOfViewRadians, canvas.width / canvas.height, this.nearZ, this.farZ);
        this.viewMatrix = matrix4.inverse(matrix4.lookAt(this.position, this.lookAt, this.up));
    }

    reposition(newPosition) {
        this.position = newPosition;
    }

    reposition(newPositionX, newPositionY, newPositionZ) {
        this.position = [newPositionX, newPositionY, newPositionZ];
    }

    refocus(newLookAt) {
        this.lookAt = newLookAt;
    }

    refocus(newLookAtX, newLookAtY, newLookAtZ) {
        this.lookAt = [newLookAtX, newLookAtY, newLookAtZ];
    }

    realign(newUp) {
        this.up = newUp;
    }

    realign(newUpX, newUpY, newUpZ) {
        this.up = [newUpX, newUpY, newUpZ];
    }

    adjustClipping(newZNear, newZFar) {
        this.nearZ = newZNear;
        this.farZ = newZFar;
    }

    adjustFieldOfView(newFieldOfViewAngle) {
        this.fieldOfViewAngle = newFieldOfViewAngle;
        this.fieldOfViewRadians = ExtendedMaths.degreesToRadians(this.fieldOfViewAngle)
    }
}
