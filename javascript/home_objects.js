import config from './config.js'

export var Hero = {
    x: config.WIDTH / 2,
    y: config.HEIGHT / 2,
    goingLeft: false,
    goingUp: false,
    goingRight: false,
    goingDown: false,
    handleKeyDown(event) {
        switch (event.keyCode) {
            case 37:
                Hero.goingLeft = true;
                event.preventDefault();
                break;
            case 38:
                Hero.goingUp = true;
                event.preventDefault();
                break;
            case 39:
                Hero.goingRight = true;
                event.preventDefault();
                break;
            case 40:
                Hero.goingDown = true;
                event.preventDefault();
                break;
        }
    },
    handleKeyUp(event) {
        switch (event.keyCode) {
            case 37:
                Hero.goingLeft = false;
                break;
            case 38:
                Hero.goingUp = false;
                break;
            case 39:
                Hero.goingRight = false;
                break;
            case 40:
                Hero.goingDown = false;
                break;
        }
    },
    reset() {
        Hero.x = config.WIDTH/2;
        Hero.y = config.HEIGHT/2;
        Hero.goingLeft = false;
        Hero.goingUp = false;
        Hero.goingRight = false;
        Hero.goingDown = false;
    }
};

export function Enemy(x, y, speedX, speedY) {
    this.x = x;
    this.y = y
    this.speedX = speedX;
    this.speedY = speedY;
}

Enemy.createRandom = () => {
    return new Enemy(
        Math.floor((config.WIDTH - 2 * config.ENEMY_RADIUS) * Math.random() + config.ENEMY_RADIUS),
        Math.floor((config.HEIGHT - 2 * config.ENEMY_RADIUS) * Math.random() + config.ENEMY_RADIUS),
        Math.random() * 5,
        Math.random() * 5
    )
};