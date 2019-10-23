'use strict';

import { Hero, Enemy } from './firstGameObjects.js';
import config from './firstGameConfig.js';

var canvas;
var ctx;
var scoreElement;

var counter;
var score;
var Enemies;

function loadCanvas() {
    canvas = document.getElementById('firstCanvas');
    ctx = canvas.getContext('2d');
    ctx.fillCircle = (x, y, radius) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    };
    canvas.height = config.HEIGHT;
    canvas.width = config.WIDTH;
    scoreElement = document.getElementById('score');
}

function reset() {
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, config.WIDTH, config.HEIGHT);

    counter = 0;
    score = 0;
    Enemies = [];
    for (let i = 0; i < config.NUMBER_ENEMIES; i++) {
        Enemies.push(Enemy.createRandom());
    };
    Hero.reset()
}

function loop() {

    //Erase past frames
    ctx.fillStyle = 'rgba(0,0,0, 0.25)';
    ctx.fillRect(0, 0, config.WIDTH, config.HEIGHT);

    //Draw enemies
    ctx.fillStyle = 'red'
    for (let i = 0; i < Enemies.length; i++) {
        ctx.fillCircle(Enemies[i].x - config.ENEMY_RADIUS, Enemies[i].y - config.ENEMY_RADIUS, config.ENEMY_RADIUS);
    }

    //Draw Hero
    ctx.fillStyle = 'blue';
    ctx.fillRect(Hero.x - config.HERO_RADIUS, Hero.y - config.HERO_RADIUS, 2 * config.HERO_RADIUS, 2 * config.HERO_RADIUS);

    //Verify if game is over
    for (let i = 0; i < Enemies.length; i++) {
        if (
            Math.abs(Enemies[i].x - Hero.x) <= config.HERO_RADIUS + config.ENEMY_RADIUS &&
            Math.abs(Enemies[i].y - Hero.y) <= config.HERO_RADIUS + config.ENEMY_RADIUS) {
            reset();
        }
    }

    //Move Enemies
    for (let i = 0; i < Enemies.length; i++) {
        Enemies[i].x += Enemies[i].speedX;
        Enemies[i].y += Enemies[i].speedY;
        if (Enemies[i].x >= config.WIDTH || Enemies[i].x <= config.ENEMY_RADIUS) {
            Enemies[i].speedX = - Enemies[i].speedX * 0.9;
        }
        if (Enemies[i].y >= config.HEIGHT || Enemies[i].y <= config.ENEMY_RADIUS) {
            Enemies[i].speedY = - Enemies[i].speedY * 0.9;
        }
    }

    //Move Hero
    if (Hero.goingLeft && Hero.x >= config.HERO_RADIUS) { Hero.x -= 5 };
    if (Hero.goingUp && Hero.y >= config.HERO_RADIUS) { Hero.y -= 5 };
    if (Hero.goingRight && Hero.x <= config.WIDTH - config.HERO_RADIUS) { Hero.x += 5 };
    if (Hero.goingDown && Hero.y <= config.HEIGHT - config.HERO_RADIUS) { Hero.y += 5 };

    //Increment counter and add new enemy if necessary
    counter++;
    if (counter % 10 === 0) {
        Enemies.push(Enemy.createRandom());
        score++;
        scoreElement.innerHTML = score;
    }

    //Loop again
    window.requestAnimationFrame(loop);
}

export function main() {
    loadCanvas();
    reset();
    document.addEventListener('keydown', Hero.handleKeyDown);
    document.addEventListener('keyup', Hero.handleKeyUp);
    loop();
}