import { canvas } from "./Webgl.js"
import matrix4  from "./Matrix4.js"
import ExtendedMaths from "./ExtendedMaths.js"

export default class Camera {
    constructor(id, position, lookAt, up, fovAngle, near, far) {
        this.id = id;
        this.projectionMatrix = matrix4.perspective(ExtendedMaths.degreesToRadians(fovAngle), canvas.width / canvas.height, near, far);
        this.viewMatrix = matrix4.inverse(matrix4.lookAt(position, lookAt, up));
    }
}
