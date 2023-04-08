import {
    scaleMatrix,
    translationMatrix,
    matrixMultiplication,
    perspectiveMatrix,
    shearObliqueMatrix,
    inverseMatrix,
    orthographicMatrix,
    lookAtMatrix,
    rotationMatrices,
    identityMatrix,
} from "./math.js";

export class Node {
    constructor(source) {
        this.children = [];
        this.localMatrix = identityMatrix();
        this.worldMatrix = identityMatrix();
        this.source = source;
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
        if (parentWorldMatrix) {
            this.worldMatrix = matrixMultiplication(this.localMatrix, parentWorldMatrix)
        } else {
            this.worldMatrix = matrixMultiplication(this.localMatrix, this.worldMatrix)
        }

        // now process all the children
        let worldMatrix = this.worldMatrix;
        this.children.forEach(function (child) {
            child.updateWorldMatrix(worldMatrix);
        });
    }
}