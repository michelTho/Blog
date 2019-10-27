'use strict';

import * as THREE from '../../../node_modules/three/src/Three.js';

import config from './secondGameConfig.js';

var scene, camera, renderer;
var geometry, material, cube;

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
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 3;
}

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

export function main() {
    loadDocumentElement();
    load3DMainObjects();
    animate();
}