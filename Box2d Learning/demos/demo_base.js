function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-5000, -5000);
	worldAABB.maxVertex.Set(5000, 5000);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	var world = new b2World(worldAABB, gravity, doSleep);
	createGround(world);
	createPlatform(world);
	createBox(world, 0, 0, 5, window.innerHeight);
	createBox(world, window.innerWidth, 0, 5, window.innerHeight);
	return world;
}

function createPlatform(world) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(30, 10);
	groundSd.restitution = 0.2;
	var category = 0x0001;
	groundSd.categoryBits = category;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(window.innerWidth - 40, window.innerHeight / 2);
	return world.CreateBody(groundBd);
}

function createGround(world) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(window.innerWidth, 5);
	groundSd.restitution = 0;
	var category = 0x0001;
	groundSd.categoryBits = category;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(window.innerWidth / 2, window.innerHeight);
	return world.CreateBody(groundBd)
}

function createBall(world, x, y) {
	var ballSd = new b2CircleDef();
	ballSd.density = 1.0;
	ballSd.radius = 20;
	ballSd.restitution = 1.0;
	ballSd.friction = 0;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x, y);
	return world.CreateBody(ballBd);
}

function createBox(world, x, y, width, height, fixed, goalx = 0, goaly = 0, atime = 1.5, aangle = -2) {
	if (typeof (fixed) == 'undefined') fixed = true;
	var boxSd = new b2BoxDef();
	if (!fixed) boxSd.density = 2.0;
	boxSd.restitution = 0;
	if (fixed)
		boxSd.categoryBits = 0x0001;
	else {
		boxSd.categoryBits = 0x0002;
		boxSd.maskBits = 0x0001;
	}
	boxSd.friction = 0.5;
	boxSd.extents.Set(width, height);
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x, y);
	var gx, gy, t, add = world.m_gravity.y;
	if (goalx && goaly) {
		var dx = goalx - x;
		var dy = goaly - y;
		gy = dy - add;
		t = gy / -add;
		gx = dx / t / atime;
		boxBd.linearVelocity = new b2Vec2(gx, gy);
		boxBd.angularVelocity = aangle / t;
	}
	else {
		boxBd.linearVelocity = new b2Vec2(50, -600);
		boxBd.angularVelocity = -8.4;
	}
	return world.CreateBody(boxBd);
}

var demos = {};
demos.InitWorlds = [];
