export const cube = {
    vertices : [
        // >> Front Square
        // Leftbottom-near cube
        // Outside
        -0.5, -0.5, -0.5, // 0
        -0.4, -0.5, -0.5, // 1
        -0.4, -0.4, -0.5, // 2
        -0.5, -0.4, -0.5, // 3
        // Inside
        -0.5, -0.5, -0.4, // 4
        -0.4, -0.5, -0.4, // 5
        -0.4, -0.4, -0.4, // 6
        -0.5, -0.4, -0.4, // 7

        // Rightbottom-near cube
        // Outside
        0.4, -0.5, -0.5, // 8
        0.5, -0.5, -0.5, // 9
        0.5, -0.4, -0.5, // 10
        0.4, -0.4, -0.5, // 11
        // Inside
        0.4, -0.5, -0.4, // 12
        0.5, -0.5, -0.4, // 13
        0.5, -0.4, -0.4, // 14
        0.4, -0.4, -0.4, // 15

        // Righttop-near cube
        // Outside
        0.4, 0.4, -0.5, // 16
        0.5, 0.4, -0.5, // 17
        0.5, 0.5, -0.5, // 18
        0.4, 0.5, -0.5, // 19
        // Inside
        0.4, 0.4, -0.4, // 20
        0.5, 0.4, -0.4, // 21
        0.5, 0.5, -0.4, // 22
        0.4, 0.5, -0.4, // 23

        // Lefttop-near cube
        // Outside
        -0.5, 0.4, -0.5, // 24
        -0.4, 0.4, -0.5, // 25
        -0.4, 0.5, -0.5, // 26
        -0.5, 0.5, -0.5, // 27
        // Inside
        -0.5, 0.4, -0.4, // 28
        -0.4, 0.4, -0.4, // 29
        -0.4, 0.5, -0.4, // 30
        -0.5, 0.5, -0.4, // 31

        // >> Back Square
        // Leftbottom-far cube
        // Outside
        -0.5, -0.5, 0.5, // 32
        -0.4, -0.5, 0.5, // 33
        -0.4, -0.4, 0.5, // 34
        -0.5, -0.4, 0.5, // 35
        // Inside
        -0.5, -0.5, 0.4, // 36
        -0.4, -0.5, 0.4, // 37
        -0.4, -0.4, 0.4, // 38
        -0.5, -0.4, 0.4, // 39

        // Rightbottom-far cube
        // Outside
        0.4, -0.5, 0.5, // 40
        0.5, -0.5, 0.5, // 41
        0.5, -0.4, 0.5, // 42
        0.4, -0.4, 0.5, // 43
        // Inside
        0.4, -0.5, 0.4, // 44
        0.5, -0.5, 0.4, // 45
        0.5, -0.4, 0.4, // 46
        0.4, -0.4, 0.4, // 47

        // Righttop-far cube
        // Outside
        0.4, 0.4, 0.5, // 48
        0.5, 0.4, 0.5, // 49
        0.5, 0.5, 0.5, // 50
        0.4, 0.5, 0.5, // 51
        // Inside
        0.4, 0.4, 0.4, // 52
        0.5, 0.4, 0.4, // 53
        0.5, 0.5, 0.4, // 54
        0.4, 0.5, 0.4, // 55

        // Lefttop-far cube
        // Outside
        -0.5, 0.4, 0.5, // 56
        -0.4, 0.4, 0.5, // 57
        -0.4, 0.5, 0.5, // 58
        -0.5, 0.5, 0.5, // 59
        // Inside
        -0.5, 0.4, 0.4, // 60
        -0.4, 0.4, 0.4, // 61
        -0.4, 0.5, 0.4, // 62
        -0.5, 0.5, 0.4, // 63
    ],   
    indices : [
        // Front Face
        // Down
        0, 9, 11,
        0, 11, 2,
        // Right
        9, 18, 16,
        9, 16, 11,
        // Up
        18, 27, 25,
        18, 25, 16,
        // Left
        27, 0, 2,
        27, 2, 25,

        // Front Inner
        // Down
        5, 6, 15,
        5, 15, 12,
        // Right
        15, 20, 21,
        15, 21, 14,
        // Up
        29, 30, 23,
        29, 23, 20,
        // Left
        7, 28, 29,
        7, 29, 6,

        // Back Face
        // Down
        32, 34, 43,
        32, 43, 41,
        // Right
        41, 43, 48,
        41, 48, 50,
        // Up
        50, 48, 57,
        50, 57, 59,
        // Left
        59, 57, 34,
        59, 34, 32,

        // Back Inner
        // Down
        37, 44, 47,
        37, 47, 38,
        // Right
        46, 53, 52,
        46, 52, 47,
        // Up
        55, 62, 61,
        55, 61, 52,
        // Left
        60, 39, 38,
        60, 38, 61,

        // Right Face
        // Down
        9, 41, 46,
        9, 46, 14,
        // Right
        41, 50, 53,
        41, 53, 46,
        // Up
        50, 18, 21,
        50, 21, 53,
        // Left
        18, 9, 14,
        18, 14, 21,

        // Right Inner
        // Down
        12, 15, 47,
        12, 47, 44,
        // Right
        43, 47, 52,
        43, 52, 48,
        // Up
        55, 52, 20,
        55, 20, 23,
        // Left
        16, 20, 15,
        16, 15, 11,

        // left Face
        // Down
        32, 0, 7,
        32, 7, 39,
        // Right
        0, 27, 28,
        0, 28, 7,
        // Up
        27, 59, 60,
        27, 60, 28,
        // Left
        59, 32, 39,
        59, 39, 60,

        // left Inner
        // Down
        37, 38, 6,
        37, 6, 5,
        // Right
        2, 6, 29,
        2, 29, 25,
        // Up
        30, 29, 61,
        30, 61, 62,
        // Left
        57, 61, 38,
        57, 38, 34,

        // Top Face
        // Down
        27, 18, 23,
        27, 23, 30,
        // Right
        18, 50, 55,
        18, 55, 23,
        // Up
        50, 59, 62,
        50, 62, 55,
        // Left
        59, 27, 30,
        59, 30, 62,

        // Top Inner
        // Down
        25, 29, 20,
        25, 20, 16,
        // Right
        21, 20, 52,
        21, 52, 53,
        // Up
        48, 52, 61,
        48, 61, 57,
        // Left
        60, 61, 29,
        60, 29, 28,

        // Bottom Face
        // Down
        32, 41, 44,
        32, 44, 37,
        // Right
        41, 9, 12,
        41, 12, 44,
        // Up
        9, 0, 5,
        9, 5, 12,
        // Left
        0, 32, 37,
        0, 37, 5,

        // Bottom Inner
        // Down
        34, 38, 47,
        34, 47, 43,
        // Right
        46, 47, 15,
        46, 15, 14,
        // Up
        11, 15, 6,
        11, 6, 2,
        // Left
        7, 6, 38,
        7, 38, 39,
    ],
    colors : [
        [200, 70, 120],
        [80, 70, 200],
        [70, 200, 210],
        [200, 200, 70],
        [210, 100, 70],
        [70, 180, 210],
        [100, 70, 210],
        [76, 210, 100],
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[Math.floor(i / 6) % 8]);
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
        const cent = this.centroid;
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 1] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 2] - cent[0]);
        }
        return positions
    },
}

export const pyramid = {
    vertices : [
        0.02, 0.32, -0.07, 
        0.01, 0.34, -0.06, 
        0.01, 0.34, -0.06, 
        0.01, 0.34, -0.06, 
        0.02, 0.32, -0.04, 
        0.01, 0.34, -0.06, 
        0.02, 0.32, -0.07, 
        0.01, 0.34, -0.07, 
        0.02, 0.32, -0.04, 
        -0.03, 0.26, -0.02, 
        -0.1, 0.26, -0.02, 
        -0.03, 0.26, -0.02, 
        -0.07, 0.34, -0.06, 
        -0.03, 0.26, -0.1, 
        -0.1, 0.26, -0.1, 
        -0.1, 0.26, -0.1, 
        -0.03, 0.26, -0.1, 
        -0.03, 0.26, -0.02, 
        -0.13, 0.26, -0.02, 
        -0.07, 0.34, 0.02, 
        -0.07, 0.34, 0.02, 
        -0.03, 0.26, -0.02, 
        -0.03, 0.26, -0.1, 
        0.25, -0.29, 0.34, 
        0.25, -0.29, 0.26, 
        -0.39, -0.29, 0.34, 
        -0.39, -0.29, 0.26, 
        0.32, -0.29, 0.26, 
        -0.15, 0.34, -0.06, 
        -0.47, -0.29, 0.26, 
        -0.15, 0.34, -0.06, 
        -0.1, 0.26, -0.1, 
        -0.47, -0.29, -0.38,
        -0.39, -0.29, -0.38, 
        -0.1, 0.26, -0.1, 
        -0.35, -0.29, -0.35, 
        -0.35, -0.29, 0.21, 
        0.21, -0.29, -0.35, 
        -0.39, -0.29, -0.45, 
        0.21, -0.29, 0.21, 
        0.32, -0.29, -0.38, 
        0.25, -0.29, -0.38, 
        0.25, -0.29, -0.45, 
        -0.07, 0.34, -0.1, 
        -0.07, 0.34, -0.1, 
        -0.03, 0.26, -0.1, 
        -0.39, -0.35, 0.25, 
        -0.39, -0.35, -0.39, 
        0.24, -0.35, -0.39, 
        0.24, -0.35, 0.25, 
        -0.5, -0.35, 0.37, 
        -0.5, -0.35, -0.48, 
        0.35, -0.35, -0.48, 
        0.35, -0.35, 0.37, 
        -0.07, 0.5, -0.057
    ],   
    indices : [
        0, 1, 2, 3, 4, 5, 3, 5, 1, 
        1, 5, 2, 0, 2, 6, 6, 2, 7,
        7, 2, 5, 7, 5, 8, 8, 5, 4, 
        9, 10, 11, 11, 10, 12, 13, 11, 12, 
        10, 14, 12, 15, 16, 14, 14, 16, 13, 
        14, 13, 12, 9, 17, 10, 10, 17, 18, 
        18, 17, 19, 19, 17, 20, 20, 17, 21,
        9, 11, 17, 17, 11, 7, 7, 11, 13, 
        7, 13, 22, 22, 13, 16, 23, 20, 24, 
        24, 20, 21, 25, 26, 19, 19, 26, 18, 
        27, 24, 8, 8, 24, 21, 8, 21, 7, 
        7, 21, 17, 18, 26, 28, 28, 26, 29, 
        10, 18, 14, 14, 18, 30, 14, 30, 31, 
        18, 28, 30, 31, 15, 14, 32, 33, 30, 
        30, 33, 34, 30, 34, 31, 35, 32, 36, 
        36, 32, 29, 36, 29, 26, 37, 38, 35, 
        35, 38, 33, 35, 33, 32, 39, 40, 37, 
        37, 40, 41, 37, 41, 42, 36, 23, 39, 
        39, 23, 24, 39, 24, 27, 27, 40, 39, 
        42, 38, 37, 26, 25, 36, 36, 25, 23, 
        16, 15, 22, 22, 15, 31, 22, 31, 43, 
        43, 31, 34, 43, 44, 22, 22, 44, 45, 
        34, 33, 43, 43, 33, 38, 45, 44, 41, 
        41, 44, 42, 36, 46, 35, 35, 46, 47,
        35, 47, 37, 37, 47, 48, 41, 6, 45, 
        45, 6, 7, 45, 7, 22, 41, 40, 6, 
        39, 37, 49, 49, 37, 48, 36, 39, 46,
        46, 39, 49, 49, 50, 46, 46, 50, 51, 
        46, 51, 47, 47, 51, 52, 47, 52, 48, 
        48, 52, 49, 49, 52, 53, 49, 53, 50, 
        25, 50, 23, 23, 50, 53, 23, 53, 20, 
        20, 53, 54, 20, 54, 19, 19, 54, 50, 
        19, 50, 25, 28, 29, 50, 50, 29, 32, 
        50, 32, 51, 51, 32, 30, 51, 30, 54, 
        54, 30, 28, 54, 28, 50, 43, 54, 44, 
        44, 54, 52, 44, 52, 42, 42, 52, 51, 
        42, 51, 38, 38, 51, 43, 43, 51, 54, 
        0, 6, 1, 1, 6, 54, 1, 54, 3, 
        3, 54, 8, 3, 8, 4, 54, 6, 52, 
        52, 6, 40, 52, 40, 53, 53, 40, 27, 
        53, 27, 8, 54, 53, 8
    ],
    colors : [
        [200, 70, 120],
        [80, 70, 200],
        [70, 200, 210],
        [200, 200, 70],
        [210, 100, 70],
        [70, 180, 210],
        [100, 70, 210],
        [76, 210, 100],
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[Math.floor(i / 6) % 8]);
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
        const cent = this.centroid;
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 1] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 2] - cent[0]);
        }
        return positions
    },
}

export const dodecahedron = {
    vertices: [
        -0.4669085213131526, 0.15160873665083954, -0.7946135484773672,
        -0.5771533786923223, 0.18742942250603814, -0.7946135484773672,
        9.476817830373934e-05, 0.4909065099931162, -0.7946135484773672,
        9.476817830373934e-05, 0.606823852357223, -0.7946135484773672,
        0.46709766435570127, 0.15160873665083954, -0.7946135484773672,
        0.5773425217348709, 0.18742942250603814, -0.7946135484773672,
        0.2887194058351288, -0.3973864234584409, -0.7946136795822254,
        0.3568528069765316, -0.49116715522698273, -0.7946136795822254,
        -0.2885302627925801, -0.3973864234584409, -0.7946136795822254,
        -0.3566636639339829, -0.49116715522698273, -0.7946136795822254,
        0.2887194058351288, -0.5331067700535125, -0.7107342373508578,
        0.46709766435570127, -0.7786251863585372, -0.2196977484236308,
        0.5773425217348709, -0.7946442427140609, -0.18765963571258357,
        9.476817830373934e-05, -0.93036287089502, 0.0837793390634473,
        9.476817830373934e-05, -0.9822039878370321, 0.18745985453335917,
        -0.4669085213131526, -0.7786251863585372, -0.2196977484236308,
        -0.5771533786923223, -0.7946442427140609, -0.18765963571258357,
        -0.2885302627925801, -0.5331067700535125, -0.7107342373508578,
        -0.4176055020151126, -0.4393260382849706, -0.7107342373508578,
        -0.5959854789497975, -0.6848444545899953, -0.2196977484236308,
        -0.8846103132636519, -0.28758835374848774, 0.0837793390634473,
        -0.9339133325616918, -0.3036074101040114, 0.18745985453335917,
        -0.8846103132636519, 0.20344847886156178, -0.2196977484236308,
        -0.9339133325616918, 0.30334676487014484, -0.18765791729847114,
        -0.5959854789497975, 0.10966894998289857, -0.7107342373508578,
        -0.5466824596517574, 0.26140715004361514, -0.7107340655094466,
        -0.8353072939656119, 0.355187881812157, -0.2196977484236308,
        -0.5466824596517574, 0.7524439826536646, 0.0837793390634473,
        -0.5771533786923223, 0.7943835974801944, 0.18745985453335917,
        -0.07967902313450805, 0.9041833856042598, -0.2196977484236308,
        9.476817830373934e-05, 0.9819433426031657, -0.18765791729847114,
        -0.07967902313450805, 0.6007062981171818, -0.7107340655094466,
        0.546871602694306, 0.26140715004361514, -0.7107340655094466,
        0.07986833801846789, 0.6007062981171818, -0.7107340655094466,
        0.07986833801846789, 0.9041833856042598, -0.2196977484236308,
        0.546871602694306, 0.7524439826536646, 0.0837793390634473,
        0.5773425217348709, 0.7943835974801944, 0.18745985453335917,
        0.8354964370081605, 0.355187881812157, -0.2196977484236308,
        0.9341024756042404, 0.30334676487014484, -0.18765791729847114,
        0.8847994563062005, 0.20344847886156178, -0.2196977484236308,
        0.8847994563062005, -0.28758835374848774, 0.0837793390634473,
        0.9341024756042404, -0.3036074101040114, 0.18745985453335917,
        0.596174621992346, -0.6848444545899953, -0.2196977484236308,
        0.4177963634717736, -0.4393260382849706, -0.7107342373508578,
        0.596174621992346, 0.10966894998289857, -0.7107342373508578,
        0.8354964370081605, -0.35544852704602353, 0.2194979672444065,
        0.546871602694306, -0.26166779527748163, 0.7105347998544559,
        0.5773425217348709, -0.1876900677399046, 0.7944140295075155,
        0.07986833801846789, -0.6009669433510482, 0.7105347998544559,
        9.476817830373934e-05, -0.6070844975910894, 0.7944140295075155,
        0.07986833801846789, -0.9044440308381262, 0.2194979672444065,
        0.546871602694306, -0.752704627887531, -0.08397912024267157,
        -0.07967902313450805, -0.9044440308381262, 0.2194979672444065,
        -0.07967902313450805, -0.6009669433510482, 0.7105347998544559,
        -0.5466824596517574, -0.26166779527748163, 0.7105347998544559,
        -0.5771533786923223, -0.1876900677399046, 0.7944140295075155,
        -0.8353072939656119, -0.35544852704602353, 0.2194979672444065,
        -0.5466824596517574, -0.752704627887531, -0.08397912024267157,
        -0.8846103132636519, -0.20370912409542824, 0.2194979672444065,
        -0.5959854789497975, -0.10992959521676504, 0.7105347998544559,
        -0.4176055020151126, 0.43906539305110404, 0.7105347998544559,
        -0.3566636639339829, 0.4909065099931162, 0.7944140295075155,
        -0.5959854789497975, 0.6845838093561288, 0.21949968565851882,
        -0.8846103132636519, 0.2873277085146212, -0.08397912024267157,
        0.2887194058351288, 0.5328461248196459, 0.7105347998544559,
        0.3568528069765316, 0.4909065099931162, 0.7944140295075155,
        0.46709766435570127, 0.7783645411246708, 0.21949968565851882,
        9.476817830373934e-05, 0.9301022256611536, -0.08397740182855927,
        -0.4669085213131526, 0.7783645411246708, 0.21949968565851882,
        -0.2885302627925801, 0.5328461248196459, 0.7105347998544559,
        0.8847994563062005, 0.2873277085146212, -0.08397912024267157,
        0.8847994563062005, -0.20370912409542824, 0.2194979672444065,
        0.596174621992346, -0.10992959521676504, 0.7105347998544559,
        0.4177963634717736, 0.43906539305110404, 0.7105347998544559,
        0.596174621992346, 0.6845838093561288, 0.21949968565851882,
        0.46709766435570127, -0.151869381884706, 0.7944140295075155,
        0.2887194058351288, 0.3971274966386867, 0.7944140295075155,
        -0.2885302627925801, 0.3971274966386867, 0.7944140295075155,
        -0.4669085213131526, -0.151869381884706, 0.7944140295075155,
        9.476817830373934e-05, -0.49116715522698273, 0.7944140295075155,
        -0.7555333556270071, 0.2453880936880915, -0.15183757512609503,
        -0.4669085213131526, 0.15160873665083954, -0.6428745795775558,
        -0.7555333556270071, -0.24564873892195796, 0.15163951236098305,
        -0.4669085213131526, -0.6429048397634655, -0.15183757512609503,
        -0.2885302627925801, -0.3973864234584409, -0.642874751418967,
        0.2887194058351288, -0.3973864234584409, -0.642874751418967,
        9.476817830373934e-05, -0.7946442427140609, 0.15163951236098305,
        0.46709766435570127, -0.6429048397634655, -0.15183757512609503,
        0.46709766435570127, 0.15160873665083954, -0.6428745795775558,
        0.7557224986695557, -0.24564873892195796, 0.15163951236098305,
        0.7557224986695557, 0.2453880936880915, -0.15183757512609503,
        9.476817830373934e-05, 0.4909065099931162, -0.6428745795775558,
        9.476817830373934e-05, 0.7943835974801944, -0.15183757512609503,
        0.46709766435570127, 0.6426441945295991, 0.15163951236098305,
        -0.4669085213131526, 0.6426441945295991, 0.15163951236098305,
        -0.4669085213131526, -0.151869381884706, 0.6426763449710325,
        -0.2885302627925801, 0.3971274966386867, 0.6426763449710325,
        9.476817830373934e-05, -0.49116715522698273, 0.6426763449710325,
        0.46709766435570127, -0.151869381884706, 0.6426763449710325,
        0.2887194058351288, 0.3971274966386867, 0.6426763449710325,                    
    ],   
    indices: [
        0, 1, 2,
        2, 1, 3,
        2, 3, 4,
        4, 3, 5,
        4, 5, 6,
        6, 5, 7,
        6, 7, 8,
        8, 7, 9,
        8, 9, 0,
        0, 9, 1,
        10, 7, 11,
        11, 7, 12,
        11, 12, 13,
        13, 12, 14,
        13, 14, 15,
        15, 14, 16,
        15, 16, 17,
        17, 16, 9,
        17, 9, 10,
        10, 9, 7,
        18, 9, 19,
        19, 9, 16,
        19, 16, 20,
        20, 16, 21,
        20, 21, 22,
        22, 21, 23,
        22, 23, 24,
        24, 23, 1,
        24, 1, 18,
        18, 1, 9,
        25, 1, 26,
        26, 1, 23,
        26, 23, 27,
        27, 23, 28,
        27, 28, 29,
        29, 28, 30,
        29, 30, 31,
        31, 30, 3,
        31, 3, 25,
        25, 3, 1,
        32, 5, 33,
        33, 5, 3,
        33, 3, 34,
        34, 3, 30,
        34, 30, 35,
        35, 30, 36,
        35, 36, 37,
        37, 36, 38,
        37, 38, 32,
        32, 38, 5,
        39, 38, 40,
        40, 38, 41,
        40, 41, 42,
        42, 41, 12,
        42, 12, 43,
        43, 12, 7,
        43, 7, 44,
        44, 7, 5,
        44, 5, 39,
        39, 5, 38,
        45, 41, 46,
        46, 41, 47,
        46, 47, 48,
        48, 47, 49,
        48, 49, 50,
        50, 49, 14,
        50, 14, 51,
        51, 14, 12,
        51, 12, 45,
        45, 12, 41,
        52, 14, 53,
        53, 14, 49,
        53, 49, 54,
        54, 49, 55,
        54, 55, 56,
        56, 55, 21,
        56, 21, 57,
        57, 21, 16,
        57, 16, 52,
        52, 16, 14,
        58, 21, 59,
        59, 21, 55,
        59, 55, 60,
        60, 55, 61,
        60, 61, 62,
        62, 61, 28,
        62, 28, 63,
        63, 28, 23,
        63, 23, 58,
        58, 23, 21,
        64, 65, 66,
        66, 65, 36,
        66, 36, 67,
        67, 36, 30,
        67, 30, 68,
        68, 30, 28,
        68, 28, 69,
        69, 28, 61,
        69, 61, 64,
        64, 61, 65,
        70, 38, 36,
        38, 70, 41,
        41, 70, 71,
        41, 71, 47,
        47, 71, 72,
        47, 72, 65,
        65, 72, 73,
        65, 73, 36,
        36, 73, 74,
        36, 74, 70,
        75, 47, 76,
        76, 47, 65,
        76, 65, 77,
        77, 65, 61,
        77, 61, 78,
        78, 61, 55,
        78, 55, 79,
        79, 55, 49,
        79, 49, 75,
        75, 49, 47,
        80, 22, 81,
        81, 22, 24,
        82, 20, 80,
        80, 20, 22,
        83, 19, 82,
        82, 19, 20,
        84, 18, 83,
        83, 18, 19,
        81, 24, 84,
        84, 24, 18,
        17, 84, 15,
        15, 84, 83,
        84, 17, 85,
        85, 17, 10,
        86, 13, 83,
        83, 13, 15,
        87, 11, 86,
        86, 11, 13,
        85, 10, 87,
        87, 10, 11,
        43, 85, 42,
        42, 85, 87,
        85, 43, 88,
        88, 43, 44,
        89, 40, 87,
        87, 40, 42,
        90, 39, 89,
        89, 39, 40,
        88, 44, 90,
        90, 44, 39,
        91, 33, 92,
        92, 33, 34,
        32, 88, 37,
        37, 88, 90,
        88, 32, 91,
        91, 32, 33,
        93, 35, 90,
        90, 35, 37,
        92, 34, 93,
        93, 34, 35,
        80, 26, 94,
        94, 26, 27,
        26, 80, 25,
        25, 80, 81,
        91, 31, 81,
        81, 31, 25,
        31, 91, 29,
        29, 91, 92,
        94, 27, 92,
        92, 27, 29,
        8, 84, 6,
        6, 84, 85,
        6, 85, 4,
        4, 85, 88,
        4, 88, 2,
        2, 88, 91,
        2, 91, 0,
        0, 91, 81,
        0, 81, 8,
        8, 81, 84,
        82, 58, 95,
        95, 58, 59,
        58, 82, 63,
        63, 82, 80,
        63, 80, 62,
        62, 80, 94,
        96, 60, 94,
        94, 60, 62,
        95, 59, 96,
        96, 59, 60,
        52, 86, 57,
        57, 86, 83,
        86, 52, 97,
        97, 52, 53,
        57, 83, 56,
        56, 83, 82,
        56, 82, 54,
        54, 82, 95,
        97, 53, 95,
        95, 53, 54,
        45, 89, 51,
        51, 89, 87,
        89, 45, 98,
        98, 45, 46,
        51, 87, 50,
        50, 87, 86,
        50, 86, 48,
        48, 86, 97,
        98, 46, 97,
        97, 46, 48,
        74, 93, 70,
        70, 93, 90,
        93, 74, 99,
        99, 74, 73,
        70, 90, 71,
        71, 90, 89,
        71, 89, 72,
        72, 89, 98,
        99, 73, 98,
        98, 73, 72,
        67, 92, 66,
        66, 92, 93,
        68, 94, 67,
        67, 94, 92,
        69, 96, 68,
        68, 96, 94,
        66, 93, 64,
        64, 93, 99,
        96, 69, 99,
        99, 69, 64,
        79, 97, 78,
        78, 97, 95,
        78, 95, 77,
        77, 95, 96,
        75, 98, 79,
        79, 98, 97,
        76, 99, 75,
        75, 99, 98,
        77, 96, 76,
        76, 96, 99,        
    ],
    colors : [
        [200, 70, 120],
        [80, 70, 200],
        [70, 200, 210],
        [200, 200, 70],
        [210, 100, 70],
        [70, 180, 210],
        [100, 70, 210],
        [76, 210, 100],
        [140, 210, 80],
        [90, 130, 110],
        [160, 160, 220],
        [100, 210, 180],
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[Math.floor(i / 6) % 12]);
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
        const cent = this.centroid;
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 1] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 2] - cent[0]);
        }
        return positions
    },
}

export const solidcube = {
    vertices : [
        -0.5, -0.5, -0.5, // 0
        0.5, -0.5, -0.5, // 1
        0.5, 0.5, -0.5, // 2
        -0.5, 0.5, -0.5, // 3
        -0.5, -0.5, 0.5, // 4
        0.5, -0.5, 0.5, // 5
        0.5, 0.5, 0.5, // 6
        -0.5, 0.5, 0.5, //7
    ],   
    indices: [
               // Front Face
        // Front
        0, 1, 2,
        0, 2, 3,
        // Back
        4, 7, 6,
        4, 6, 5,
        // Left
        0, 3, 7,
        0, 7, 4,
        // Rigth
        1, 5, 6,
        1, 6, 2,
        // Top
        3, 2, 6,
        3, 6, 7,
        // Down
        0, 4, 5,
        0, 5, 1,
    ],
    colors : [
        [200, 70, 120],
        [80, 70, 200],
        [70, 200, 210],
        [200, 200, 70],
        [210, 100, 70],
        [70, 180, 210],
        [100, 70, 210],
        [76, 210, 100],
    ],
    get colorarray() {
        var colorarray = [];
        for (var i = 0; i < this.indices.length; i++) {
            colorarray.push(this.colors[Math.floor(i / 6) % 8]);
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
        const cent = this.centroid;
        var positions = [];
        for (var i = 0; i < this.indices.length; i++) {
            positions.push(this.vertices[this.indices[i] * 3] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 1] - cent[0]);
            positions.push(this.vertices[this.indices[i] * 3 + 2] - cent[0]);
        }
        return positions
    },
}