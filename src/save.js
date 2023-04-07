import { 
    scaleMatrix, translationMatrix, 
    rotationMatrices, matrixMultiplication
} from "./math.js";

export function save(currentmodel, translation, rotation, scale){
    let saveTransformMatrix
    
    const translationMatrixVal = translationMatrix(
        translation[0],
        translation[1],
        translation[2]
    ).flat();
    const rotationMatricesVal = rotationMatrices(
        rotation[0],
        rotation[1],
        rotation[2]
    );
    const scaleMatrixVal = scaleMatrix(scale[0], scale[1], scale[2]).flat();
    saveTransformMatrix = matrixMultiplication(rotationMatricesVal[2], scaleMatrixVal);
    saveTransformMatrix = matrixMultiplication(rotationMatricesVal[1], saveTransformMatrix);
    saveTransformMatrix = matrixMultiplication(rotationMatricesVal[0], saveTransformMatrix);
    saveTransformMatrix = matrixMultiplication(translationMatrixVal, saveTransformMatrix);

    const model = {
        vertices: transformMat4(
            currentmodel.vertices, saveTransformMatrix)
            .slice(0, currentmodel.vertices.length),
        indices: currentmodel.indices,
        colors: currentmodel.colors,
        colorarray: currentmodel.colorarray,
        get positions() {
            var positions = [];
            for (var i = 0; i < this.indices.length; i++) {
                positions.push(this.vertices[this.indices[i] * 3]);
                positions.push(this.vertices[this.indices[i] * 3 + 1]);
                positions.push(this.vertices[this.indices[i] * 3 + 2]);
            }
            return positions
        },
    };
    const jsonString = JSON.stringify(model);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "model.json";
    link.href = url;
    link.click();
}

function transformMat4(vertices, tmat) {
    let result = []

    const m4 = [
        tmat.slice(0, 4),
        tmat.slice(4, 8),
        tmat.slice(8, 12),
        tmat.slice(12, 16)  
    ];

    const w = 1.0;
    for (let i = 0; i < vertices.length; i += 3){
        let x = vertices[i];
        let y = vertices[i+1];
        let z = vertices[i+2];
        
        result[i]   = x * m4[0][0] + y * m4[1][0] + z * m4[2][0] + w * m4[3][0];
        result[i+1] = x * m4[0][1] + y * m4[1][1] + z * m4[2][1] + w * m4[3][1];
        result[i+2] = x * m4[0][2] + y * m4[1][2] + z * m4[2][2] + w * m4[3][2];
        result[i+3] = x * m4[0][3] + y * m4[1][3] + z * m4[2][3] + w * m4[3][3];
    }

    return result;
}