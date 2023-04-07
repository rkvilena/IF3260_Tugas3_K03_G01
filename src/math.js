export function matrixMultiplication(matrix1, matrix2) {
  // matrix1 and matrix2 is 4x4 matrix
  var result = [];
  var currElm = 0;
  for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
          currElm = 0;
          for (var k = 0; k < 4; k++) {
              currElm += matrix2[4 * i + k] * matrix1[4 * k + j];
          }
          result.push(currElm);
      }
  }
  return result;
}

export const translationMatrix = (x,y,z) => {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [x, y, z, 1]
  ]
}

// Deprecated
export const rotationMatrix = (x, y, z) => {
  const degToRad = (deg) => deg * Math.PI / 180;
  const xRad = degToRad(x);
  const yRad = degToRad(y);
  const zRad = degToRad(z);

  const xRotation = [
    [1, 0, 0, 0],
    [0, Math.cos(xRad), Math.sin(xRad), 0],
    [0, -Math.sin(xRad), Math.cos(xRad), 0],
    [0, 0, 0, 1]
  ]

  const yRotation = [
    [Math.cos(yRad), 0, -Math.sin(yRad), 0],
    [0, 1, 0, 0],
    [Math.sin(yRad), 0, Math.cos(yRad), 0],
    [0, 0, 0, 1]
  ]

  const zRotation = [
    [Math.cos(zRad), Math.sin(zRad), 0, 0],
    [-Math.sin(zRad), Math.cos(zRad), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]

  return matrixMultiplication(matrixMultiplication(xRotation.flat(),yRotation.flat()),zRotation.flat());
}

export const rotationMatrices = (x, y, z) => {
  const degToRad = (deg) => deg * Math.PI / 180;
  const xRad = degToRad(x);
  const yRad = degToRad(y);
  const zRad = degToRad(z);

  const xRotation = [
    [1, 0, 0, 0],
    [0, Math.cos(xRad), Math.sin(xRad), 0],
    [0, -Math.sin(xRad), Math.cos(xRad), 0],
    [0, 0, 0, 1]
  ]

  const yRotation = [
    [Math.cos(yRad), 0, -Math.sin(yRad), 0],
    [0, 1, 0, 0],
    [Math.sin(yRad), 0, Math.cos(yRad), 0],
    [0, 0, 0, 1]
  ]

  const zRotation = [
    [Math.cos(zRad), Math.sin(zRad), 0, 0],
    [-Math.sin(zRad), Math.cos(zRad), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]

  return [xRotation.flat(), yRotation.flat(), zRotation.flat()];
}

export const scaleMatrix = (x,y,z) => {
  return [
    [x, 0, 0, 0],
    [0, y, 0, 0],
    [0, 0, z, 0],
    [0, 0, 0, 1]
  ]
}

/* Projection Matrix */
// Oblique projection
export const shearObliqueMatrix = (xshear, zshear) => {
  var cotx = 1 / Math.tan(xshear * Math.PI / 180),
    cotz = 1 / Math.tan(zshear * Math.PI / 180);
  return [
    1   , 0   , 0, 0,
    0   , 1   , 0, 0,
    cotx, cotz, 1, 0,
    0   , 0   , 0, 1,
  ]
}

export const orthographicMatrix = (right, bottom, near, far) => {
  // Always assumes left = -right, top = -bottom
  return [
    1 / right, 0, 0, 0,
    0, 1 / -bottom, 0, 0,
    0, 0, 2 / (near - far), 0,
    0, 0, (near + far) / (near - far), 1,
  ];
}


// Perspective projection
export const perspectiveMatrix = (fieldOfViewInRadians, aspect, near, far) => {
  let f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
  let rangeInv = 1.0 / (near - far);

  return [
    f * aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, -(near - far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0
  ];
}

// Inverse of Matrix
export const inverseMatrix = (src) => {
  var temp,
      N   = 4,
      dst = [];
 
  // Identity Matrix
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (i == j) dst[i * N + j] = 1;
      else        dst[i * N + j] = 0;
    }
  }
    
  // Reduce src matrix to identity by Gaussian Elimination
  for (var k = 0; k < N; k++) {
    temp = src[k * N + k];
 
    for (var l = 0; l < N; l++)
    {
      src[k * N + l] /= temp;
      dst[k * N + l] /= temp;
    }

    for (var m = k + 1; m < N; m++)
    {
      temp = src[m * N + k];
 
      for (var n = 0; n < N; n++)
      {
        src[m * N + n] -= src[k * N + n] * temp;
        dst[m * N + n] -= dst[k * N + n] * temp;
      }
    }
  }
 
  for (var k = N - 1; k > 0; k--)
  {
    for (var l = k - 1; l >= 0; l--)
    {
      temp = src[l * N + k];
 
      for (var m = 0; m < N; m++)
      {
        src[l * N + m] -= src[k * N + m] * temp;
        dst[l * N + m] -= dst[k * N + m] * temp;
      }
    }
  }

  // Get Inverse as byproduct
  return dst;
}

function cross(v1, v2) {
  return [v1[1] * v2[2] - v1[2] * v2[1],
          v1[2] * v2[0] - v1[0] * v2[2],
          v1[0] * v2[1] - v1[1] * v2[0]];
}

export const normalize = (vec) => {
  var length = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);

  if (length > 0.0000000000001) {
    return [vec[0] / length, vec[1] / length, vec[2] / length];
  } else {
    return [0, 0, 0];
  }
}

export const lookAtMatrix = (eye, at, up) => {
  var z = normalize([eye[0] - at[0], eye[1] - at[1], eye[2] - at[2]]);
  var x = normalize(cross(up, z));
  var y = normalize(cross(z, x));

  return [
     x[0]  , x[1]  , x[2]  , 0,
     y[0]  , y[1]  , y[2]  , 0,
     z[0]  , z[1]  , z[2]  , 0,
     eye[0], eye[1], eye[2], 1,
  ];
}