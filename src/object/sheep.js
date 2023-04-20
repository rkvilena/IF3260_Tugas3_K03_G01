const body = {
    vertices : [
      0.582571, 0.998266, -0.3,
    0.582571, 0.398266, -0.3,
    0.582571, 0.998266, 0.3,
    0.582571, 0.398266, 0.3,
    -0.582571, 0.998266, -0.3,
    -0.582571, 0.398266, -0.3,
    -0.582571, 0.998266, 0.3,
    -0.582571, 0.398266, 0.3,
    ],
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
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const frontLeft = {
    vertices : [
      0.159079, 0.371567, -0.300833,
  0.159079, 0.817156, -0.300833,
  0.159079, 0.371567, -0.494286,
  0.159079, 0.817156, -0.494286,
  0.340643, 0.371567, -0.300833,
  0.340643, 0.817156, -0.300833,
  0.340643, 0.371567, -0.494286,
  0.340643, 0.817156, -0.494286,
0.196332, -0.069728, -0.304689,
0.196332, 0.375862, -0.304689,
0.196332, -0.069728, -0.498142,
0.196332, 0.375862, -0.498142,
0.304416, -0.069728, -0.304689,
0.304416, 0.375862, -0.304689,
0.304416, -0.069728, -0.498142,
0.304416, 0.375862, -0.498142,
    ],

    indices : [
      0, 1, 3,
      3, 2, 0,
      2, 3, 7,
      7, 6, 2,
      6, 7, 5,
      5, 4, 6,
      4, 5, 1,
      1, 0, 4,
      2, 6, 4,
      4, 0, 2,
      7, 3, 1,
      1, 5, 7,
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
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const frontRight = {
    vertices : [
      0.159079, 0.371567, 0.493638,
0.159079, 0.817156, 0.493638,
0.159079, 0.371567, 0.300184,
0.159079, 0.817156, 0.300184,
0.340643, 0.371567, 0.493638,
0.340643, 0.817156, 0.493638,
0.340643, 0.371567, 0.300184,
0.340643, 0.817156, 0.300184,
0.196332, -0.069728, 0.502617,
0.196332, 0.375862, 0.502617,
0.196332, -0.069728, 0.309164,
0.196332, 0.375862, 0.309164,
0.304416, -0.069728, 0.502617,
0.304416, 0.375862, 0.502617,
0.304416, -0.069728, 0.309164,
0.304416, 0.375862, 0.309164,
    ],
    indices : [
      0, 1, 3,
      3, 2, 0,
      2, 3, 7,
      7, 6, 2,
      6, 7, 5,
      5, 4, 6,
      4, 5, 1,
      1, 0, 4,
      2, 6, 4,
      4, 0, 2,
      7, 3, 1,
      1, 5, 7,
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
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const leftBack = {
    vertices : [
      -0.404586, 0.371567, -0.300833,
-0.404586, 0.817156, -0.300833,
-0.404586, 0.371567, -0.494286,
-0.404586, 0.817156, -0.494286,
-0.223022, 0.371567, -0.300833,
-0.223022, 0.817156, -0.300833,
-0.223022, 0.371567, -0.494286,
-0.223022, 0.817156, -0.494286,
-0.369816, -0.069728, -0.304689,
-0.369816, 0.375862, -0.304689,
-0.369816, -0.069728, -0.498142,
-0.369816, 0.375862, -0.498142,
-0.261731, -0.069728, -0.304689,
-0.261731, 0.375862, -0.304689,
-0.261731, -0.069728, -0.498142,
-0.261731, 0.375862, -0.498142,
    ],
    indices : [
      0, 1, 3,
      3, 2, 0,
      2, 3, 7,
      7, 6, 2,
      6, 7, 5,
      5, 4, 6,
      4, 5, 1,
      1, 0, 4,
      2, 6, 4,
      4, 0, 2,
      7, 3, 1,
      1, 5, 7,
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
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const rightBack = {
    vertices : [
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
    ],
    indices : [
      0, 1, 3,
      3, 2, 0,
      2, 3, 7,
      7, 6, 2,
      6, 7, 5,
      5, 4, 6,
      4, 5, 1,
      1, 0, 4,
      2, 6, 4,
      4, 0, 2,
      7, 3, 1,
      1, 5, 7,
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
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const face = {
    vertices : [
      0.58253, 0.597096, 0.200927,
      0.58253, 0.895286, 0.200927,
      0.58253, 0.597096, -0.200927,
      0.58253, 0.895286, -0.200927,
      0.755502, 0.597096, 0.200927,
      0.755502, 0.895286, 0.200927,
      0.755502, 0.597096, -0.200927,
      0.755502, 0.895286, -0.200927,
    ],
    indices : [
      0, 1, 3,
      3, 2, 0,
      2, 3, 7,
      7, 6, 2,
      6, 7, 5,
      5, 4, 6,
      4, 5, 1,
      1, 0, 4,
      2, 6, 4,
      4, 0, 2,
      7, 3, 1,
      1, 5, 7,
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
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }

  const tail = {
    vertices : [
      -0.676685, 0.794629, 0.085308,
-0.676685, 0.921121, 0.085308,
-0.676685, 0.794629, -0.085158,
-0.676685, 0.921121, -0.085158,
-0.60331, 0.794629, 0.085308,
-0.60331, 0.921121, 0.085308,
-0.60331, 0.794629, -0.085158,
-0.60331, 0.921121, -0.085158,
    ],
    indices : [
      0, 1, 3,
      3, 2, 0,
      2, 3, 7,
      7, 6, 2,
      6, 7, 5,
      5, 4, 6,
      4, 5, 1,
      1, 0, 4,
      2, 6, 4,
      4, 0, 2,
      7, 3, 1,
      1, 5, 7,
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
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3]);
            positions.push(this.vertices[this.indices[i] * 3 + 1]);
            positions.push(this.vertices[this.indices[i] * 3 + 2]);
        }
        return positions;
    },
    get dimensions() {
        var max = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        var min = [this.vertices[this.indices[0] * 3], this.vertices[this.indices[0] * 3 + 1], this.vertices[this.indices[0] * 3 + 2]];
        for (var i = 1; i < this.indices.length; i++) {
            max = [
                Math.max(max[0], this.vertices[this.indices[i] * 3]),
                Math.max(max[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.max(max[2], this.vertices[this.indices[i] * 3 + 2])
            ];
            min = [
                Math.min(min[0], this.vertices[this.indices[i] * 3]),
                Math.min(min[1], this.vertices[this.indices[i] * 3 + 1]),
                Math.min(min[2], this.vertices[this.indices[i] * 3 + 2])
            ];
        }
        return [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    }
  }


export const sheep = {
  class : "sheep",
  asset : "normal.jpg",
  pixelated : false,
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