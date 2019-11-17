'use strict';

var config = require('./fourthGameConfig.js');

var Snake, Apple;

var canvas, ctx, scoreElem;

var fpsInterval, then, now, elapsed;

var score;

var Position = function (x, y) {
    this.pixelX = x;
    this.pixelY = y;
    this.absoluteX = config.PIXEL_WIDTH * x;
    this.absoluteY = config.PIXEL_HEIGHT * y;
}

function loadCanvas() {
    canvas = document.getElementById('fourthCanvas');
    ctx = canvas.getContext('2d');
    canvas.height = config.HEIGHT;
    canvas.width = config.WIDTH;
    scoreElem = document.getElementById('score');
}

function getRandomPosition() {
    let i = new Position(Math.floor(Math.random() * config.PIXEL_TOTAL_WIDTH), Math.floor(Math.random() * config.PIXEL_TOTAL_HEIGHT));
    console.log(i);
    return i;
}

function reset() {
    Snake = {};
    Snake.direction = 'right';
    Snake.positions = [
        new Position(2, Math.floor(config.PIXEL_TOTAL_HEIGHT / 2)),
        new Position(1, Math.floor(config.PIXEL_TOTAL_HEIGHT / 2)),
        new Position(0, Math.floor(config.PIXEL_TOTAL_HEIGHT / 2))
    ];
    Apple = getRandomPosition();
    score = 0;
}

function bindKeys() {
    document.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
            case 37:
                if (Snake.direction !== 'right') {
                    Snake.direction = 'left'
                }
                event.preventDefault();
                break;
            case 38:
                if (Snake.direction !== 'down') {
                    Snake.direction = 'top'
                }
                event.preventDefault();
                break;
            case 39:
                if (Snake.direction !== 'left') {
                    Snake.direction = 'right'
                }
                event.preventDefault();
                break;
            case 40:
                if (Snake.direction !== 'top') {
                    Snake.direction = 'down'
                }
                event.preventDefault();
                break;
        }
    })
}

function startAnimation() {
    fpsInterval = 1000 / config.FPS;
    then = Date.now();
    loop();
}

function loop() {

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {

        then = now - (elapsed % fpsInterval);

        //Erase past frames
        ctx.fillStyle = 'rgba(0,0,0,25)';
        ctx.fillRect(0, 0, config.WIDTH, config.HEIGHT);

        //Move Snake
        for (let i = Snake.positions.length - 1; i > 0; i--) {
            Snake.positions[i].pixelX = Snake.positions[i - 1].pixelX
            Snake.positions[i].absoluteX = Snake.positions[i - 1].absoluteX
            Snake.positions[i].pixelY = Snake.positions[i - 1].pixelY
            Snake.positions[i].absoluteY = Snake.positions[i - 1].absoluteY
        }

        switch (Snake.direction) {
            case 'left':
                Snake.positions[0].pixelX -= 1;
                Snake.positions[0].absoluteX -= 20;
                break;
            case 'top':
                Snake.positions[0].pixelY -= 1;
                Snake.positions[0].absoluteY -= 20;
                break;
            case 'right':
                Snake.positions[0].pixelX += 1;
                Snake.positions[0].absoluteX += 20;
                break;
            case 'down':
                Snake.positions[0].pixelY += 1;
                Snake.positions[0].absoluteY += 20;
                break;
        }

        if (Snake.positions[0].pixelX === -1) {
            Snake.positions[0].pixelX = config.PIXEL_TOTAL_WIDTH - 1;
            Snake.positions[0].absoluteX = config.WIDTH - config.PIXEL_WIDTH;
        }
        if (Snake.positions[0].pixelY === -1) {
            Snake.positions[0].pixelY = config.PIXEL_TOTAL_HEIGHT - 1;
            Snake.positions[0].absoluteY = config.HEIGHT - config.PIXEL_HEIGHT;
        }
        if (Snake.positions[0].pixelX === config.PIXEL_TOTAL_WIDTH) {
            Snake.positions[0].pixelX = 0;
            Snake.positions[0].absoluteX = 0;
        }
        if (Snake.positions[0].pixelY === config.PIXEL_TOTAL_HEIGHT) {
            Snake.positions[0].pixelY = 0;
            Snake.positions[0].absoluteY = 0;
        }


        //Draw Apple
        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.fillRect(Apple.absoluteX, Apple.absoluteY, config.PIXEL_WIDTH - 1, config.PIXEL_HEIGHT - 1);

        //Draw Snake
        ctx.fillStyle = 'rgb(255,0,0)';
        for (let i = 0; i < Snake.positions.length; i++) {
            ctx.fillRect(Snake.positions[i].absoluteX, Snake.positions[i].absoluteY, config.PIXEL_WIDTH - 1, config.PIXEL_HEIGHT - 1);
        }

        //Determine if you are dead
        for (let i = 1; i < Snake.positions.length; i++) {
            if (Snake.positions[i].pixelX === Snake.positions[0].pixelX && Snake.positions[i].pixelY === Snake.positions[0].pixelY) {
                alert('You loose! Ha!');
                reset();
            }
        }

        //Determine if apple was eaten
        if (Apple.pixelX === Snake.positions[0].pixelX && Apple.pixelY === Snake.positions[0].pixelY) {
            score++;
            scoreElem.innerText = score;
            Apple = getRandomPosition();
            Snake.positions.push(new Position(0, 0));
        }
    }

    window.requestAnimationFrame(loop);
}

function main() {
    console.log('fourthGame.main loaded');
    loadCanvas();
    reset();
    bindKeys();
    startAnimation();
}

module.exports = {
    main: main
}