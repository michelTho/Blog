var Bowl = {
    y: 300,
    speedY: 0,
};
var canvas;
var ctx;


function loadCanvas() {
    canvas.height = 600;
    canvas.width = 800;
}


function loop() {
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 0, 800, 600);
    ctx.fillStyle = 'red'
    ctx.fillRect(380, Bowl.y-20, 40, 40);
    Bowl.speedY += 1;
    Bowl.y += Bowl.speedY;
    if (Bowl.y >= 600) {
        Bowl.speedY = -Bowl.speedY;
    }
    window.requestAnimationFrame(loop);
}


export function main(){
    canvas = document.getElementById('firstCanvas');
    ctx = canvas.getContext('2d');
    loadCanvas();
    loop();
}