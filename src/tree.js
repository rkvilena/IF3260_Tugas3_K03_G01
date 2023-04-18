import {
    scaleMatrix,
    translationMatrix,
    matrixMultiplication,
    rotationMatrices,
    identityMatrix,
} from "./math.js";
import { Node } from "./node.js"

export class Tree {
    constructor() {
        this.nodes = []
    }
    createTree(hierarchy, parent){
        // To create a tree consist of nodes
        // Root is in index 0
        let node = new Node(hierarchy)
        if (parent){
            node.setParent(parent);
        } else {
            this.root = node;
        }
        this.nodes.push(node)
        if (hierarchy.children != undefined){
            for (const childhierarchy of hierarchy.children) {
                this.createTree(childhierarchy, node);
            }
        }
    }
    findNode(name){
        // To find a node using its name
        let node;
        let nodefound = false;
        let i = 0;
        while (!nodefound && i < this.nodes.length){
            if (this.nodes[i].name == name){
                nodefound = true;
                node = this.nodes[i];
            } else {
                i += 1;
            }
        }
        return node;
    }
}