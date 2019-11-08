'use strict';

function distance(a, b){
    return Math.sqrt(Math.pow(a.position.x - b.position.x, 2) + Math.pow(a.position.y - b.position.y, 2) + Math.pow(a.position.z - b.position.z, 2));
}

module.exports = {
    distance: distance
};