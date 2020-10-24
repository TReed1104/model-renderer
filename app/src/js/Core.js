import Engine from './Engine.js'

var canvas = document.getElementById('main-canvas');
var webgl = canvas.getContext('webgl2');
var engine = new Engine();
export { canvas, webgl, engine };
