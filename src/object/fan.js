export const body = {
    vertices: [
        -0.4, -0.7, 0.2,   // 0
        0.4, -0.7, 0.2,    // 1
        -0.4, -0.7, -0.2,  // 2
        0.4, -0.7, -0.2,   // 3
        -0.25, 0.5, 0.2,   // 4
        0.25, 0.5, 0.2,    // 5
        -0.25, 0.5, -0.2,  // 6
        0.25, 0.5, -0.2,   // 7
    ],
    indices: [
        0, 1, 5,
        0, 5, 4,
        2, 3, 7,
        2, 7, 6,
        0, 4, 6,
        0, 6, 2,
        1, 3, 7,
        1, 7, 5,
        0, 2, 3,
        0, 3, 1,
        4, 5, 7,
        4, 7, 6
    ],
    colors: [
        [200, 70, 120],
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[0]);
        }
        return colorarray.flat();
    },
    get centroid() {
        var cent = [0, 0, 0];
        for (var i = 0; i < this.indices.length; i++) {
            cent[0] += this.vertices[this.indices[i] * 3];
            cent[1] += this.vertices[this.indices[i] * 3 + 1];
            cent[2] += this.vertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
};

export const blade = {
    vertices: [
        // Blade
        -0.2, -0.6, 0.4,   // 0
        0.2, -0.6, 0.4,    // 1
        -0.2, -0.6, 0.225,  // 2
        0.2, -0.6, 0.225,   // 3
        -0.2, 1.4 , 0.4,   // 4
        0.2, 1.4, 0.4,    // 5
        -0.2, 1.4, 0.225,  // 6
        0.2, 1.4, 0.225,   // 7 
        -1.0, 0.2, 0.4,   // 8
        1.0, 0.2, 0.4,    // 9
        -1.0, 0.2, 0.25,  // 10
        1.0, 0.2, 0.25,   // 11
        -1.0, 0.6 , 0.4,  // 12
        1.0, 0.6, 0.4,    // 13
        -1.0, 0.6, 0.25,  // 14
        1.0, 0.6, 0.25,   // 15
    ],
    indices: [
        0, 1, 5,
        0, 5, 4,
        2, 3, 7,
        2, 7, 6,
        0, 4, 6,
        0, 6, 2,
        1, 3, 7,
        1, 7, 5,
        0, 2, 3,
        0, 3, 1,
        4, 5, 7,
        4, 7, 6,
        8, 9, 13,
        8, 13, 12,
        10, 11, 15,
        10, 15, 14,
        8, 12, 14,
        8, 14, 10,
        9, 11, 15,
        9, 15, 13,
        8, 10, 11,
        8, 11, 9,
        12, 13, 15,
        12, 15, 14
    ],
    colors: [
        [200, 200, 70],
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[0]);
        }
        return colorarray.flat();
    },
    get centroid() {
        var cent = [0, 0, 0];
        for (var i = 0; i < this.indices.length; i++) {
            cent[0] += this.vertices[this.indices[i] * 3];
            cent[1] += this.vertices[this.indices[i] * 3 + 1];
            cent[2] += this.vertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
};

export const bladelock = {
    vertices: [
        // Bladelock
        -0.15, 0.25, 0.6,   // 0
        0.15, 0.25, 0.6,    // 1
        -0.15, 0.25, 0.4,  // 2
        0.15, 0.25, 0.4,   // 3
        -0.15, 0.55, 0.6,   // 4
        0.15, 0.55, 0.6,    // 5
        -0.15, 0.55, 0.4,  // 6
        0.15, 0.55, 0.4,   // 7
    ],
    indices: [
        0, 1, 5,
        0, 5, 4,
        2, 3, 7,
        2, 7, 6,
        0, 4, 6,
        0, 6, 2,
        1, 3, 7,
        1, 7, 5,
        0, 2, 3,
        0, 3, 1,
        4, 5, 7,
        4, 7, 6
    ],
    colors: [
        [70, 200, 210]
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[0]);
        }
        return colorarray.flat();
    },
    get centroid() {
        var cent = [0, 0, 0];
        for (var i = 0; i < this.indices.length; i++) {
            cent[0] += this.vertices[this.indices[i] * 3];
            cent[1] += this.vertices[this.indices[i] * 3 + 1];
            cent[2] += this.vertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
};

export const fanswitch = {
    vertices: [
        // Switch
        -0.2, -0.2, -0.2,   // 0
        0.2, -0.2, -0.2,    // 1
        -0.2, -0.2, -0.3,  // 2
        0.2, -0.2, -0.3,   // 3
        -0.2, 0.2, -0.2,   // 4
        0.2, 0.2, -0.2,    // 5
        -0.2, 0.2, -0.3,  // 6
        0.2, 0.2, -0.3,   // 7
    ],
    indices: [
        0, 1, 5,
        0, 5, 4,
        2, 3, 7,
        2, 7, 6,
        0, 4, 6,
        0, 6, 2,
        1, 3, 7,
        1, 7, 5,
        0, 2, 3,
        0, 3, 1,
        4, 5, 7,
        4, 7, 6 
    ],
    colors: [
        [80, 70, 200]
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[0]);
        }
        return colorarray.flat();
    },
    get centroid() {
        var cent = [0, 0, 0];
        for (var i = 0; i < this.indices.length; i++) {
            cent[0] += this.vertices[this.indices[i] * 3];
            cent[1] += this.vertices[this.indices[i] * 3 + 1];
            cent[2] += this.vertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
};

export const fan = {
    class: "fan",
    asset: "enviroment.jpg",
    pixelated: false,
    name: "body",
    source: body,
    pivot: body.centroid,
    children: [
        {
            name: "blade",
            source: blade,
            pivot: blade.centroid,
            children: [
                {
                    name: "bladelock",
                    source: bladelock,
                    pivot: bladelock.centroid,
                }
            ]
        },
        {
            name: "fanswitch",
            source: fanswitch,
            pivot: fanswitch.centroid,
        }
    ]
}