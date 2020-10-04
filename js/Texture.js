// Imports
import { webgl } from "./Webgl.js"

export default class Texture {
    constructor(id, texturePath) {
        this.id = id;
        this.texturePath = texturePath;
        this.webglTexture = null;
        this.isLoaded = false;
        this.LoadTexture(this.texturePath);
    }

    LoadTexture(texturePath) {
        var texture = webgl.createTexture();
        webgl.bindTexture(webgl.TEXTURE_2D, texture);
        // Fill the texture with a 1x1 blue pixel.
        webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, 1, 1, 0, webgl.RGBA, webgl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        // Asynchronously load an image
        var image = new Image();
        image.src = texturePath;
        // Load event for the textures
        image.addEventListener('load', () => {
            // Now that the image has loaded make copy it to the texture.
            webgl.bindTexture(webgl.TEXTURE_2D, texture);
            webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, image);
            webgl.generateMipmap(webgl.TEXTURE_2D);
            this.isLoaded = true;
            this.webglTexture = texture;
        });
        // Catch when a texture fails to load
        image.addEventListener('error',  () => {
            this.isLoaded = false;
            this.webglTexture = null;
        });
    }
}