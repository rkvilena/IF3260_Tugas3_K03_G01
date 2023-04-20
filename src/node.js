import {
    scaleMatrix,
    translationMatrix,
    matrixMultiplication,
    rotationMatrices,
    identityMatrix,
} from "./math.js";

export class Node {
    constructor(hierarchy) {
        this.name = hierarchy.name;
        this.children = [];
        this.localMatrix = identityMatrix();
        this.worldMatrix = identityMatrix();
        this.source = hierarchy.source;
        this.centroid = hierarchy.centroid;
        this.translation = hierarchy.translation;
        this.rotation = hierarchy.rotation;
        this.scale = hierarchy.scale;
        this.updateWorldMatrix();

        // Reset transformation
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }
    setParent(parent) {
        if (this.parent) {
            let ndx = this.parent.children.indexOf(this);
            if (ndx >= 0) {
                this.parent.children.splice(ndx, 1);
            }
        }
        if (parent) {
            parent.children.push(this);
        }
        this.parent = parent;
    }
    updateWorldMatrix(parentWorldMatrix) {
        // To update world matrix by applying multiplication with local matrix
        this.nodeTransformMatrix();
        if (parentWorldMatrix) {
            this.worldMatrix = matrixMultiplication(this.localMatrix, parentWorldMatrix)
        } else {
            this.worldMatrix = matrixMultiplication(this.localMatrix, this.worldMatrix)
        }
        this.localMatrix = identityMatrix();

        let worldMatrix = this.worldMatrix;
        this.children.forEach(function (child) {
            child.updateWorldMatrix(worldMatrix);
        });
    }
    nodeTransformMatrix(){
        // To update local matrix based on users preferences
        // Local matrix parameter changed in editor (component slider)
        const nodeTMatVal = translationMatrix(
            this.centroid[0] - this.translation[0],
            this.centroid[1] - this.translation[1],
            this.centroid[2] - this.translation[2]
        ).flat();
        const nodeRMatVal = rotationMatrices(
            this.rotation[0],
            this.rotation[1],
            this.rotation[2]
        );
        const nodeSMatVal = scaleMatrix(this.scale[0], this.scale[1], this.scale[2]).flat();
        this.localMatrix = matrixMultiplication(nodeSMatVal, this.localMatrix);
        this.localMatrix = matrixMultiplication(nodeRMatVal[2], this.localMatrix);
        this.localMatrix = matrixMultiplication(nodeRMatVal[1], this.localMatrix);
        this.localMatrix = matrixMultiplication(nodeRMatVal[0], this.localMatrix);
        this.localMatrix = matrixMultiplication(nodeTMatVal, this.localMatrix);
    }
}