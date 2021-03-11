const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const mouse = {
  x: undefined,
  y: undefined
};

let gravity = 0.5;

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener("resize", () => location.reload());
// canvas.width = innerWidth;
// canvas.height = innerHeight;
// init();
// });

// Objects
function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.slower = 0.99;
  this.mass = 1;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: (Math.random() - 0.5) * 50, // Random x value from -0.5 to 0.5
    y: Math.random() - 0.5 // Random y value from -0.5 to 0.5
  };
}

Circle.prototype.draw = function () {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.fill();
  c.closePath();
};

Object.prototype.distance = function (first, second) {
  // console.log("Collision");
  let distance = Math.sqrt(
    (first.x - second.x) * (first.x - second.x) +
    (first.y - second.y) * (first.y - second.y)
  );
  // console.log(distance);
  return distance;
};

Object.prototype.collisionDetection = function () {
  for (let i = 0; i < circles.length; i++) {
    if (this == circles[i]) continue;
    // console.log("Collision");
    if (this.distance(this, circles[i]) < this.radius + circles[i].radius) {
      // console.log(this.distance(this, circles[i]))
      resolveCollision(this, circles[i]);
    }
    // console.log("Collision");
    // continue;
  }
};

Object.prototype.update = function () {
  this.draw();

  this.x += this.velocity.x; // Move x coordinate
  this.y += this.velocity.y; // Move y coordinate
  this.velocity.y += gravity;
  this.velocity.x *= this.slower;
  this.velocity.y *= this.slower;

  this.border();
  this.collisionDetection();
};

Object.prototype.border = function () {
  if (this.x - this.radius < 0 || this.x + this.radius > canvas.width)
    this.velocity.x *= -1;
  if (this.y - this.radius < 0 || this.y + this.radius > canvas.height)
    this.velocity.y *= -1;
};

// Implementation
let circles = [];
function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < 200; i++) {
    const x = (Math.random() * canvas.width) / 1.1 + canvas.width / 20; // + 1.1 / canvas.width;
    const y = (Math.random() * canvas.height) / 1.1 + canvas.height / 20; //+ 1.1 / canvas.height;
    const radius = 10; // Math.random() * 5;
    const color = "blue";
    circles.push(new Circle(x, y, radius, color));
  }
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate); // Create an animation loop
  c.clearRect(0, 0, canvas.width, canvas.height); // Erase whole canvas
  circles.forEach(circle => {
    circle.update();
  });
}
init();
animate();

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x * particle.slower;
    particle.velocity.y = vFinal1.y * particle.slower;

    otherParticle.velocity.x = vFinal2.x * particle.slower;
    otherParticle.velocity.y = vFinal2.y * particle.slower;
  }
}
