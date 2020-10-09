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
        this.fieldOfViewRadians = ExtendedMaths.degreesToRadians(fieldOfViewAngle);
        this.nearZ = nearZ;
        this.farZ = farZ;

        // Cache the base fields of the camera -> allows easy "resetting"
        this.base_Position = position;
        this.base_LookAt = lookAt;
        this.base_Up = up;
        this.base_FieldOfViewAngle = fieldOfViewAngle;
        this.base_FieldOfViewRadians = ExtendedMaths.degreesToRadians(fieldOfViewAngle);
        this.base_NearZ = nearZ;
        this.base_FarZ = farZ;

        // Setup the camera matrices
        this.projectionMatrix = matrix4.perspective(this.fieldOfViewRadians, canvas.width / canvas.height, this.nearZ, this.farZ);
        this.viewMatrix = matrix4.inverse(matrix4.lookAt(this.position, this.lookAt, this.up));
    }

    // Camera update, called once per frame
    update(deltaTime) {
        // Update the camera matrix
        this.projectionMatrix = matrix4.perspective(this.fieldOfViewRadians, canvas.width / canvas.height, this.nearZ, this.farZ);
        this.viewMatrix = matrix4.inverse(matrix4.lookAt(this.position, this.lookAt, this.up));
    }

    // Reinitialse the camera to a new setup
    reinitialise(position, lookAt, up, fieldOfViewAngle, nearZ, farZ) {
        // Reinitialise the cameras field
        this.position = position;
        this.lookAt = lookAt;
        this.up = up;
        this.fieldOfViewAngle = fieldOfViewAngle;
        this.fieldOfViewRadians = ExtendedMaths.degreesToRadians(fieldOfViewAngle);
        this.nearZ = nearZ;
        this.farZ = farZ;

        // Setup the cached base fields of the camera
        this.base_Position = position;
        this.base_LookAt = lookAt;
        this.base_Up = up;
        this.base_FieldOfViewAngle = fieldOfViewAngle;
        this.base_FieldOfViewRadians = ExtendedMaths.degreesToRadians(fieldOfViewAngle);
        this.base_NearZ = nearZ;
        this.base_FarZ = farZ;

        // Resetup the Camera matrices
        this.projectionMatrix = matrix4.perspective(this.fieldOfViewRadians, canvas.width / canvas.height, this.nearZ, this.farZ);
        this.viewMatrix = matrix4.inverse(matrix4.lookAt(this.position, this.lookAt, this.up));
    }

    // Reset the camera to its base setup using the initialised fields
    reset() {
        // Reset the camera to the original setup
        this.position = this.base_Position;
        this.lookAt = this.base_LookAt;
        this.up = this.base_Up;
        this.fieldOfViewAngle = this.base_FieldOfViewAngle;
        this.fieldOfViewRadians = ExtendedMaths.degreesToRadians(this.base_FieldOfViewAngle)
        this.nearZ = this.base_NearZ;
        this.farZ = this.base_FarZ;

        // Reset the Camera matrices
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
