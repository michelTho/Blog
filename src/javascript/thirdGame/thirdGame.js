'use strict';

var THREE = require('three');

var distance = require('./thirdGameHelpers.js').distance;
var config = require('./thirdGameConfig.js');
var objects = require('./thirdGameObjects.js');
var controller = require('./thirdGameController.js');

var scene = objects.scene;
var camera = objects.camera;
var renderer = objects.renderer;
var geometry = objects.geometry;
var materials = objects.materials;

var map;

var article, canvas, fpsText;

var timer;
var N = config.N;

function loadDocumentElements() {
    //The canvas is dynamically created with the renderer
    article = document.getElementById('container').firstChild;
    canvas = renderer.domElement;
    article.appendChild(canvas);

    //Text to print the fps
    fpsText = document.getElementById('fps');
    timer = Date.now();
}

function buildScene() {
    map = new Array();
    for (let i = 0; i < N; i++){
        map.push(new Array());
        for (let j = 0; j < N; j++){
            map[i].push(new Array());
            for (let k = 0; k < N; k++){
                if (Math.random() >= 0.5) {
                    map[i][j].push(new THREE.Mesh(geometry, materials));
                    map[i][j][k].position.set(i, j, k);
                    if (distance(camera, map[i][j][k]) <= config.FOG_DISTANCE){
                        scene.add(map[i][j][k]);
                    }
                } else {
                    map[i][j].push(0)
                }
            }
        }
    }

}

function bindControls() {
    /*
        The method which was adopted here is to bind controls only on mouse click. 
        The logic continuation would be to also change to full screen when clicked.
    */
    canvas.onclick = () => {
        canvas.requestPointerLock();
    }
    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === canvas) {
            document.addEventListener('mousemove', updateOrientation);
            document.addEventListener('keydown', controller.handleKeyDown);
            document.addEventListener('keyup', controller.handleKeyUp);
            console.log('controls bound!')
        }
        else {
            document.removeEventListener('mousemove', updateOrientation);
            document.removeEventListener('keydown', controller.handleKeyDown);
            document.removeEventListener('keyup', controller.handleKeyUp);
            console.log('controls unbound!');
        }
    });
}

function updateOrientation(event) {
    controller.handleMouseMove(event);
    camera.quaternion.set(controller.orientation.x, controller.orientation.y, controller.orientation.z, controller.orientation.w);
}

function removeAndAddCubes() {
    //TODO
}

function animate() {
    fpsText.innerText = Math.round(1000 / (Date.now() - timer));
    timer = Date.now();
    if (controller.goingLeft) {
        camera.position.x += Math.cos(controller.theta) * 0.16;
        camera.position.y += Math.sin(controller.theta) * 0.16;
    }
    if (controller.goingUp) {
        camera.position.x += Math.sin(controller.theta) * 0.16;
        camera.position.y -= Math.cos(controller.theta) * 0.16;
    }
    if (controller.goingRight) {
        camera.position.x -= Math.cos(controller.theta) * 0.16;
        camera.position.y -= Math.sin(controller.theta) * 0.16;
    }
    if (controller.goingDown) {
        camera.position.x -= Math.sin(controller.theta) * 0.16;
        camera.position.y += Math.cos(controller.theta) * 0.16;
    }
    removeAndAddCubes();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function main() {
    loadDocumentElements();
    buildScene();
    bindControls();
    animate();
}

module.exports = {
    main: main
}