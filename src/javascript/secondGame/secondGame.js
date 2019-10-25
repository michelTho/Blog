'use strict';

var THREE = require('three');

var config = require('./secondGameConfig.js');

var scene, camera, renderer;
var geometry, material, cubes;

var article;

function loadDocumentElement() {
    article = document.getElementById('container').firstChild;
}

function load3DMainObjects() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, config.WIDTH / config.HEIGHT, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(config.WIDTH, config.HEIGHT);
    article.appendChild(renderer.domElement);

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    cubes = [];
    cubes.push(new THREE.Mesh(geometry, material));
    cubes.push(new THREE.Mesh(geometry, material));
    console.log(cubes[1]);
    cubes[1].position.x += 1.5;
    scene.add(cubes[0]);
    scene.add(cubes[1]);

    camera.position.z = 3;
}

function animate() {
    cubes[0].rotation.x += 0.01;
    cubes[1].rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function main() {
    loadDocumentElement();
    load3DMainObjects();
    animate();
}

module.exports = {
    main: main
}