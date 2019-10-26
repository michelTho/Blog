'use strict';

var commun = {
    name: 'commun',
    domObj: document.getElementById('commun'),
    timer: 0
};
var pierre = {
    name: 'pierre',
    domObj: document.getElementById('pierre'),
    timer: 0
};
var marthe = {
    name: 'marthe',
    domObj: document.getElementById('marthe'),
    timer: 0
};
var papa = {
    name: 'papa',
    domObj: document.getElementById('papa'),
    timer: 0
};
var michel = {
    name: 'michel',
    domObj: document.getElementById('michel'),
    timer: 0
};
var maman = {
    name: 'maman',
    domObj: document.getElementById('maman'),
    timer: 0
};
var actuel = document.getElementById('actuel');

var bouton = document.getElementById('bouton');
var joueurActuel = pierre;
var timer = Date.now();

bouton.onclick = function () {
    let diff = Math.round((Date.now() - timer) / 1000, 3);
    joueurActuel.timer += diff;
    joueurActuel.domObj.innerText = joueurActuel.timer;
    timer = Date.now();
    switch (joueurActuel.name) {
        case 'pierre':
            joueurActuel = marthe;
            break;
        case 'marthe':
            joueurActuel = papa;
            break;
        case 'papa':
            joueurActuel = michel;
            break;
        case 'michel':
            joueurActuel = maman;
            break;
        case 'maman':
            joueurActuel = commun;
            break;
        case 'commun':
            joueurActuel = pierre;
            break;
    }
    actuel.innerText = joueurActuel.name;
}

actuel.innerText = joueurActuel.name;