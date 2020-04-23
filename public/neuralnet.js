// Adapted from codepen https://codepen.io/LeonGr/pen/yginI

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let stars = [], // Array that contains the stars
    lineColor = 'grey',
    starColor = 'grey',
    starTetherMax = 200,
    FPS = 60, // Frames per second
    starCount = (width * height) / 10000, // Number of stars
    mouse = {
        x: 0,
        y: 0
    };  // mouse location

// Push stars to array

for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
    });
}

// Draw the scene

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "lighter";

    for (let i = 0, x = stars.length; i < x; i++) {
        let s = stars[i];

        ctx.fillStyle = starColor;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    ctx.beginPath();
    for (let i = 0, x = stars.length; i < x; i++) {
        let starI = stars[i];
        ctx.moveTo(starI.x,starI.y);
        if(distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
        for (let j = 0, x = stars.length; j < x; j++) {
            let starII = stars[j];
            if(distance(starI, starII) < starTetherMax) {
                ctx.lineTo(starII.x,starII.y);
            }
        }
    }
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = lineColor;
    ctx.stroke();
}

function distance( point1, point2 ){
    let xs = 0;
    let ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt( xs + ys );
}

// Update star locations

function update() {
    for (let i = 0, x = stars.length; i < x; i++) {
        let s = stars[i];

        s.x += s.vx / FPS;
        s.y += s.vy / FPS;

        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
    }
}

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Update and draw

function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}

tick();