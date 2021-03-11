const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

/* --- Declarations --- */ {

    var circleArray = [],
        mousePos = [],
        framecount = 0,
        x = window.innerWidth,
        y = window.innerHeight,
        moveSpeed = 0.05,
        mousedown = false,
        colorArrays = [],
        mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        },
        clear = true;
}

/* --- Colors --- */ {
    var colorArray = [
        '#00261C',
        '#044C29',
        '#167F39',
        '#45BF55',
        '#96ED89'
    ];

    var colorArray1 = [
        '#2E112D',
        '#540032',
        '#820333',
        '#C9283E',
        '#F0433A'
    ];

    var colorArray2 = [
        '#2E0927',
        '#D90000',
        '#FF2D00',
        '#FF8C00',
        '#04756F'
    ];

    var colorArray3 = [
        '#002635',
        '#013440',
        '#AB1A25',
        '#D97925',
        '#EFE7BE'
    ];

    var colorArray4 = [
        '#1C1D21',
        '#31353D',
        '#445878',
        '#92CDCF',
        '#EEEFF7'
    ];

    var colorArray5 = [
        '#003B59',
        '#00996D',
        '#A5D900',
        '#F2E926',
        '#FF930E'
    ];

    colorArrays.push(colorArray);
    colorArrays.push(colorArray1);
    colorArrays.push(colorArray2);
    colorArrays.push(colorArray3);
    colorArrays.push(colorArray4);
    colorArrays.push(colorArray5);

    colorArray = colorArrays[Math.floor(Math.random() * colorArrays.length)];
}

/* --- Event Listeners --- */ {

    addEventListener('mousedown', () => {
        mousedown = true;
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        moveSpeed = 0.0005;
    });
    addEventListener('mouseup', () => { mousedown = false; });
    addEventListener('resize', () => location.reload());
    addEventListener('mousemove', event => {
        if (mousedown) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        }
    });
}

class Circle {
    constructor(x, y, color, distance, radius) {
        this.x = x;
        this.y = y;
        this.velocity = Math.random() * 0.005 + 0.025;
        this.distance = distance;
        this.color = colorArray[Math.floor(Math.random() * 4.99)];
        this.radius = radius;
        this.radians = Math.random() * Math.PI * 2;
        this.lastPosX;
        this.lastPosY;
        this.lastMouse = { x: mouse.x, y: mouse.y };

        this.drawLine = function () {
            c.beginPath();
            c.strokeStyle = this.color;
            c.lineWidth = this.radius * 2;
            c.moveTo(this.lastPosX, this.lastPosY);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath();
        };

        this.move = function () {
            this.lastMouse.x += (mouse.x - this.lastMouse.x) * moveSpeed;
            this.lastMouse.y += (mouse.y - this.lastMouse.y) * moveSpeed;
            this.radians += this.velocity;
            this.lastPosX = this.x;
            this.lastPosY = this.y;
            this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance;
            this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;
            this.drawLine();
        };

        this.draw = function () {
            this.move();
            c.beginPath();
            c.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        };
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function mouseIdle() {
    if (mousePos.length >= 100) {
        for (var i = 2; i <= 50; i++)
            if (mousePos[mousePos.length - 1] != mousePos[mousePos.length - i])
                return false;
        return true;
    }
    return false;
}

function init() {
    resize();
    circleArray = [];
    for (i = 0; i < Math.floor(canvas.height / 8); i++) {
        x = canvas.width / 2;
        y = canvas.height / 2;
        color = 2;
        radius = 5;
        distance = Math.random() * (canvas.height / 4) + canvas.height / 8;
        circleArray.push(new Circle(x, y, color, distance, radius));
    }
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
    }
    framecount++;
    /*
    if (clear) {
        if (framecount) {
            clear = false;
            c.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    */
    if (framecount == 2) {
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (moveSpeed <= 0.05)
        moveSpeed += 0.001;

    //console.log(mousePos);
    //mousePos.push(mouse);
    /*
    if (mouseIdle())
        canvas.style.cursor = 'none';
    else
        canvas.style.cursor = 'pointer';
    */
}

init();