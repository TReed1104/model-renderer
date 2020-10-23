// The list of models for the Engine to load
var ModelList = {
    cube: {
        load: true,
        enabled: true,
        shaderIndex: 1,
        modelFile: { path: "content/models/cube.obj"},
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
    },
    legoman: {
        load: true,
        enabled: false,
        shaderIndex: 1,
        modelFile: { path: "content/models/legoman.obj" },
        //materialFile: {path: "content/models/legoman.mtl"},
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
    },
};

export default ModelList;