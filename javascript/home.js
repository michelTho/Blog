var Bowl = {
    y: 300,
    speedY: 0,
};

function loadCanvas() {
    let canvas = document.getElementById('firstCanvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,50,50);
}

export function begin(){
    loadCanvas();
}