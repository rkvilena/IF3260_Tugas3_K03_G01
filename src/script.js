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
    identityMatrix
} from "./math.js";
import { cube, dodecahedron, pyramid } from "./object/models.js";
import { hierarchy1, hierarchy2, threebox } from "./object/articulated.js";
import { save } from "./save.js";
import { Tree } from "./tree.js"

("use strict");

// Hardcoded values----------------------------------------------
let renderedmodel = threebox;
let rotation = [0, 0, 0];
let translation = [0, 0, 0];
let scale = [1, 1, 1];
let shear = [116.565, 63.435];
let fieldOfViewRadians = (120 * Math.PI) / 180;
let height = 0.0;
let radius = 1.0;
let camRotation = 0;
let shading = false;
let animFrameId;
let tree = new Tree();
const direction = ["X", "Y", "Z"];
tree.createTree(renderedmodel)

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
    var shaderProgramTexture = webglShaderProgram(gl, "vst", "fst");

    if (!shaderProgramRaw) {
        console.error("Default program failed to compile");
        return;
    }
    if (!shaderProgramShading) {
        console.error("Shading program failed to compile");
        return;
    }
    if (!shaderProgramTexture) {
        console.error("Shading program failed to compile");
        return;
    }

    // Globals to indicate type of program and attributes/uniforms
    var program, positionLocation, transformLocation, colorLocation, textCoordLocation, textureLocation;

    // Create Buffers
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    var textCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textCoordBuffer);

    // Get Attributes
    const position = gl.getAttribLocation(shaderProgramRaw, "a_position");
    const color = gl.getAttribLocation(shaderProgramRaw, "a_color");
    const position_s = gl.getAttribLocation(shaderProgramShading, "a_position");
    const color_s = gl.getAttribLocation(shaderProgramShading, "a_color");
    const position_t = gl.getAttribLocation(shaderProgramTexture, "a_position");
    const color_t = gl.getAttribLocation(shaderProgramTexture, "a_color");
    const textCoord = gl.getAttribLocation(shaderProgramTexture, "a_textcoord");

    // Get Tranform
    const transform = gl.getUniformLocation(shaderProgramRaw, "u_matrix");
    const transform_s = gl.getUniformLocation(shaderProgramShading, "u_matrix");
    const transform_t = gl.getUniformLocation(shaderProgramTexture, "u_matrix");
    const textureLoc = gl.getUniformLocation(shaderProgramTexture, "u_texture");

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
    uiController()
    sliderListener();
    resetButton();
    shadingListener();
    saveListener();
    readerListener(reader);
    loadListener();
    animationListener();

    // Draw
    window.requestAnimationFrame(render);

    function uiController(){
        // -----------------UI Controller Initialize-----------------
        var rotateChildSlot = document.getElementById("rotation-for-child")
        var translateChildSlot = document.getElementById("translation-for-child")
        var scaleChildSlot = document.getElementById("scale-for-child")
        rotateChildSlot.innerHTML = ""
        translateChildSlot.innerHTML = ""
        scaleChildSlot.innerHTML = ""
        // -----------------UI Controller Initialize-----------------

        var child = tree.findNode("head")
        for(var i = 0; i < child.children.length; i++){
            generateInnerHtml(child.children[i].name, rotateChildSlot, translateChildSlot, scaleChildSlot)
        }
    }

    function generateInnerHtml(name, rotateChildSlot, translateChildSlot, scaleChildSlot){
        var child = tree.findNode(name)
        if (!child)
            return ""

        for(var j=0;j<3;j++){
            (function(){
                rotateChildSlot.innerHTML += `
                    <br />
                    <label for="rotasi${direction[j]}${child.name}">${direction[j]} ${child.name}:</label>
                    <input type="range" name="rotasi${direction[j]}${child.name}" min="0" max="360" value="0" id="rotasi${direction[j]}${child.name}"
                        oninput="this.nextElementSibling.value = this.value" />
                    <output>0</output>
                `
                let x = 0
                let innerChild = tree.findNode(name)
                let childName = innerChild.name
                let direct = direction[x]
                let slider = document.getElementById(`rotasi${direct}${childName}`)
                slider
                .addEventListener("input", function (event) {
                    tree.findNode(childName).rotation[x] = parseFloat(event.target.value)
                    tree.root.updateWorldMatrix()
                    window.requestAnimationFrame(render);
                });
            }())


            translateChildSlot.innerHTML += `
                <br />
                <label for="translasi${direction[j]}${child.name}">${direction[j]} ${child.name}:</label>
                <input type="range" name="translasi${direction[j]}${child.name}" min="-100" max="100" value="0" id="translasi${direction[j]}${child.name}"
                    oninput="this.nextElementSibling.value = this.value" />
                <output>0</output>
            `

            scaleChildSlot.innerHTML += `
                <br />
                <label for="scaling${direction[j]}${child.name}">${direction[j]} ${child.name}:</label>
                <input type="range" name="scaling${direction[j]}${child.name}" min="0" max="2" value="1" step="0.1" id="scaling${direction[j]}${child.name}"
                    oninput="this.nextElementSibling.value = this.value" />
                <output>1</output>
            `

        }
        for(var i = 0; i < child.children.length; i++){
            generateInnerHtml(child.children[i].name, rotateChildSlot, translateChildSlot, scaleChildSlot)
        }
    }

    function animationListener() {
        document.getElementById("animation")
            .addEventListener("click", function (event) {
                if (event.target.checked) {
                    window.requestAnimationFrame(animrender);
                } else {
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
                renderedmodel = hierarchy1;
                tree = new Tree();
                tree.createTree(renderedmodel)
                uiController();
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("type-pyramid")
            .addEventListener("click", function (event) {
                renderedmodel = hierarchy2;
                tree = new Tree();
                tree.createTree(renderedmodel)
                uiController();
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("type-dodec")
            .addEventListener("click", function (event) {
                renderedmodel = dodecahedron;
                tree = [];
                createTree(renderedmodel)
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
        /* CHILD NODE Y TRANSLATION EXAMPLE */
        document
            .getElementById("translasiYcube")
            .addEventListener("input", function (event) {
                tree.findNode("child1").translation[1] = parseFloat(event.target.value / 50)
                console.log(tree.findNode("child1").translation[1])
                tree.root.updateWorldMatrix()

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
        
        /* CHILD NODE Z ROTATION EXAMPLE */
        // document
        //     .getElementById("rotasiZcube")
        //     .addEventListener("input", function (event) {
        //         tree.findNode("child1").rotation[2] = parseFloat(event.target.value)
        //         tree.root.updateWorldMatrix()
        //         window.requestAnimationFrame(render);
        //     });

        //SCALE Slider --------------------------------------------------------
        document
            .getElementById("scalingX")
            .addEventListener("input", function (event) {
                scale[0] = parseFloat(event.target.value);
                window.requestAnimationFrame(render);
            });
        /* CHILD NODE X SCALING EXAMPLE */
        document
            .getElementById("scalingXcube")
            .addEventListener("input", function (event) {
                tree.findNode("child1").scale[0] = parseFloat(event.target.value)
                tree.root.updateWorldMatrix()

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
    function childRotationSliderListenerGenerator(id, node, j) {
        console.log(id + direction[j] + node)
        document
            .getElementById(id + direction[j] + node)
            .addEventListener("input", function (event) {
                tree.findNode(node).rotation[j] = parseFloat(event.target.value)
                tree.root.updateWorldMatrix()
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
                save(tree, translation, rotation, scale);
            });
    }

    function readerListener(reader) {
        reader.onload = null;
        reader.addEventListener("load", function (event) {
            renderedmodel = JSON.parse(event.target.result);
            tree = null;
            tree = new Tree();
            tree.createTree(renderedmodel)
            console.log(tree)
            tree.root.updateWorldMatrix()
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
    function drawObjects(node) {
        if (document.getElementById("animation").checked){
            drawObjectAnim(node)
        } else {
            drawObject(node)
        }
        if (node.children != undefined) {
            for (const child of node.children) {
                drawObjects(child) // recursion call
            }
        }
    }

    // Render configuration
    function setupDraw(positions, colorarray, textCoordArray){
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

        //Texture
        gl.enableVertexAttribArray(textCoordLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, textCoordBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Uint8Array(textCoordArray),
            gl.STATIC_DRAW
        );
        gl.vertexAttribPointer(textCoordLocation, 2, gl.FLOAT, false, 0, 0);
    }

    // Draw component buffer (current object)
    function drawObject(node) {
        const positions = node.source.positions;
        const colorarray = node.source.colorarray;
        const textCoordArray = new Float32Array([
            // Front
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
    
            // Back
            1, 0,
            1, 1,
            0, 1,
            1, 0,
            1, 1,
            0, 0,
    
            // Left
            1, 0,
            1, 1,
            0, 1,
            1, 0,
            1, 1,
            0, 0,
    
            // Right
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
    
            // Top
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
    
            // Down
            1, 0,
            0, 0,
            0, 1,
            0, 0,
            0, 1,
            1, 1,])
        setupDraw(positions, colorarray, textCoordArray)

        // Compute Matrix
        let finalMatrix = transformMatrix();
        finalMatrix =  matrixMultiplication(finalMatrix, node.worldMatrix)
        gl.uniformMatrix4fv(
            transformLocation,
            false,
            new Float32Array(finalMatrix)
        );
        gl.drawArrays(gl.TRIANGLES, 0, node.source.indices.length);
    }

    // Draw animated component buffer (current object)
    function drawObjectAnim(node) {
        const positions = node.source.positions;
        const colorarray = node.source.colorarray;
        const textCoordArray = new Float32Array([
            // Front
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
    
            // Back
            1, 0,
            1, 1,
            0, 1,
            1, 0,
            1, 1,
            0, 0,
    
            // Left
            1, 0,
            1, 1,
            0, 1,
            1, 0,
            1, 1,
            0, 0,
    
            // Right
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
    
            // Top
            0, 0,
            1, 0,
            1, 1,
            0, 0,
            1, 1,
            0, 1,
    
            // Down
            1, 0,
            0, 0,
            0, 1,
            0, 0,
            0, 1,
            1, 1,])
        setupDraw(positions, colorarray, textCoordArray)

        // Compute Matrix
        let finalMatrix = transformMatrix();
        finalMatrix =  matrixMultiplication(finalMatrix, node.worldMatrix)
        gl.uniformMatrix4fv(
            transformLocation,
            false,
            new Float32Array(finalMatrix)
        );

        gl.drawArrays(gl.TRIANGLES, 0, node.source.indices.length);
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
            program = shaderProgramTexture;
            positionLocation = position_t;
            transformLocation = transform_t;
            colorLocation = color_t;
            textureLocation = textureLoc;
            textCoordLocation = textCoord;
        }
        resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(program);

        // EXAMPLE - Component rotation animation
        // let animrotateMatVal = rotationMatrices(
        //     0,
        //     360 / 1000 * Math.PI,
        //     360 / 1000 * Math.PI,
        // );
        // // decanode.localMatrix = matrixMultiplication(animrotateMatVal[0], decanode.localMatrix)
        // tree[2].localMatrix = matrixMultiplication(animrotateMatVal[1], tree[2].localMatrix)
        // // pyramidnode.localMatrix = matrixMultiplication(animrotateMatVal[2], pyramidnode.localMatrix)
        // tree[0].updateWorldMatrix()
        var image = document.getElementById("moon-text");
        configureTexture(image);
        drawObjects(tree.root)
    }
    function animrender() {
        render()
        animFrameId = window.requestAnimationFrame(animrender);
    }
    function configureTexture( image ) {
        var texture = gl.createTexture();
        gl.bindTexture( gl.TEXTURE_2D, texture );
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
             gl.RGB, gl.UNSIGNED_BYTE, image );
        gl.generateMipmap( gl.TEXTURE_2D );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                          gl.NEAREST_MIPMAP_LINEAR );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    
        gl.uniform1i(textureLocation, 0);
    }
}

main();