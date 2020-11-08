import { webgl } from "./Core.js";

export default class Light {
    constructor(config) {
        // Parse the config object passed to the constructor
        (config.id != undefined) ? this.id = config.id : this.type = "Not Set";
        (config.type != undefined && (config.type == "point" || config.type == "directional" || config.type == "spotlight")) ? this.type = config.type : this.type = "Invalid Type";
        (config.position != undefined) ? this.position = config.position : this.position = [0, 0, 0];
        // Lighting colour attributes
        (config.ambient != undefined) ? this.ambient = config.ambient : this.ambient = [1, 1, 1];
        (config.diffuse != undefined) ? this.diffuse = config.diffuse : this.diffuse = [1, 1, 1];
        (config.specular != undefined) ? this.specular = config.specular : this.specular = [1, 1, 1];
        // Attenuation attributes -> light dissipation over distance
        (config.constant != undefined) ? this.constant = config.constant : this.constant = 1.0;
        (config.linear != undefined) ? this.linear = config.linear : this.linear = 0.7;
        (config.quadratic != undefined) ? this.quadratic = config.quadratic : this.quadratic = 1.8;
    }

    update(deltaTime) {
        // Light Logic here
    }
}