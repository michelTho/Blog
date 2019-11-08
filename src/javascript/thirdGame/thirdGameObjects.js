'use strict';

var THREE = require('three');
var config = require('./thirdGameConfig.js');


var camera = new THREE.PerspectiveCamera(config.CAMERA_FOV, config.WIDTH / config.HEIGHT, config.CAMERA_NEAR, config.CAMERA_FAR);
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(config.WIDTH, config.HEIGHT);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var materials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/images/grass_block_1_corr.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/images/grass_block_2_corr.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/images/grass_block_3_corr.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/images/grass_block_4_corr.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/images/grass_block_5_corr.png') }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/images/grass_block_6_corr.png') })
];

module.exports = {
    camera: camera,
    scene: scene,
    renderer: renderer,
    geometry: geometry,
    materials: materials
};