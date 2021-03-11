class Circle {
    constructor(x, y, color, distance, radius, sx = 0, sy = 0) {
        this.x = x;
        this.y = y;
        // this.velocity = { x: (Math.random() + 0.5) * 2, y: (Math.random() + 0.5) * 2 };
        this.velocity = { x: sx + (Math.random() - 0.5) * 0, y: sy + (Math.random() - 0.5) * 0 };
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
        this.strenght = 1;
        this.lastMouse = { x: black.x, y: black.y };

        this.border = function () {
            if (this.x + radius > canvas.width || this.x - radius < 0)
                this.velocity.x = - this.velocity.x;
            if (this.y + radius > canvas.height || this.y - radius < 0)
                this.velocity.y = - this.velocity.y;
        }

        this.ball = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }

        this.draw = function () {
            // this.update();
            this.ball();
            this.drawLine();
            // if (circleArray.length > 1)
            this.move();
            this.border();
        };

        this.drawLine = function () {
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

        this.constraint = function (max = 5, min = -5) {
            if (this.velocity.x > max)
                this.velocity.x = max;
            if (this.velocity.y > max)
                this.velocity.y = max;
            if (this.velocity.x < min)
                this.velocity.x = min;
            if (this.velocity.y < min)
                this.velocity.y = min;
        }

        this.move = function () {
            if (circleArray.length > 1) {
                for (var a = 0; a < circleArray.length; a++) {
                    this.distance = (circleArray[a].x - this.x) * (circleArray[a].x - this.x) + (circleArray[a].y - this.y) * (circleArray[a].y - this.y);
                    this.direction = Math.atan2(circleArray[a].y - this.y, circleArray[a].x - this.x);
                    // this.distance = Math.sqrt(this.distance);
                    if (this.distance) {
                        this.strenght = G / (this.distance * this.speed);
                        if (this.distance < record)
                            record = this.distance;
                        // console.log((this.distance));
                        if (this.distance < radius * radius  && circleArray.length > 1) {
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
                this.acc.x /= (circleArray.length + 0);
                this.acc.y /= (circleArray.length + 0);
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
        }

        this.rotate = function () {
            this.lastMouse.x += (mouse.x - this.lastMouse.x) * moveSpeed;
            this.lastMouse.y += (mouse.y - this.lastMouse.y) * moveSpeed;
            this.radians += this.velocity;
            this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance;
            this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;
        };

        this.update = function () {
            // console.log(this.distance);
            // console.log(this.velocity);
            // this.distance -= 0.125;
        }
    }
}