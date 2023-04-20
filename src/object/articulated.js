import { cube, pyramid, dodecahedron, solidcube } from "./models.js";

export const threebox = {
    name: "head",
    source: solidcube
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