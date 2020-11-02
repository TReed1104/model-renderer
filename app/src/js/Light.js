import { webgl } from "./Core.js";

export default class Light {
    constructor(id, config) {
        // Set the ID for the light object, unique identifier
        this.id = id;

        // Parse the config object passed to the constructor
        (config.type != undefined) ? this.type = config.type : this.type = "Invalid Type";
        (config.position != undefined) ? this.position = config.position : this.position = [0, 0, 0];
        (config.colour != undefined) ? this.colour = config.colour : this.colour = [1, 1, 1];
    }

    update(deltaTime) {
        // Light Logic here
    }
}