'use strict';

var THREE = require('three');

var controller = {
    goingLeft: false,
    goingUp: false,
    goingRight: false,
    goingDown: false,
    theta: 0,
    phi: 0,
    orientation: new THREE.Quaternion(0, 0, 0, 1),
    handleKeyDown: (event) => {
        console.log('keydown!');
        switch (event.keyCode) {
            case 37:
                controller.goingLeft = true;
                event.preventDefault();
                break;
            case 38:
                controller.goingUp = true;
                event.preventDefault();
                break;
            case 39:
                controller.goingRight = true;
                event.preventDefault();
                break;
            case 40:
                controller.goingDown = true;
                event.preventDefault();
                break;
        }
    },
    handleKeyUp: (event) => {
        console.log('keyup!');
        switch (event.keyCode) {
            case 37:
                controller.goingLeft = false;
                event.preventDefault();
                break;
            case 38:
                controller.goingUp = false;
                event.preventDefault();
                break;
            case 39:
                controller.goingRight = false;
                event.preventDefault();
                break;
            case 40:
                controller.goingDown = false;
                event.preventDefault();
                break;
        }
    },
    handleMouseMove: (event) => {
        controller.phi += event.movementY / 500;
        controller.theta -= event.movementX / 500;
        if (controller.phi >= 1.57) {
            controller.phi = 1.57;
        }
        if (controller.phi <= 0) {
            controller.phi = 0;
        }
        controller.orientation.set(0, 0, 0, 1);
        controller.orientation.multiply(new THREE.Quaternion(0, 0, Math.cos(-controller.theta / 2), Math.sin(-controller.theta / 2))).normalize();
        controller.orientation.multiply(new THREE.Quaternion(Math.cos(controller.phi), 0, 0, Math.sin(controller.phi))).normalize();
    }
};

module.exports = controller;