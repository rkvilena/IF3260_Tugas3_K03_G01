const allvertices = [
    -0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
    0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
    -0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
    0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
    -0.23141198356202314, 0.48210829908754826, 0.11570599178101157,
    0.23141198356202314, 0.48210829908754826, 0.11570599178101157,
    -0.23141198356202314, 0.48210829908754826, -0.11570599178101157,
    0.23141198356202314, 0.48210829908754826, -0.11570599178101157,
    -0.23141198356202314, 0.48210829908754826, 0.23141198356202314,
    0.23141198356202314, 0.48210829908754826, 0.23141198356202314,
    -0.23141198356202314, 0.48210829908754826, -0.23141198356202314,
    0.23141198356202314, 0.48210829908754826, -0.23141198356202314,
    -0.23141198356202314, 0.9449322662115945, 0.23141198356202314,
    0.23141198356202314, 0.9449322662115945, 0.23141198356202314,
    -0.23141198356202314, 0.9449322662115945, -0.23141198356202314,
    0.23141198356202314, 0.9449322662115945, -0.23141198356202314,
    0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
    0.4628239671240463, -0.21212765159852118, 0.11570599178101157,
    0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
    0.4628239671240463, -0.21212765159852118, -0.11570599178101157,
    0.23141198356202314, 0.48210829908754826, 0.11570599178101157,
    0.4628239671240463, 0.48210829908754826, 0.11570599178101157,
    0.23141198356202314, 0.48210829908754826, -0.11570599178101157,
    0.4628239671240463, 0.48210829908754826, -0.11570599178101157,
    -0.4628239671240463, -0.21212765159852118, 0.11570599178101157,
    -0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
    -0.4628239671240463, -0.21212765159852118, -0.11570599178101157,
    -0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
    -0.4628239671240463, 0.48210829908754826, 0.11570599178101157,
    -0.23141198356202314, 0.48210829908754826, 0.11570599178101157,
    -0.4628239671240463, 0.48210829908754826, -0.11570599178101157,
    -0.23141198356202314, 0.48210829908754826, -0.11570599178101157,
    6.585232947956046e-18, -0.9063636022845906, 0.11570599178101157,
    0.23141198356202314, -0.9063636022845906, 0.11570599178101157,
    6.585232947956046e-18, -0.9063636022845906, -0.11570599178101157,
    0.23141198356202314, -0.9063636022845906, -0.11570599178101157,
    6.585232947956046e-18, -0.21212765159852118, 0.11570599178101157,
    0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
    6.585232947956046e-18, -0.21212765159852118, -0.11570599178101157,
    0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
    -0.23141198356202314, -0.9063636022845906, 0.11570599178101157,
    6.585232947956046e-18, -0.9063636022845906, 0.11570599178101157,
    -0.23141198356202314, -0.9063636022845906, -0.11570599178101157,
    6.585232947956046e-18, -0.9063636022845906, -0.11570599178101157,
    -0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
    6.585232947956046e-18, -0.21212765159852118, 0.11570599178101157,
    -0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
    6.585232947956046e-18, -0.21212765159852118, -0.11570599178101157,
    
]

export const body = {
    indices: [
        2, 1, 0,
        2, 3, 1,
        5, 6, 4,
        5, 7, 6,
        1, 4, 0,
        1, 5, 4,
        3, 5, 1,
        3, 7, 5,
        2, 7, 3,
        2, 6, 7,
        0, 6, 2,
        0, 4, 6,
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
        return [0, 0, 0];
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
};

export const head = {
    indices: [
        10, 9, 8,
        10, 11, 9,
        13, 14, 12,
        13, 15, 14,
        9, 12, 8,
        9, 13, 12,
        11, 13, 9,
        11, 15, 13,
        10, 15, 11,
        10, 14, 15,
        8, 14, 10,
        8, 12, 14,
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
        return [0, 0, 0];
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
};

export const leftarm = {
    indices: [
        18, 17, 16,
        18, 19, 17,
        21, 22, 20,
        21, 23, 22,
        17, 20, 16,
        17, 21, 20,
        19, 21, 17,
        19, 23, 21,
        18, 23, 19,
        18, 22, 23,
        16, 22, 18,
        16, 20, 22,
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
        return [0, 0, 0];
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
};

export const rightarm = {
    indices: [
        26, 25, 24,
        26, 27, 25,
        29, 30, 28,
        29, 31, 30,
        25, 28, 24,
        25, 29, 28,
        27, 29, 25,
        27, 31, 29,
        26, 31, 27,
        26, 30, 31,
        24, 30, 26,
        24, 28, 30,
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
        return [0, 0, 0];
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
};

export const leftleg = {
    indices: [
        34, 33, 32,
        34, 35, 33,
        37, 38, 36,
        37, 39, 38,
        33, 36, 32,
        33, 37, 36,
        35, 37, 33,
        35, 39, 37,
        34, 39, 35,
        34, 38, 39,
        32, 38, 34,
        32, 36, 38,
    ],
    colors: [
        [210, 100, 70],
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[0]);
        }
        return colorarray.flat();
    },
    get centroid() {
        return [0, 0, 0];
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
};

export const rightleg = {
    indices: [
        42, 41, 40,
        42, 43, 41,
        45, 46, 44,
        45, 47, 46,
        41, 44, 40,
        41, 45, 44,
        43, 45, 41,
        43, 47, 45,
        42, 47, 43,
        42, 46, 47,
        40, 46, 42,
        40, 44, 46,
    ],
    colors: [
        [76, 210, 100],
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[0]);
        }
        return colorarray.flat();
    },
    get centroid() {
        return [0, 0, 0];
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
};

export const steve = {
    name: "body",
    source: body,
    children: [
        {
            name: "head",
            source: head,
        },
        {
            name: "leftarm",
            source: leftarm,
        },
        {
            name: "rightarm",
            source: rightarm,
        },
        {
            name: "leftleg",
            source: leftleg,
        },
        {
            name: "rightleg",
            source: rightleg,
        },
    ]
}