// Imports
import { webgl } from "./Webgl.js"

export default class Texture {
    constructor(id, texturePath) {
        this.id = id;
        this.width = 0;
        this.height = 0;
        this.texturePath = texturePath;
        this.webglTexture = null;
        this.isLoaded = false;
        this.LoadTexture(this.texturePath);
    }

    LoadTexture(texturePath) {
        var texture = webgl.createTexture();
        webgl.bindTexture(webgl.TEXTURE_2D, texture);
        webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, 1, 1, 0, webgl.RGBA, webgl.UNSIGNED_BYTE, new Uint8Array([255, 0, 255, 255]));
        var image = new Image();
        image.src = texturePath;
        // Load event for the textures
        image.addEventListener('load', () => {
            // Now that the image has loaded make copy it to the texture.
            webgl.bindTexture(webgl.TEXTURE_2D, texture);
            webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, image);
            webgl.generateMipmap(webgl.TEXTURE_2D);
            // Set the sizing of the texture
            this.width = image.width;
            this.height = image.height;
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