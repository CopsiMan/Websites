class Circle {
  static CircleIndex = 0;
  constructor(x, y, index, color, distance = 0, radius = 5, sx = 0, sy = 0) {
    this.index = index;
    this.x = x;
    this.y = y;
    // this.velocity = { x: (Math.random() + 0.5) * 2, y: (Math.random() + 0.5) * 2 };
    this.velocity = {
      x: sx + (Math.random() - 0.5) * 0,
      y: sy + (Math.random() - 0.5) * 0
    };
    this.acc = { x: 0, y: 0 };
    this.distance = distance;
    this.color = colorArray[Math.floor(Math.random() * 4.99)];
    //'rgba(200, 200, 200, 0.05)'; //
    this.radius = 5; // radius;
    this.radians = Math.random() * Math.PI * 2;
    this.lastPosX;
    this.index = index++;
    this.speed = 1 / 1000;
    this.lastPosY;
    this.first = true;
    this.step = 0;
    this.strenght = 1;
    this.dieded = false;
    this.direction = -Math.PI / 2;
    this.directionArray = [];
    this.lastMouse = { x: black.x, y: black.y };

    this.border = function() {
      if (
        this.x + radius > canvas.width ||
        this.x - radius < 0 ||
        this.y + radius > canvas.height ||
        this.y - radius < 0
      ) {
        this.dieded = true;
        //deadCount++;
      }
    };

    this.resetPos = function() {
      this.x = canvas.width / 2;
      this.y = canvas.height - 10;
      this.step = 0;
      this.dieded = false;
      this.first = false;
      this.direction = -Math.PI / 2;
    };

    this.distanceToGoal = function() {
      return Math.sqrt(
        (this.x - goal.x) * (this.x - goal.x) +
          (this.y - goal.y) * (this.y - goal.y)
      );
    };

    this.ball = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    };

    this.draw = function() {
      // this.update();
      this.ball();
      //this.drawLine();
      // if (circleArray.length > 1)
      //this.border();
    };

    this.drawLine = function() {
      c.beginPath();
      c.strokeStyle = this.color;
      c.lineWidth = this.radius / 2;
      // c.moveTo(this.lastPosX, this.lastPosY);
      c.moveTo(this.lastPosX, this.lastPosY);
      c.lineTo(this.x, this.y);
      this.lastPosX = this.x;
      this.lastPosY = this.y;
      c.stroke();
      c.closePath();
    };

    this.constraint = function(max = 5, min = -5) {
      if (this.velocity.x > max) this.velocity.x = max;
      if (this.velocity.y > max) this.velocity.y = max;
      if (this.velocity.x < min) this.velocity.x = min;
      if (this.velocity.y < min) this.velocity.y = min;
    };

    this.move1 = function() {
      if (circleArray.length > 1) {
        for (var a = 0; a < circleArray.length; a++) {
          this.distance =
            (circleArray[a].x - this.x) * (circleArray[a].x - this.x) +
            (circleArray[a].y - this.y) * (circleArray[a].y - this.y);
          this.direction = Math.atan2(
            circleArray[a].y - this.y,
            circleArray[a].x - this.x
          );
          // this.distance = Math.sqrt(this.distance);
          if (this.distance) {
            this.strenght = G / (this.distance * this.speed);
            if (this.distance < record) record = this.distance;
            // console.log((this.distance));
            if (this.distance < radius * radius && circleArray.length > 1) {
              //circleArray.splice(a, 1);
              // delete circleArray[a];
              // console.log(a);
              console.log(circleArray);
            }
            this.acc.x += Math.cos(this.direction) * this.strenght * black.mass;
            this.acc.y += Math.sin(this.direction) * this.strenght * black.mass;
          }
        }
        // console.log(this.x);
        //if (circleArray.length > 2){
        this.acc.x /= circleArray.length + 0;
        this.acc.y /= circleArray.length + 0;
        //}
        this.velocity.x += this.acc.x;
        this.velocity.y += this.acc.y;
        //console.log(this.strenght);
        // this.constraint(15, -15);
      }
      var k = 0.9995;
      // if (circleArray.length > 2)
      //     k = 0.999;
      // else k = 0.82;
      this.velocity.x *= k;
      this.velocity.y *= k;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      //console.log(circleArray[0]);
    };

    this.rotate = function() {
      this.lastMouse.x += (mouse.x - this.lastMouse.x) * moveSpeed;
      this.lastMouse.y += (mouse.y - this.lastMouse.y) * moveSpeed;
      this.radians += this.velocity;
      this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance;
      this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;
    };

    this.move = function() {
      this.x += Math.cos(this.direction) * speed1;
      this.y += Math.sin(this.direction) * speed1;
    };

    this.updateDirection = function() {
      x = (Math.random() - 0.5) / 2;
      this.direction += x;
      this.directionArray.push(x);
    };

    this.animate = function() {
      this.draw();
      if (this.dieded == false) {
        if (this.distanceToGoal() < this.radius * 2) {
          this.dieded = true;
          deadCount = circleArray.length;
  
          if (this.step < MinimumStep) {
            useThisOne = this.index;
            MinimumStep = this.step;
          }
        }
        this.move();
        this.border();
        for (
          var nefolosit1 = 0;
          nefolosit1 < obstacleArray.length && !this.dieded;
          nefolosit1++
        ) {
          // console.log(obstacleArray.length);
          this.dieded = obstacleArray[nefolosit1].hit(this.x, this.y);
        }
        //if (this.dieded) deadCount++;
        // if (this.distanceToGoal() < 5 && !this.first){
        //   reachedTheGoal = true;
        //   BestIndex = this.index;
        // }
      }
      if (this.first == true) this.updateDirection();
      else {
        this.direction += this.directionArray[this.step++];
      }
      //console.log("aparent merge");
      // console.log(this.velocity);
      // this.distance -= 0.125;
    };
  }
}
