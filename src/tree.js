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
    createTree(hierarchy, parent) {
        // To create a tree consist of nodes
        // Root is in index 0
        let node = new Node(hierarchy)
        if (parent) {
            node.setParent(parent);
        } else {
            this.root = node;
        }
        this.nodes.push(node)
        if (hierarchy.children != undefined) {
            for (const childhierarchy of hierarchy.children) {
                this.createTree(childhierarchy, node);
            }
        }
    }
    findNode(name) {
        // To find a node using its name
        let node;
        let nodefound = false;
        let i = 0;
        while (!nodefound && i < this.nodes.length) {
            if (this.nodes[i].name == name) {
                nodefound = true;
                node = this.nodes[i];
            } else {
                i += 1;
            }
        }
        return node;
    }

    findChildren(name) {
        // To find all children of a node using its name
        let children = [];
        let node = this.findNode(name);
        if (node) {
            children = node.children;
        }
        return children;
    }

    applyAnimation(frame) {
        // To apply animation to a node
        for (var transform of frame.transforms) {
            let node = this.findNode(transform.name);
            if (node) {
                node.translation = [
                    transform.translation[0],
                    transform.translation[1],
                    transform.translation[2],
                ];
                node.rotation = [
                    transform.rotation[0],
                    transform.rotation[1],
                    transform.rotation[2],
                ];
                node.scale = [
                    transform.scale[0],
                    transform.scale[1],
                    transform.scale[2],
                ];
            }
        }
    }

    getAnimation() {
        // To get animation from a node
        let animation = [];
        for (const node of this.nodes) {
            animation.push({
                name: node.name,
                translation: [
                    node.translation[0],
                    node.translation[1],
                    node.translation[2],
                ],
                rotation: [
                    node.rotation[0],
                    node.rotation[1],
                    node.rotation[2],
                ],
                scale: [
                    node.scale[0],
                    node.scale[1],
                    node.scale[2],
                ],
            });
        }
        return {
            transforms: animation,
        };
    }
}