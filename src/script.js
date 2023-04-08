import { webglShaderProgram } from "./engine.js";
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
    normalize
} from "./math.js";
import { cube, dodecahedron, pyramid } from "./object/models.js";
import { example } from "./object/articulated.js";
import { save } from "./save.js";

("use strict");

// Hardcoded values----------------------------------------------
let renderedmodel = example;
let rotation = [0, 0, 0];
let translation = [0, 0, 0];
let scale = [1, 1, 1];
let shear = [116.565, 63.435];
let fieldOfViewRadians = (120 * Math.PI) / 180;
let height = 0.0;
let radius = 1.0;
let camRotation = 0;
let shading = false;
let animrotation = 1;
let liverotation = 1;
let animFrameId;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

function main() {
    // Get Canvas Context
    // const canvas = document.getElementById("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        console.error("WebGL not supported");
        return;
    }

    // Set White Background
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    // Programs
    var shaderProgramRaw = webglShaderProgram(gl, "vs", "fs");
    var shaderProgramShading = webglShaderProgram(gl, "vss", "fss");

    if (!shaderProgramRaw) {
        console.error("Default program failed to compile");
        return;
    }
    if (!shaderProgramShading) {
        console.error("Shading program failed to compile");
        return;
    }

    // Globals to indicate type of program and attributes/uniforms
    var program, positionLocation, transformLocation, colorLocation;

    // Create Buffers
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Get Attributes
    const position = gl.getAttribLocation(shaderProgramRaw, "a_position");
    const color = gl.getAttribLocation(shaderProgramRaw, "a_color");
    const position_s = gl.getAttribLocation(shaderProgramShading, "a_position");
    const color_s = gl.getAttribLocation(shaderProgramShading, "a_color");

    // Get Tranform
    const transform = gl.getUniformLocation(shaderProgramRaw, "u_matrix");
    const transform_s = gl.getUniformLocation(shaderProgramShading, "u_matrix");

    // Set up page component
    document.getElementById("shearX").hidden = true;
    document.getElementById("valuesx").hidden = true;
    document.getElementById("shearY").hidden = true;
    document.getElementById("valuesy").hidden = true;
    document.getElementById("fieldOfView").hidden = true;
    document.getElementById("valuefov").hidden = true;
    document.getElementById("type-custom").enable = false;
    const reader = new FileReader();
    projectionListener();
    modelTypeListener();
    sliderListener();
    resetButton();
    shadingListener();
    saveListener();
    readerListener(reader);
    loadListener();
    animationListener();

    // Draw
    window.requestAnimationFrame(render);

    function animationListener() {
        document.getElementById("animation")
            .addEventListener("click", function (event) {
                if (event.target.checked) {
                    window.requestAnimationFrame(animrender);
                } else {
                    animrotation = 1
                    liverotation = 1
                    window.cancelAnimationFrame(animFrameId);
                    window.requestAnimationFrame(render);
                }
            });
    }

    function projectionListener() {
        // PROJECTION Radio Button ------------------------------------------------------
        document
            .getElementById("projection-orth")
            .addEventListener("click", function (event) {
                document.getElementById("shearX").hidden = true;
                document.getElementById("valuesx").hidden = true;
                document.getElementById("shearY").hidden = true;
                document.getElementById("valuesy").hidden = true;

                document.getElementById("fieldOfView").hidden = true;
                document.getElementById("valuefov").hidden = true;

                window.requestAnimationFrame(render);
            });
        document
            .getElementById("projection-obliq")
            .addEventListener("click", function (event) {
                document.getElementById("shearX").hidden = false;
                document.getElementById("valuesx").hidden = false;
                document.getElementById("shearY").hidden = false;
                document.getElementById("valuesy").hidden = false;

                document.getElementById("fieldOfView").hidden = true;
                document.getElementById("valuefov").hidden = true;

                window.requestAnimationFrame(render);
            });
        document
            .getElementById("projection-persp")
            .addEventListener("click", function (event) {
                document.getElementById("shearX").hidden = true;
                document.getElementById("valuesx").hidden = true;
                document.getElementById("shearY").hidden = true;
                document.getElementById("valuesy").hidden = true;

                document.getElementById("fieldOfView").hidden = false;
                document.getElementById("valuefov").hidden = false;

                window.requestAnimationFrame(render);
            });
    }

    function modelTypeListener() {
        // MODEL TYPE ------------------------------------------------------
        document
            .getElementById("type-cube")
            .addEventListener("click", function (event) {
                renderedmodel = example;
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("type-pyramid")
            .addEventListener("click", function (event) {
                renderedmodel = pyramid;
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("type-dodec")
            .addEventListener("click", function (event) {
                renderedmodel = dodecahedron;
                window.requestAnimationFrame(render);
            });
    }

    function sliderListener() {
        // CAMERA Slider ---------------------------------------------------------
        document
            .getElementById("height")
            .addEventListener("input", function (event) {
                height = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("radius")
            .addEventListener("input", function (event) {
                radius = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("rotasiYcam")
            .addEventListener("input", function (event) {
                camRotation = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });

        // SHEAR Oblique ------------------------------------------------------------------
        document
            .getElementById("shearX")
            .addEventListener("input", function (event) {
                shear[0] = event.target.value;
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("shearY")
            .addEventListener("input", function (event) {
                shear[1] = event.target.value;
                window.requestAnimationFrame(render);
            });
        // PERSPECTIVE Field of View ------------------------------------------------------
        document
            .getElementById("fieldOfView")
            .addEventListener("input", function (event) {
                fieldOfViewRadians = (event.target.value * Math.PI) / 180;
                window.requestAnimationFrame(render);
            });

        //TRANSLATION Slider ------------------------------------------------------
        document
            .getElementById("translasiX")
            .addEventListener("input", function (event) {
                translation[0] = parseFloat(event.target.value / 200);
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("translasiY")
            .addEventListener("input", function (event) {
                translation[1] = parseFloat(event.target.value / 200);
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("translasiZ")
            .addEventListener("input", function (event) {
                translation[2] = parseFloat(event.target.value / 200);
                window.requestAnimationFrame(render);
            });

        //ROTATION Slider ---------------------------------------------------------
        document
            .getElementById("rotasiX")
            .addEventListener("input", function (event) {
                rotation[0] = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("rotasiY")
            .addEventListener("input", function (event) {
                rotation[1] = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("rotasiZ")
            .addEventListener("input", function (event) {
                rotation[2] = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });

        //SCALE Slider --------------------------------------------------------
        document
            .getElementById("scalingX")
            .addEventListener("input", function (event) {
                scale[0] = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("scalingY")
            .addEventListener("input", function (event) {
                scale[1] = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("scalingZ")
            .addEventListener("input", function (event) {
                scale[2] = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });
    }

    function resetButton() {
        //Reset Button -------------------------------------------------------------
        document.getElementById("reset").addEventListener("click", () => {
            document.getElementById("shearX").hidden = true;
            document.getElementById("valuesx").hidden = true;
            document.getElementById("shearY").hidden = true;
            document.getElementById("valuesy").hidden = true;
            document.getElementById("fieldOfView").hidden = true;
            document.getElementById("valuefov").hidden = true;
            window.cancelAnimationFrame(animFrameId);
            renderedmodel = example;
            rotation = [0, 0, 0];
            translation = [0, 0, 0];
            scale = [1, 1, 1];
            shear = [116.565, 63.435];
            fieldOfViewRadians = (120 * Math.PI) / 180;
            height = 0.0;
            radius = 1.0;
            camRotation = 0;
            animrotation = 0;
            shading = false;
            window.requestAnimationFrame(render);
        });
        //Reset Button -------------------------------------------------------------
    }

    function shadingListener() {
        document
            .getElementById("shading")
            .addEventListener("click", function (event) {
                if (event.target.checked) {
                    shading = true;
                } else {
                    shading = false;
                }
                window.requestAnimationFrame(render);
            });
    }

    function saveListener() {
        document
            .getElementById("save")
            .addEventListener("click", function (event) {
                save(renderedmodel, translation, rotation, scale);
            });
    }

    function readerListener(reader) {
        reader.onload = null;
        reader.addEventListener("load", function (event) {
            renderedmodel = JSON.parse(event.target.result);
            window.requestAnimationFrame(render);
        });
    }

    function loadListener() {
        document.getElementById("load").addEventListener(
            "change",
            function (event) {
                const file = event.target.files[0];
                reader.readAsText(file);
                readerListener(reader);
                document.getElementById("type-custom").checked = true;
                event.target.value = "";
            },
            false
        );
    }

    function resizeCanvasToDisplaySize(canvas) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
    }

    function transformMatrix() {
        // Matrix declaration
        let finalTransformMatrix;

        const projectionMatrix = projectionType();
        const cameraPositionMatrix = cameraPosition();
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

        finalTransformMatrix = matrixMultiplication(rotationMatricesVal[2], scaleMatrixVal);
        finalTransformMatrix = matrixMultiplication(rotationMatricesVal[1], finalTransformMatrix);
        finalTransformMatrix = matrixMultiplication(rotationMatricesVal[0], finalTransformMatrix);
        finalTransformMatrix = matrixMultiplication(translationMatrixVal, finalTransformMatrix);
        finalTransformMatrix = matrixMultiplication(cameraPositionMatrix, finalTransformMatrix);
        finalTransformMatrix = matrixMultiplication(projectionMatrix, finalTransformMatrix);

        return finalTransformMatrix;
    }

    function projectionType() {
        // Set projection matrix parameter
        let aspect = gl.canvas.clientHeight / gl.canvas.clientWidth;
        let Near = -5,
            Far = 5;

        let zNear = 0.25;
        let zFar = 2000;

        // Get chosen projection (boolean value check)
        const radios = document.getElementsByName("proyeksi");

        let projection;
        for (const radio of radios) {
            if (radio.checked) {
                projection = radio.value;
                break;
            }
        }

        switch (projection) {
            case "orthographic":
                return orthographicMatrix(2, 2, Near, Far);
            case "oblique":
                return matrixMultiplication(
                    orthographicMatrix(2, 2, Near, Far),
                    shearObliqueMatrix(shear[0], shear[1])
                );
            case "perspective":
                return perspectiveMatrix(fieldOfViewRadians, aspect, zNear, zFar);
            default:
                break;
        }
    }

    function cameraPosition() {
        const up = [0, 1, 0];
        const camCoords = [0.0, 1.0, 1.0];

        var at = [0, 0, 0];

        // Compute a matrix for the camera
        var cameraRotations = rotationMatrices(0, camRotation, 0);
        var cameraPosition = translationMatrix(0, camCoords[1] * height, camCoords[2] * radius).flat();

        var cameraMatrix = matrixMultiplication(cameraRotations[1], cameraPosition);
        // cameraMatrix = matrixMultiplication(cameraRotations[2], cameraMatrix);

        var eye = [
            cameraMatrix[12],
            cameraMatrix[13],
            cameraMatrix[14],
        ];

        // Calculate Lookat Matrix
        cameraMatrix = lookAtMatrix(eye, at, up);

        // Make a view matrix from the camera matrix
        var viewMatrix = inverseMatrix(cameraMatrix);

        return viewMatrix;
    }

    // Draw hierarchical object
    function drawObjects(model) {
        if (document.getElementById("animation").checked){
            drawObjectAnim(model.source)
        } else {
            drawObject(model.source)
        }
        if (model.children != undefined) {
            for (const child of model.children) {
                drawObjects(child) // recursion call
            }
        }
    }

    // Render configuration
    function setupDraw(positions, colorarray){
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(positions),
            gl.STATIC_DRAW
        );
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

        // Colors
        gl.enableVertexAttribArray(colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Uint8Array(colorarray),
            gl.STATIC_DRAW
        );
        gl.vertexAttribPointer(colorLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);
    }

    // Draw component buffer (current object)
    function drawObject(model) {
        const positions = model.positions;
        const colorarray = model.colorarray;
        setupDraw(positions, colorarray)

        // Compute Matrix
        const finalMatrix = transformMatrix();
        gl.uniformMatrix4fv(
            transformLocation,
            false,
            new Float32Array(finalMatrix)
        );
        gl.drawArrays(gl.TRIANGLES, 0, model.indices.length);
    }

    // Draw animated component buffer (current object)
    function drawObjectAnim(model) {
        const positions = model.positions;
        const colorarray = model.colorarray;
        setupDraw(positions, colorarray)

        // Compute Matrix
        let finalMatrix = transformMatrix();
        // Apply rotate animation
        liverotation = rotation[1] += (animrotation /2 )
        if (liverotation >= 360) {
            liverotation = 1
            animrotation = 1
        }

        let animrotateMatVal = rotationMatrices(
            rotation[0],
            liverotation / 1000 * Math.PI,
            rotation[2]
        );
        finalMatrix = matrixMultiplication(animrotateMatVal[1], finalMatrix);
        gl.uniformMatrix4fv(
            transformLocation,
            false,
            new Float32Array(finalMatrix)
        );

        gl.drawArrays(gl.TRIANGLES, 0, model.indices.length);
    }

    // Rendering
    function render() {
        // Implement shading
        if (shading) {
            program = shaderProgramShading;
            positionLocation = position_s;
            transformLocation = transform_s;
            colorLocation = color_s;
        } else { // don't implement
            program = shaderProgramRaw;
            positionLocation = position;
            transformLocation = transform;
            colorLocation = color;
        }
        resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(program);
        drawObjects(renderedmodel)
    }
    function animrender() {
        render()
        animFrameId = window.requestAnimationFrame(animrender);
    }
}

main();
