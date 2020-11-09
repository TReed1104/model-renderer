// The list of Lights for the Engine to load
var LightList = {
    testPointList: {
        load: true,
        type: "point",
        // Transformations
        position: [0, 0, 0],
        // Light colour attributes
        ambient: [0.2, 0.2, 0.2],
        diffuse: [0.5, 0.5, 0.5],
        specular: [1, 1, 1],
        // Attenuation Values
        constant: 1.0,
        linear: 0.22,
        quadratic: 0.20
    }
};

export default LightList;