var initId = 1;
var world = createWorld();
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;

function setupWorld(did) {
	if (!did) did = 0;
	world = createWorld();
	initId += did;
	initId %= demos.InitWorlds.length;
	if (initId < 0) initId = demos.InitWorlds.length + initId;
	demos.InitWorlds[initId](world);
}
function setupNextWorld() { setupWorld(0); }
function setupPrevWorld() { setupWorld(0); }
function step(cnt) {
	var stepping = false;
	var timeStep = 1.0 / 25;
	var iteration = 1;
	world.Step(timeStep, iteration);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawWorld(world, ctx);
	update();
	setTimeout('step(' + (cnt || 0) + ')', 10);
}
Event.observe(window, 'load', function () {
	setupWorld();
	ctx = $('canvas').getContext('2d');
	var canvasElm = $('canvas');
	canvasElm.width = window.innerWidth;
	canvasElm.height = window.innerHeight;
	canvasWidth = parseInt(canvasElm.width);
	canvasHeight = parseInt(canvasElm.height);
	canvasTop = parseInt(canvasElm.style.top);
	canvasLeft = parseInt(canvasElm.style.left);
	Event.observe('canvas', 'click', function (e) {
		//setupNextWorld();
		// if (Math.random() < 0.5) 
		// 	demos.top.createBall(world, Event.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop);
		// else 
		// createBox(world, Envet.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop, 15, 30, false);
	});
	Event.observe('canvas', 'contextmenu', function (e) {
		if (e.preventDefault) e.preventDefault();
		setupPrevWorld();
		return false;
	});
	step();
});
