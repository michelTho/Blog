'use strict';

import config from './secondGameConfig.js';

var scene, camera, renderer;
var geometry, material, cube;

var article;

function loadCanvas() {
    article = document.getElementById('container').firstChild;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, config.WIDTH / config.HEIGHT, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(config.WIDTH, config.HEIGHT);
    article.appendChild(renderer.domElement);

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

export function main() {
    loadCanvas();
    animate();
}