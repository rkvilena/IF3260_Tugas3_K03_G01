const allvertices = [
    // Body
    -0.4, -0.7, 0.2,   // 0
    0.4, -0.7, 0.2,    // 1
    -0.4, -0.7, -0.2,  // 2
    0.4, -0.7, -0.2,   // 3
    -0.25, 0.5, 0.2,   // 4
    0.25, 0.5, 0.2,    // 5
    -0.25, 0.5, -0.2,  // 6
    0.25, 0.5, -0.2,   // 7

    // Blade
    -0.2, -0.6, 0.4,   // 8
    0.2, -0.6, 0.4,    // 9
    -0.2, -0.6, 0.225,  // 10
    0.2, -0.6, 0.225,   // 11
    -0.2, 1.4 , 0.4,   // 12
    0.2, 1.4, 0.4,    // 13
    -0.2, 1.4, 0.225,  // 14
    0.2, 1.4, 0.225,   // 15

    -1.0, 0.2, 0.4,   // 16
    1.0, 0.2, 0.4,    // 17
    -1.0, 0.2, 0.25,  // 18
    1.0, 0.2, 0.25,   // 19
    -1.0, 0.6 , 0.4,  // 20
    1.0, 0.6, 0.4,    // 21
    -1.0, 0.6, 0.25,  // 22
    1.0, 0.6, 0.25,   // 23

    // Bladelock
    -0.15, 0.25, 0.6,   // 24
    0.15, 0.25, 0.6,    // 25
    -0.15, 0.25, 0.4,  // 26
    0.15, 0.25, 0.4,   // 27
    -0.15, 0.55, 0.6,   // 28
    0.15, 0.55, 0.6,    // 29
    -0.15, 0.55, 0.4,  // 30
    0.15, 0.55, 0.4,   // 31

    // Switch
    -0.2, -0.2, -0.2,   // 32
    0.2, -0.2, -0.2,    // 33
    -0.2, -0.2, -0.3,  // 34
    0.2, -0.2, -0.3,   // 35
    -0.2, 0.2, -0.2,   // 36
    0.2, 0.2, -0.2,    // 37
    -0.2, 0.2, -0.3,  // 38
    0.2, 0.2, -0.3,   // 39
]

export const body = {
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
};

export const blade = {
    indices: [
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
        12, 15, 14,
        16, 17, 21,
        16, 21, 20,
        18, 19, 23,
        18, 23, 22,
        16, 20, 22,
        16, 22, 18,
        17, 19, 23,
        17, 23, 21,
        16, 18, 19,
        16, 19, 17,
        20, 21, 23,
        20, 23, 22
    ],
    colors: [
        [80, 70, 200],
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
};

export const bladelock = {
    indices: [
        24, 25, 29,
        24, 29, 28,
        26, 27, 31,
        26, 31, 30,
        24, 28, 30,
        24, 30, 26,
        25, 27, 31,
        25, 31, 29,
        24, 26, 27,
        24, 27, 25,
        28, 29, 31,
        28, 31, 30
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
};

export const fanswitch = {
    indices: [
        32, 33, 37,
        32, 37, 36,
        34, 35, 39,
        34, 39, 38,
        32, 36, 38,
        32, 38, 34,
        33, 35, 39,
        33, 39, 37,
        32, 34, 35,
        32, 35, 33,
        36, 37, 39,
        36, 39, 38 
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
};

export const fan = {
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