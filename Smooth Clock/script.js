const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var animation;
var seconds, minutes, hours;
var frames;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animate() {
    animation = requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    hours.update();
    minutes.update();
    seconds.update();
}

function initialize() {
    resize();
    seconds = new Clock(canvas.width / 2, canvas.height / 2, 200, '#F3B405', 1);
    minutes = new Clock(canvas.width / 2, canvas.height / 2, 175, '#F37207', 2);
    hours = new Clock(canvas.width / 2, canvas.height / 2, 150, '#F24303', 3);
    frames = 0;
    cancelAnimationFrame(animation);
    animate();
}

addEventListener('resize', () => initialize());

initialize();