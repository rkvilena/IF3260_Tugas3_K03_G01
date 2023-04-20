export const body = {
    vertices: [
        -0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
        0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
        -0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
        0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
        -0.23141198356202314, 0.48210829908754826, 0.11570599178101157,
        0.23141198356202314, 0.48210829908754826, 0.11570599178101157,
        -0.23141198356202314, 0.48210829908754826, -0.11570599178101157,
        0.23141198356202314, 0.48210829908754826, -0.11570599178101157,
    ],
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
    tex_coords: [
        0.437500, 0.687500,
        0.312500, 0.500000,
        0.562375, 0.687500,
        0.437500, 0.500000,
        0.250000, 0.500000,
        0.437500, 0.750000,
        0.625000, 0.500000,
        0.562500, 0.750000,
        0.500000, 0.500000,
        0.312500, 0.687500,
        0.437500, 0.687500,
        0.312500, 0.750000,
        0.625000, 0.687500,
        0.250000, 0.687500,
        0.437500, 0.750000,
        0.500000, 0.687500,
    ],
    tex_indices: [
        5, 2, 0,
        5, 7, 2,
        10, 11, 9,
        10, 14, 11,
        3, 9, 1,
        3, 10, 9,
        8, 10, 3,
        8, 15, 10,
        6, 15, 8,
        6, 12, 15,
        1, 13, 4,
        1, 9, 13,
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

export const head = {
    vertices: [
        -0.23141198356202314, 0.48210829908754826, 0.23141198356202314,
        0.23141198356202314, 0.48210829908754826, 0.23141198356202314,
        -0.23141198356202314, 0.48210829908754826, -0.23141198356202314,
        0.23141198356202314, 0.48210829908754826, -0.23141198356202314,
        -0.23141198356202314, 0.9449322662115945, 0.23141198356202314,
        0.23141198356202314, 0.9449322662115945, 0.23141198356202314,
        -0.23141198356202314, 0.9449322662115945, -0.23141198356202314,
        0.23141198356202314, 0.9449322662115945, -0.23141198356202314,
    ],
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
    tex_coords: [
        0.250000, 1.000000,
        0.125000, 0.750000,
        0.250000, 0.875000,
        0.250000, 0.750000,
        0.000000, 0.750000,
        0.375000, 1.000000,
        0.500000, 0.750000,
        0.375000, 0.875000,
        0.375000, 0.750000,
        0.125000, 0.875000,
        0.250000, 0.875000,
        0.125000, 1.000000,
        0.500000, 0.875000,
        0.000000, 0.875000,
        0.250000, 1.000000,
        0.375000, 0.875000,
    ],
    tex_indices: [
        5, 2, 0,
        5, 7, 2,
        10, 11, 9,
        10, 14, 11,
        3, 9, 1,
        3, 10, 9,
        8, 10, 3,
        8, 15, 10,
        6, 15, 8,
        6, 12, 15,
        1, 13, 4,
        1, 9, 13,
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

export const rightarm = {
    vertices: [
        0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
        0.4628239671240463, -0.21212765159852118, 0.11570599178101157,
        0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
        0.4628239671240463, -0.21212765159852118, -0.11570599178101157,
        0.23141198356202314, 0.48210829908754826, 0.11570599178101157,
        0.4628239671240463, 0.48210829908754826, 0.11570599178101157,
        0.23141198356202314, 0.48210829908754826, -0.11570599178101157,
        0.4628239671240463, 0.48210829908754826, -0.11570599178101157,
    ],
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
    tex_coords: [
        0.625000, 0.187500,
        0.562500, 0.000000,
        0.687500, 0.187500,
        0.625000, 0.000000,
        0.500000, 0.000000,
        0.625000, 0.250000,
        0.750000, 0.000000,
        0.687500, 0.250000,
        0.687500, 0.000000,
        0.562500, 0.187500,
        0.625000, 0.187500,
        0.562500, 0.250000,
        0.750000, 0.187500,
        0.500000, 0.187500,
        0.625000, 0.250000,
        0.687500, 0.187500,
    ],
    tex_indices: [
        5, 2, 0,
        5, 7, 2,
        10, 11, 9,
        10, 14, 11,
        3, 9, 1,
        3, 10, 9,
        8, 10, 3,
        8, 15, 10,
        6, 15, 8,
        6, 12, 15,
        1, 13, 4,
        1, 9, 13,
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

export const leftarm = {
    vertices: [
        -0.4628239671240463, -0.21212765159852118, 0.11570599178101157,
        -0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
        -0.4628239671240463, -0.21212765159852118, -0.11570599178101157,
        -0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
        -0.4628239671240463, 0.48210829908754826, 0.11570599178101157,
        -0.23141198356202314, 0.48210829908754826, 0.11570599178101157,
        -0.4628239671240463, 0.48210829908754826, -0.11570599178101157,
        -0.23141198356202314, 0.48210829908754826, -0.11570599178101157,
    ],
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
    tex_coords: [
        0.750000, 0.687500,
        0.687500, 0.500000,
        0.812500, 0.687500,
        0.750000, 0.500000,
        0.625000, 0.500000,
        0.750000, 0.750000,
        0.875000, 0.500000,
        0.812500, 0.750000,
        0.812500, 0.500000,
        0.687500, 0.687500,
        0.750000, 0.687500,
        0.687500, 0.750000,
        0.875000, 0.687500,
        0.625000, 0.687500,
        0.750000, 0.750000,
        0.812500, 0.687500,
    ],
    tex_indices: [
        5, 2, 0,
        5, 7, 2,
        10, 11, 9,
        10, 14, 11,
        3, 9, 1,
        3, 10, 9,
        8, 10, 3,
        8, 15, 10,
        6, 15, 8,
        6, 12, 15,
        1, 13, 4,
        1, 9, 13,
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

export const rightleg = {
    vertices: [
        6.585232947956046e-18, -0.9063636022845906, 0.11570599178101157,
        0.23141198356202314, -0.9063636022845906, 0.11570599178101157,
        6.585232947956046e-18, -0.9063636022845906, -0.11570599178101157,
        0.23141198356202314, -0.9063636022845906, -0.11570599178101157,
        6.585232947956046e-18, -0.21212765159852118, 0.11570599178101157,
        0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
        6.585232947956046e-18, -0.21212765159852118, -0.11570599178101157,
        0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
    ],
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
    tex_coords: [
        0.375000, 0.187500,
        0.312500, 0.000000,
        0.437500, 0.187500,
        0.375000, 0.000000,
        0.250000, 0.000000,
        0.375000, 0.250000,
        0.500000, 0.000000,
        0.437500, 0.250000,
        0.437500, 0.000000,
        0.312500, 0.187500,
        0.375000, 0.187500,
        0.312500, 0.250000,
        0.500000, 0.187500,
        0.250000, 0.187500,
        0.375000, 0.250000,
        0.437500, 0.187500,
    ],
    tex_indices: [
        5, 2, 0,
        5, 7, 2,
        10, 11, 9,
        10, 14, 11,
        3, 9, 1,
        3, 10, 9,
        8, 10, 3,
        8, 15, 10,
        6, 15, 8,
        6, 12, 15,
        1, 13, 4,
        1, 9, 13,
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

export const leftleg = {
    vertices: [
        -0.23141198356202314, -0.9063636022845906, 0.11570599178101157,
        6.585232947956046e-18, -0.9063636022845906, 0.11570599178101157,
        -0.23141198356202314, -0.9063636022845906, -0.11570599178101157,
        6.585232947956046e-18, -0.9063636022845906, -0.11570599178101157,
        -0.23141198356202314, -0.21212765159852118, 0.11570599178101157,
        6.585232947956046e-18, -0.21212765159852118, 0.11570599178101157,
        -0.23141198356202314, -0.21212765159852118, -0.11570599178101157,
        6.585232947956046e-18, -0.21212765159852118, -0.11570599178101157,
    ],
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
    tex_coords: [
        0.125000, 0.687500,
        0.062500, 0.500000,
        0.187500, 0.687500,
        0.125000, 0.500000,
        0.000000, 0.500000,
        0.125000, 0.750000,
        0.250000, 0.500000,
        0.187500, 0.750000,
        0.187500, 0.500000,
        0.062500, 0.687500,
        0.125000, 0.687500,
        0.062500, 0.750000,
        0.250000, 0.687500,
        0.000000, 0.687500,
        0.125000, 0.750000,
        0.187500, 0.687500,
    ],
    tex_indices: [
        5, 2, 0,
        5, 7, 2,
        10, 11, 9,
        10, 14, 11,
        3, 9, 1,
        3, 10, 9,
        8, 10, 3,
        8, 15, 10,
        6, 15, 8,
        6, 12, 15,
        1, 13, 4,
        1, 9, 13,
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

export const steve = {
    class: "steve",
    asset: "steve.png",
    name: "body",
    source: body,
    pivot: body.centroid,
    children: [
        {
            name: "head",
            source: head,
            pivot: [
                0,
                body.centroid[1] + body.dimensions[1] / 2,
                0,
            ],
        },
        {
            name: "rightarm",
            source: rightarm,
            pivot: [
                rightarm.centroid[0],
                (body.centroid[1] + body.dimensions[1] / 2) * 0.76,
                0,
            ],
        },
        {
            name: "leftarm",
            source: leftarm,
            pivot: [
                leftarm.centroid[0],
                (body.centroid[1] + body.dimensions[1] / 2) * 0.76,
                0,
            ],
        },
        {
            name: "rightleg",
            source: rightleg,
            pivot: [
                rightleg.centroid[0],
                body.centroid[1] - body.dimensions[1] / 2,
                0,
            ],
        },
        {
            name: "leftleg",
            source: leftleg,
            pivot: [
                leftleg.centroid[0],
                body.centroid[1] - body.dimensions[1] / 2,
                0,
            ],
        },
    ]
}