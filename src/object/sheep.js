const allvertices = [
  0.582571, 0.998266, -0.3,
0.582571, 0.398266, -0.3,
0.582571, 0.998266, 0.3,
0.582571, 0.398266, 0.3,
-0.582571, 0.998266, -0.3,
-0.582571, 0.398266, -0.3,
-0.582571, 0.998266, 0.3,
-0.582571, 0.398266, 0.3,
0.159079, 0.371567, -0.300833,
0.159079, 0.817156, -0.300833,
0.159079, 0.371567, -0.494286,
0.159079, 0.817156, -0.494286,
0.340643, 0.371567, -0.300833,
0.340643, 0.817156, -0.300833,
0.340643, 0.371567, -0.494286,
0.340643, 0.817156, -0.494286,
0.159079, 0.371567, 0.493638,
0.159079, 0.817156, 0.493638,
0.159079, 0.371567, 0.300184,
0.159079, 0.817156, 0.300184,
0.340643, 0.371567, 0.493638,
0.340643, 0.817156, 0.493638,
0.340643, 0.371567, 0.300184,
0.340643, 0.817156, 0.300184,
-0.404586, 0.371567, -0.300833,
-0.404586, 0.817156, -0.300833,
-0.404586, 0.371567, -0.494286,
-0.404586, 0.817156, -0.494286,
-0.223022, 0.371567, -0.300833,
-0.223022, 0.817156, -0.300833,
-0.223022, 0.371567, -0.494286,
-0.223022, 0.817156, -0.494286,
-0.404586, 0.371567, 0.502617,
-0.404586, 0.817156, 0.502617,
-0.404586, 0.371567, 0.309164,
-0.404586, 0.817156, 0.309164,
-0.223022, 0.371567, 0.502617,
-0.223022, 0.817156, 0.502617,
-0.223022, 0.371567, 0.309164,
-0.223022, 0.817156, 0.309164,
-0.367846, -0.069728, 0.502617,
-0.367846, 0.375862, 0.502617,
-0.367846, -0.069728, 0.309164,
-0.367846, 0.375862, 0.309164,
-0.259762, -0.069728, 0.502617,
-0.259762, 0.375862, 0.502617,
-0.259762, -0.069728, 0.309164,
-0.259762, 0.375862, 0.309164,
0.196332, -0.069728, 0.502617,
0.196332, 0.375862, 0.502617,
0.196332, -0.069728, 0.309164,
0.196332, 0.375862, 0.309164,
0.304416, -0.069728, 0.502617,
0.304416, 0.375862, 0.502617,
0.304416, -0.069728, 0.309164,
0.304416, 0.375862, 0.309164,
0.196332, -0.069728, -0.304689,
0.196332, 0.375862, -0.304689,
0.196332, -0.069728, -0.498142,
0.196332, 0.375862, -0.498142,
0.304416, -0.069728, -0.304689,
0.304416, 0.375862, -0.304689,
0.304416, -0.069728, -0.498142,
0.304416, 0.375862, -0.498142,
-0.369816, -0.069728, -0.304689,
-0.369816, 0.375862, -0.304689,
-0.369816, -0.069728, -0.498142,
-0.369816, 0.375862, -0.498142,
-0.261731, -0.069728, -0.304689,
-0.261731, 0.375862, -0.304689,
-0.261731, -0.069728, -0.498142,
-0.261731, 0.375862, -0.498142,
0.58253, 0.597096, 0.200927,
0.58253, 0.895286, 0.200927,
0.58253, 0.597096, -0.200927,
0.58253, 0.895286, -0.200927,
0.755502, 0.597096, 0.200927,
0.755502, 0.895286, 0.200927,
0.755502, 0.597096, -0.200927,
0.755502, 0.895286, -0.200927,
-0.676685, 0.794629, 0.085308,
-0.676685, 0.921121, 0.085308,
-0.676685, 0.794629, -0.085158,
-0.676685, 0.921121, -0.085158,
-0.60331, 0.794629, 0.085308,
-0.60331, 0.921121, 0.085308,
-0.60331, 0.794629, -0.085158,
-0.60331, 0.921121, -0.085158,
]

const body = {
    indices : [
      0, 4, 6,
      6, 2, 0,
      3, 2, 6,
      6, 7, 3,
      7, 6, 4,
      4, 5, 7,
      5, 1, 3,
      3, 7, 5,
      1, 0, 2,
      2, 3, 1,
      5, 4, 0,
      0, 1, 5,
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const frontLeft = {
    indices : [
      8, 9, 11,
      11, 10, 8,
      10, 11, 15,
      15, 14, 10,
      14, 15, 13,
      13, 12, 14,
      12, 13, 9,
      9, 8, 12,
      10, 14, 12,
      12, 8, 10,
      15, 11, 9,
      9, 13, 15,
      56, 57, 59,
      59, 58, 56,
      58, 59, 63,
      63, 62, 58,
      62, 63, 61,
      61, 60, 62,
      60, 61, 57,
      57, 56, 60,
      58, 62, 60,
      60, 56, 58,
      63, 59, 57,
      57, 61, 63,
      
    ],
    colors: [
      [10, 150, 110],
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const frontRight = {
    indices : [
      16, 17, 19,
  19, 18, 16,
  18, 19, 23,
  23, 22, 18,
  22, 23, 21,
  21, 20, 22,
  20, 21, 17,
  17, 16, 20,
  18, 22, 20,
  20, 16, 18,
  23, 19, 17,
  17, 21, 23,
  48, 49, 51,
  51, 50, 48,
  50, 51, 55,
  55, 54, 50,
  54, 55, 53,
  53, 52, 54,
  52, 53, 49,
  49, 48, 52,
  50, 54, 52,
  52, 48, 50,
  55, 51, 49,
  49, 53, 55,
    ],
    colors: [
      [150, 50, 200],
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const leftBack = {
    indices : [
      24, 25, 27,
  27, 26, 24,
  26, 27, 31,
  31, 30, 26,
  30, 31, 29,
  29, 28, 30,
  28, 29, 25,
  25, 24, 28,
  26, 30, 28,
  28, 24, 26,
  31, 27, 25,
  25, 29, 31,
  64, 65, 67,
  67, 66, 64,
  66, 67, 71,
  71, 70, 66,
  70, 71, 69,
  69, 68, 70,
  68, 69, 65,
  65, 64, 68,
  66, 70, 68,
  68, 64, 66,
  71, 67, 65,
  65, 69, 71,
    ],
    colors: [
      [50, 200, 120],
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const rightBack = {
    indices : [
      32, 33, 35,
  35, 34, 32,
  34, 35, 39,
  39, 38, 34,
  38, 39, 37,
  37, 36, 38,
  36, 37, 33,
  33, 32, 36,
  34, 38, 36,
  36, 32, 34,
  39, 35, 33,
  33, 37, 39,
  40, 41, 43,
  43, 42, 40,
  42, 43, 47,
  47, 46, 42,
  46, 47, 45,
  45, 44, 46,
  44, 45, 41,
  41, 40, 44,
  42, 46, 44,
  44, 40, 42,
  47, 43, 41,
  41, 45, 47,
    ],
    colors: [
      [255, 75, 100],
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const face = {
    indices : [
      72, 73, 75,
  75, 74, 72,
  74, 75, 79,
  79, 78, 74,
  78, 79, 77,
  77, 76, 78,
  76, 77, 73,
  73, 72, 76,
  74, 78, 76,
  76, 72, 74,
  79, 75, 73,
  73, 77, 79,
    ],
    colors: [
      [255, 255, 255],
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const tail = {
    indices : [
      80, 81, 83,
  83, 82, 80,
  82, 83, 87,
  87, 86, 82,
  86, 87, 85,
  85, 84, 86,
  84, 85, 81,
  81, 80, 84,
  82, 86, 84,
  84, 80, 82,
  87, 83, 81,
  81, 85, 87,
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
            cent[0] += allvertices[this.indices[i] * 3];
            cent[1] += allvertices[this.indices[i] * 3 + 1];
            cent[2] += allvertices[this.indices[i] * 3 + 2];
        }
        cent[0] /= this.indices.length;
        cent[1] /= this.indices.length;
        cent[2] /= this.indices.length;
        return cent;
    },
    get positions() {
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(allvertices[this.indices[i] * 3]);
            positions.push(allvertices[this.indices[i] * 3 + 1]);
            positions.push(allvertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        var min = [allvertices[this.indices[0] * 3], allvertices[this.indices[0] * 3 + 1], allvertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], allvertices[this.indices[i] * 3]),
                Math.max(max[1], allvertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], allvertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], allvertices[this.indices[i] * 3]),
                Math.min(min[1], allvertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], allvertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }


export const sheep = {
  calss : "sheep",
  name: "body",
  source: body,
  pivot: body.centroid,
  children : [
    {
      name : "face",
      source : face,
      pivot : [
        (body.centroid[0] + body.dimensions[0] / 2),
        (body.centroid[1] + body.dimensions[1] / 2)* 0.75,
        0,
      ]
    },
    {
      name : "frontRight",
      source : frontRight,
      pivot : [
        body.centroid[0] + body.dimensions[0] / 4,
        (body.centroid[1] + body.dimensions[1]) / 2,
        body.centroid[2] + body.dimensions[2] / 2,
      ]
    },
    {
      name : "frontLeft",
      source : frontLeft,
      pivot : [
        body.centroid[0] + body.dimensions[0] / 4,
        (body.centroid[1] + body.dimensions[1]) / 2,
        (body.centroid[2] - body.dimensions[2]) / 2,
      ]
    },
    {
      name : "rightBack",
      source : rightBack,
      pivot : [
        body.centroid[0] - body.dimensions[0] / 4,
        body.centroid[1] - body.dimensions[1] / 7,
        body.centroid[2] + body.dimensions[2] / 2,
      ]
    },
    {
      name : "leftBack",
      source : leftBack,
      pivot : [
        body.centroid[0] - body.dimensions[0] / 4,
        body.centroid[1] - body.dimensions[1] / 7,
        body.centroid[2] - body.dimensions[2] / 2,
      ]
    },
    {
      name : "tail",
      source : tail,
      pivot : [
        (body.centroid[0] - body.dimensions[0] /2 ),
        (body.centroid[1] + body.dimensions[1] / 4) ,
        (body.centroid[2] - body.dimensions[2] / 10),
      ]
    }
  ]
}