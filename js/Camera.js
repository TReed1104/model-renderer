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

    // Reposition the camera using a array
    reposition(newPosition) {
        // Check the new position coord array is the correct length
        if (newPosition.length != 3) {
            console.log("Camera - Invalid new position array size");
            return;
        }
        // Check the values in the array are numbers
        let numberTypeChecks = (isNaN(newPosition[0]) || isNaN(newPosition[1]) || isNaN(newPosition[2]));
        if (numberTypeChecks) {
            console.log("Camera - Invalid new position type");
            return;
        }
        // Set the cameras poition to the new supplied position
        this.position = [newPosition[0], newPosition[1], newPosition[2]];
    }

    refocus(newLookAt) {
        // Check the new look-at coord array is the correct length
        if (newLookAt.length != 3) {
            console.log("Camera - Invalid new look-at array size");
            return;
        }
        // Check the values in the array are numbers
        let numberTypeChecks = (isNaN(newLookAt[0]) || isNaN(newLookAt[1]) || isNaN(newLookAt[2]));
        if (numberTypeChecks) {
            console.log("Camera - Invalid new look-at coords type");
            return;
        }
        // Set the new look-at coordinates
        this.lookAt = newLookAt;
    }

    realign(newUp) {
        // Check the new up orientation coord array is the correct length
        if (newUp.length != 3) {
            console.log("Camera - Invalid new up orientation array size");
            return;
        }
        // Check the values in the array are numbers
        let numberTypeChecks = (isNaN(newUp[0]) || isNaN(newUp[1]) || isNaN(newUp[2]));
        if (numberTypeChecks) {
            console.log("Camera - Invalid new up orientation coords type");
            return;
        }
        // Set the new up orientation coordinates
        this.up = newUp;
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
