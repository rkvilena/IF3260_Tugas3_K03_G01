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
    rotationMatrices
} from "./math.js";
import { hierarchy1 } from "./object/articulated.js"
import { steve } from "./object/steve.js";
import { sheep } from "./object/sheep.js";
import { fan } from "./object/fan.js";
import { save, saveAnimation } from "./save.js";
import { Tree } from "./tree.js"

("use strict");

// Hardcoded values----------------------------------------------
let renderedmodel = steve;
let rotation = [0, 0, 0];
let translation = [0, 0, 0];
let scale = [1, 1, 1];
let shear = [116.565, 63.435];
let fieldOfViewRadians = (120 * Math.PI) / 180;
let height = 0.0;
let radius = 1.0;
let camRotation = 0;
let shading = false;
let colors = false;
let animation = null;
let animate = false;
let reverse = false;
let loop = false;
var fpsInterval, startTime, now, then, elapsed;
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

    // Load Initial Texture
    var image = new Image();
    image.src = "./assets/" + renderedmodel.asset;
    console.log(image.src);
    image.onload = function () {
        configureTexture(image, renderedmodel.pixelated);
        gl.activeTexture(gl.TEXTURE0);
        // Draw
        window.requestAnimationFrame(render);
    };

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
    document.getElementById("articulated-custom").enable = false;
    const reader = new FileReader();
    const readerAnim = new FileReader();
    projectionListener();
    modelTypeListener();
    uiController()
    sliderListener();
    resetButton();
    shadingListener();
    saveListener();
    readerListener(reader);
    loadListener();
    readerAnimationListener(readerAnim);
    loadAnimationListener();
    animationListener();

    // Draw
    window.requestAnimationFrame(render);

    function uiController() {
        // -----------------UI Controller Initialize-----------------
        var rotateChildSlot = document.getElementById("rotation-for-child")
        var translateChildSlot = document.getElementById("translation-for-child")
        var scaleChildSlot = document.getElementById("scale-for-child")
        rotateChildSlot.innerHTML = ""
        translateChildSlot.innerHTML = ""
        scaleChildSlot.innerHTML = ""
        // -----------------UI Controller Initialize-----------------

        let child = tree.root
        for (const element of child.children) {
            generateInnerHtml(element.name, rotateChildSlot, translateChildSlot, scaleChildSlot)
        }
    }

    function generateInnerHtml(name, rotateChildSlot, translateChildSlot, scaleChildSlot) {
        let child = tree.findNode(name)
        if (!child)
            return ""

        let innerChild = tree.findNode(name)
        let childName = innerChild.name

        for (let j = 0; j < 3; j++) {
            let direct = direction[j]
            let rotateSlider = document.createElement('input');
            rotateSlider.id = `rotasi${direct}${childName}`;
            rotateSlider.type = 'range';
            rotateSlider.name = `rotasi${direct}${childName}`;
            rotateSlider.min = 0;
            rotateSlider.max = 360;
            rotateSlider.value = 0;
            rotateSlider.oninput = function () {
                console.log("Hello World");
                this.nextElementSibling.value = this.value;
                tree.findNode(childName).rotation[j] = parseFloat(this.value)
                tree.root.updateWorldMatrix()
                window.requestAnimationFrame(render);
            }
            rotateChildSlot.appendChild(document.createElement('br'));
            rotateChildSlot.appendChild(document.createElement('label')).textContent = `${direct} ${childName}:`;
            rotateChildSlot.appendChild(rotateSlider);
            rotateChildSlot.appendChild(document.createElement('output'));
        }

        for (let j = 0; j < 3; j++) {
            let direct = direction[j]
            let translateSlider = document.createElement('input');
            translateSlider.id = `translasi${direct}${childName}`;
            translateSlider.type = 'range';
            translateSlider.name = `translasi${direct}${childName}`;
            translateSlider.min = -100;
            translateSlider.max = 100;
            translateSlider.value = 0;
            translateSlider.oninput = function () {
                this.nextElementSibling.value = this.value;
                tree.findNode(childName).translation[j] = parseFloat(this.value / 200)
                tree.root.updateWorldMatrix()
                window.requestAnimationFrame(render);
            }
            translateChildSlot.appendChild(document.createElement('br'));
            translateChildSlot.appendChild(document.createElement('label')).textContent = `${direct} ${childName}:`;
            translateChildSlot.appendChild(translateSlider);
            translateChildSlot.appendChild(document.createElement('output'));
        }

        for (let j = 0; j < 3; j++) {
            let direct = direction[j]
            let scaleSlider = document.createElement('input');
            scaleSlider.id = `scale${direct}${childName}`;
            scaleSlider.type = 'range';
            scaleSlider.name = `translasi${direct}${childName}`;
            scaleSlider.min = 0;
            scaleSlider.max = 2;
            scaleSlider.value = 1;
            scaleSlider.step = 0.1;
            scaleSlider.oninput = function () {
                this.nextElementSibling.value = this.value;
                tree.findNode(childName).scale[j] = parseFloat(this.value)
                tree.root.updateWorldMatrix()
                window.requestAnimationFrame(render);
            }
            scaleChildSlot.appendChild(document.createElement('br'));
            scaleChildSlot.appendChild(document.createElement('label')).textContent = `${direct} ${childName}:`;
            scaleChildSlot.appendChild(scaleSlider);
            scaleChildSlot.appendChild(document.createElement('output'));
        }
        for (const element of child.children) {
            generateInnerHtml(element.name, rotateChildSlot, translateChildSlot, scaleChildSlot)
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
            .getElementById("steve")
            .addEventListener("click", function (event) {
                renderedmodel = steve;
                // Load Texture
                var image = new Image();
                image.src = "./assets/" + renderedmodel.asset;
                console.log(image.src);
                image.onload = function () {
                    configureTexture(image, renderedmodel.pixelated);
                    gl.activeTexture(gl.TEXTURE0);
                };
                tree = new Tree();
                tree.createTree(renderedmodel)
                uiController();
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("articulated2")
            .addEventListener("click", function (event) {
                renderedmodel = hierarchy1;
                // Load Texture
                var image = new Image();
                image.src = "./assets/" + renderedmodel.asset;
                console.log(image.src);
                image.onload = function () {
                    configureTexture(image, renderedmodel.pixelated);
                    gl.activeTexture(gl.TEXTURE0);
                };
                tree = new Tree();
                tree.createTree(renderedmodel)
                uiController();
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("fan")
            .addEventListener("click", function (event) {
                renderedmodel = fan;
                // Load Texture
                var image = new Image();
                image.src = "./assets/" + renderedmodel.asset;
                console.log(image.src);
                image.onload = function () {
                    configureTexture(image, renderedmodel.pixelated);
                    gl.activeTexture(gl.TEXTURE0);
                };
                tree = new Tree();
                tree.createTree(renderedmodel);
                uiController();
                window.requestAnimationFrame(render);
            });
        document
            .getElementById("sheep")
            .addEventListener("click", function (event) {
                renderedmodel = sheep;
                // Load Texture
                var image = new Image();
                image.src = "./assets/" + renderedmodel.asset;
                console.log(image.src);;
                image.onload = function () {
                    configureTexture(image, renderedmodel.pixelated);
                    gl.activeTexture(gl.TEXTURE0);
                };
                tree = new Tree();
                tree.createTree(renderedmodel);
                uiController();
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
            renderedmodel = steve;
            tree = new Tree();
            tree.createTree(renderedmodel);
            uiController();

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

    function readerAnimationListener(readerAnim) {
        readerAnim.onload = null;
        readerAnim.addEventListener("load", function (event) {
            animation = JSON.parse(event.target.result);
            document.getElementById("controller").classList.remove("hidden");
            document.getElementById("frame").max = animation.frames.length;
            document.getElementById("duration").value = parseFloat(animation.duration);
            document.getElementById("duration").nextElementSibling.value = parseFloat(animation.duration);
            tree.applyAnimation(animation.frames[0]);
            tree.root.updateWorldMatrix();
            window.requestAnimationFrame(render);
        });
    }

    function loadAnimationListener() {
        document.getElementById("newanim").addEventListener(
            "click",
            function (event) {
                animation = {
                    for: renderedmodel.class,
                    duration: 1,
                    frames: [
                    ],
                };
                let initialFrame = {};
                Object.assign(initialFrame, tree.getAnimation());
                animation.frames.push(initialFrame);
                document.getElementById("controller").classList.remove("hidden");
            },
            false
        );
        
        document.getElementById("duration").addEventListener(
            "input",
            function (event) {
                const duration = parseFloat(event.target.value);
                animation.duration = duration;
                fpsInterval = 1000 * parseFloat(animation.duration) / animation.frames.length;
            },
            false
        );

        document.getElementById("loadanim").addEventListener(
            "change",
            function (event) {
                const file = event.target.files[0];
                readerAnim.readAsText(file);
            },
            false
        );

        document.getElementById("saveanim").addEventListener(
            "click",
            function (event) {
                saveAnimation(animation, renderedmodel.class);
            },
            false
        );
        
        document.getElementById("frame").addEventListener(
            "input",
            function (event) {
                const index = parseInt(event.target.value);
                tree.applyAnimation(animation.frames[index - 1]);
                tree.root.updateWorldMatrix();
                window.requestAnimationFrame(render);
            },
            false
        );

        document.getElementById("addframe").addEventListener(
            "click",
            function (event) {
                const frame = document.getElementById("frame");
                const index = parseInt(frame.value);
                animation.frames.splice(index, 0, tree.getAnimation());
                tree.applyAnimation(animation.frames[index]);
                tree.root.updateWorldMatrix();
                window.requestAnimationFrame(render);
                frame.max = animation.frames.length;
                frame.value = index + 1;
                frame.nextElementSibling.value = index + 1;
            },
            false
        );

        document.getElementById("saveframe").addEventListener(
            "click",
            function (event) {
                const index = parseInt(document.getElementById("frame").value);
                animation.frames[index - 1] = tree.getAnimation();
            },
            false
        );

        document.getElementById("deleteframe").addEventListener(
            "click",
            function (event) {
                const frame = document.getElementById("frame");
                const index = parseInt(frame.value);
                if (animation.frames.length < 2) return;
                if (index > 1) {
                    animation.frames.splice(index - 1, 1);
                    tree.applyAnimation(animation.frames[index - 2]);
                    tree.root.updateWorldMatrix();
                    window.requestAnimationFrame(render);
                    frame.max = animation.frames.length;
                    frame.value = index - 2;
                    frame.nextElementSibling.value = index - 2;
                }
            },
            false
        );

        document.getElementById("swapprevframe").addEventListener(
            "click",
            function (event) {
                const frame = document.getElementById("frame");
                const index = parseInt(frame.value);
                if (index > 1) {
                    const temp = animation.frames[index - 2];
                    animation.frames[index - 2] = animation.frames[index - 1];
                    animation.frames[index - 1] = temp;
                    frame.value = index - 1;
                    frame.nextElementSibling.value = index - 1;
                } else {
                    const temp = animation.frames[animation.frames.length - 1];
                    animation.frames[animation.frames.length - 1] = animation.frames[index - 1];
                    animation.frames[index - 1] = temp;
                    frame.value = animation.frames.length;
                    frame.nextElementSibling.value = animation.frames.length;
                }
            },
            false
        );

        document.getElementById("swapnextframe").addEventListener(
            "click",
            function (event) {
                const frame = document.getElementById("frame");
                const index = parseInt(frame.value);
                if (index < animation.frames.length) {
                    const temp = animation.frames[index];
                    animation.frames[index] = animation.frames[index - 1];
                    animation.frames[index - 1] = temp;
                    frame.value = index + 1;
                    frame.nextElementSibling.value = index + 1;
                } else {
                    const temp = animation.frames[0];
                    animation.frames[0] = animation.frames[index - 1];
                    animation.frames[index - 1] = temp;
                    frame.value = 1;
                    frame.nextElementSibling.value = 1;
                }
            },
            false
        );

        document.getElementById("prevframe").addEventListener(
            "click",
            function (event) {
                const frame = document.getElementById("frame");
                const index = parseInt(frame.value);
                if (index > 1) {
                    tree.applyAnimation(animation.frames[index - 2]);
                    tree.root.updateWorldMatrix();
                    window.requestAnimationFrame(render);
                    frame.value = index - 1;
                    frame.nextElementSibling.value = index - 1;
                } else {
                    tree.applyAnimation(animation.frames[animation.frames.length - 1]);
                    tree.root.updateWorldMatrix();
                    window.requestAnimationFrame(render);
                    frame.value = animation.frames.length;
                    frame.nextElementSibling.value = animation.frames.length;
                }
            },
            false
        );

        document.getElementById("nextframe").addEventListener(
            "click",
            function (event) {
                const frame = document.getElementById("frame");
                const index = parseInt(frame.value);
                if (index < animation.frames.length) {
                    tree.applyAnimation(animation.frames[index]);
                    tree.root.updateWorldMatrix();
                    window.requestAnimationFrame(render);
                    frame.value = index + 1;
                    frame.nextElementSibling.value = index + 1;
                } else {
                    tree.applyAnimation(animation.frames[0]);
                    tree.root.updateWorldMatrix();
                    window.requestAnimationFrame(render);
                    frame.value = 1;
                    frame.nextElementSibling.value = 1;
                }
            },
            false
        );

        document.getElementById("playanim").addEventListener(
            "click",
            function (event) {
                startAnimation();
            },
            false
        );

        document.getElementById("pauseanim").addEventListener(
            "click",
            function (event) {
                animate = false;
                reverse = false;
            },
            false
        );

        document.getElementById("reverseanim").addEventListener(
            "click",
            function (event) {
                reverse = true;
                startAnimation();
            },
            false
        );

        document.getElementById("replayanim").addEventListener(
            "click",
            function (event) {
                const frame = document.getElementById("frame");
                tree.applyAnimation(animation.frames[0]);
                tree.root.updateWorldMatrix();
                frame.value = 1;
                frame.nextElementSibling.value = 1;
                window.requestAnimationFrame(render);
                startAnimation();
            },
            false
        );


        document.getElementById("loop").addEventListener(
            "click",
            function (event) {
                if (event.target.checked) {
                    loop = true;
                } else {
                    loop = false;
                }
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
        drawObject(node);
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

        if (colors) {
            // Colors
            gl.enableVertexAttribArray(colorLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Uint8Array(colorarray),
                gl.STATIC_DRAW
            );
            gl.vertexAttribPointer(colorLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);

        } else {
            // Texture
            gl.enableVertexAttribArray(textCoordLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, textCoordBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(textCoordArray),
                gl.STATIC_DRAW
            );
            gl.vertexAttribPointer(textCoordLocation, 2, gl.FLOAT, false, 0, 0);
        }
    }

    // Draw component buffer (current object)
    function drawObject(node) {
        const positions = node.source.positions;
        const colorarray = node.source.colorarray;
        const textCoordArray = node.source.texcoords;
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

        drawObjects(tree.root)
    }

    function startAnimation() {
        fpsInterval = 1000 * parseFloat(animation.duration) / animation.frames.length;
        then = Date.now();
        startTime = then;
        animate = true;
        animrender();
    }

    function animrender() {
        if (animate) window.requestAnimationFrame(animrender);

        now = Date.now();
        elapsed = now - then;

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);

            const frame = document.getElementById("frame");
            const index = parseInt(frame.value);

            if (reverse) {
                if (index > 1) {
                    tree.applyAnimation(animation.frames[index - 2]);
                    tree.root.updateWorldMatrix();
                    frame.value = index - 1;
                    frame.nextElementSibling.value = index - 1;
                } else if (loop) {
                    tree.applyAnimation(animation.frames[animation.frames.length - 1]);
                    tree.root.updateWorldMatrix();
                    frame.value = animation.frames.length;
                    frame.nextElementSibling.value = animation.frames.length;
                } else {
                    animate = false;
                    reverse = false;
                }
            } else {
                if (index < animation.frames.length) {
                    tree.applyAnimation(animation.frames[index]);
                    tree.root.updateWorldMatrix();
                    frame.value = index + 1;
                    frame.nextElementSibling.value = index + 1;
                } else if (loop) {
                    tree.applyAnimation(animation.frames[0]);
                    tree.root.updateWorldMatrix();
                    frame.value = 1;
                    frame.nextElementSibling.value = 1;
                } else {
                    animate = false;
                }
            }

            render();
        }
    }

    function configureTexture( image, pixelated ) {
        var texture = gl.createTexture();
        gl.bindTexture( gl.TEXTURE_2D, texture );
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        if (pixelated) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
        gl.generateMipmap( gl.TEXTURE_2D );
        gl.uniform1i(textureLocation, 0);
    }
}

main();