// The list of Lights for the Engine to load
var LightList = {
    point: {
        load: true,
        type: "point",
        position: [0, 0, 0],
        colour: [1, 1, 1]
    },
    directional: {
        load: true,
        type: "directional",
        position: [0, 0, 0],
        colour: [1, 1, 1]
    },
    spotlight: {
        load: true,
        type: "spotlight",
        position: [0, 0, 0],
        colour: [1, 1, 1]
    }
};

export default LightList;