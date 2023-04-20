import { cube, pyramid, dodecahedron, fanbody, fanconnector, fan } from "./models.js";

export const threebox = {
    name: "head",
    source: fanbody,
    centroid: [0, 0, 0],
    translation: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    children: [
        {
            name: "child1",
            source: fanconnector,
            centroid: [0, 0, 0.4],
            translation: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            children: [
                {
                    name: "child2",
                    source: fan,
                    centroid: [0, 0, 0.2],
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                    children: [
                        {
                            name: "child3",
                            source: fan,
                            centroid: [0, 0, 0.2],
                            translation: [0, 0, 0],
                            rotation: [0, 0, 0],
                            scale: [1, 1, 1],
                        }
                    ]
                }
            ]
        },
    ]
}

export const hierarchy1 = {
    name: "head",
    source: dodecahedron,
    translation: [1, 1, 1],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    children: [
        {
            name: "child1",
            source: cube,
            translation: [-1, -1, 1],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            children: [
                {
                    name: "child12",
                    source: pyramid,
                    translation: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
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

export const hierarchy3 = {
    name: "head",
    source: cube,
    children: [
        {
            name: "child1",
            source: pyramid
        },
    ]
}