const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/* --- Declarations --- */ {

    var circleArray = [],
        G = 6.67,
        number = 0,
        maxSpeed = 0,
        record = 1000,
        mousePos = [],
        sp = 10,
        framecount = 0,
        x = window.innerWidth,
        y = window.innerHeight,
        moveSpeed = 2,
        index = 0,
        balls = 3;
    mousedown = false,
        colorArrays = [],
        mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        },
        speed = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        },
        lastMouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        },
        black = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            mass: 1,
            size: 5
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
        // makePlanets(10, mouse.x, mouse.y);
    });
    addEventListener('mouseup', () => { mousedown = false; });
    addEventListener('resize', () => location.reload());
    addEventListener('mousemove', event => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
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

function makePlanets(k, X, Y) {
    for (i = 0; i < k; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = 2;
        let radius = 7;
        if (k == 1) {
            let distance = Math.random() * (canvas.height / 4) + canvas.height / 8;
            circleArray.push(new Circle(X, Y, color, distance, radius, speed.x, speed.y));
        } else {
            let distance = Math.random() * (canvas.height / 4) + canvas.height / 8;
            circleArray.push(new Circle(x, y, color, distance, radius, (Math.random() - 0.5) * sp, (Math.random() - 0.5) * sp));
        }
    }
}

function init() {
    resize();
    circleArray = [];
    // for (i = 0; i < Math.floor(canvas.height / 8); i++) {
    makePlanets(balls + 1);
    animate();
}

function blackHole() {
    c.beginPath();
    c.fillStyle = "black";
    c.strokeStyle = "black";
    c.arc(black.x, black.y, black.size, 0, Math.PI * 2, true);
    c.fill();
    c.closePath();
}

function mouseSpeed() {
    speed.x = mouse.x - lastMouse.x;
    speed.y = (mouse.y - lastMouse.y);
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
    realSpeed = Math.sqrt(speed.x * speed.x + speed.y * speed.y);
}

function blackHolePos() {
    black.x = black.y = 0;
    for (i = 0; i < circleArray.length; i++) {
        // circleArray[i].draw();
        /*
        if (circleArray[i].distance < 25 * black.size) {
            circleArray.pop(i);
            black.mass += 0.125;
        }
        */
        // console.log(circleArray[i].distance);
        black.x += circleArray[i].x;
        black.y += circleArray[i].y;
    }
    black.x /= circleArray.length;
    black.y /= circleArray.length;
    // console.log(black);
}

function animate() {
    requestAnimationFrame(animate);
    for (var j = 0; j < 1; j++) {
        c.fillStyle = 'rgba(300, 300, 300, 1)';
        // c.fillStyle = 'rgba(0, 0, 0, 0.2)';
        //if (framecount % 1000 == 0) {
        c.fillRect(0, 0, canvas.width, canvas.height);
        // blackHole();
        //blackHolePos();
        for (i = 0; i < circleArray.length; i++) {
            circleArray[i].draw();
            /*
            if (circleArray[i].distance < 25 * black.size) {
                circleArray.pop(i);
                black.mass += 0.125;
            }
            */
            // console.log(circleArray[i].distance);
        }
        framecount++;
        mouseSpeed();
        c.font = "30px Arial";
        c.fillStyle = "black";
        c.fillText(Math.floor(number / 100), canvas.width / 2, canvas.height / 2);
        if (mousedown) {
            if (speed.y > maxSpeed)
                maxSpeed = speed.y;
            if (speed.y < 0)
                number += speed.y * speed.y;
            else
                number -= speed.y * speed.y;
        }
        console.log(speed.y);
        // console.log(record);
        // if (mousedown)
        //     makePlanets(1, mouse.x, mouse.y);
        //if (mousedown)
        // makePlanets(1, mouse.x, mouse.y);
        // if (framecount % 200 == 0 && framecount < 1000)
        //     makePlanets();
        // console.log(framecount);
        /*
        if (clear) {
            if (framecount) {
                clear = false;
                c.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        */

        //console.log(mousePos);
        //mousePos.push(mouse);
        /*
        if (mouseIdle())
            canvas.style.cursor = 'none';
        else
            canvas.style.cursor = 'pointer';
        */
    }
}

init();