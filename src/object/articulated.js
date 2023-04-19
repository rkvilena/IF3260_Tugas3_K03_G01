import { cube, pyramid, dodecahedron } from "./models.js";

export const threebox = {
    vertices: [
        // Front
        -0.1, -0.1, -0.1, // 1: left-bottom
        0.1, -0.1, -0.1, // 2: right-bottom
        0.1, 0.1, -0.1, // 3: right-top
        -0.1, 0.1, -0.1, // 4: left-top

        // Back
        -0.1, -0.1, 0.1, // 5: left-bottom
        0.1, -0.1, 0.1, // 6: right-bottom
        0.1, 0.1, 0.1, // 7: right-top
        -0.1, 0.1, 0.1, // 8: left-top
    ],
    indices: [
        1, 2, 3,
        1, 3, 4, // Front

        5, 6, 7,
        5, 7, 8, // Back

        2, 6, 7,
        2, 7, 3, // Right

        5, 1, 4,
        5, 4, 8, // Left

        4, 3, 7,
        4, 7, 8, // Top

        1, 5, 6,
        1, 6, 2 // Bottom
    ],
    colors: [
        [200, 70, 120],
        [80, 70, 200],
        [70, 200, 210],
        [200, 200, 70],
        [210, 100, 70],
        [70, 180, 210],
        [100, 70, 210],
        [76, 210, 100],
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[Math.floor(i / 6) % 8]);
        }
        return [0,0,0];
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
        const cent = this.centroid;
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 1] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 2] - cent[0]);
        }
        return positions
    },
}

export const hierarchy1 = {
    name: "head",
    source: dodecahedron,
    children: [
        {
            name: "child1",
            source: cube,
            children: [
                {
                    name: "child12",
                    source: pyramid
                },
            ]
        },
    ]
}
export const hierarchy2 = {
    name: "head",
    source: cube,
    children: [
        {
            name: "child1",
            source: pyramid
        },
        {
            name: "child2",
            source: dodecahedron
        }
    ]
}