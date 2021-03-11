class Circle {
    constructor(x, y, color, distance, radius, sx = 0, sy = 0) {
        this.x = x;
        this.y = y;
        // this.velocity = { x: (Math.random() + 0.5) * 2, y: (Math.random() + 0.5) * 2 };
        this.velocity = { x: sx + (Math.random() - 0.5), y: sy + (Math.random() - 0.5) };
        this.acc = { x: 0, y: 0 };
        this.distance = distance;
        this.color = colorArray[Math.floor(Math.random() * 4.99)];
        //'rgba(200, 200, 200, 0.05)'; // 
        this.radius = 5; // radius;
        this.radians = Math.random() * Math.PI * 2;
        this.lastPosX;
        this.speed = 1 / 50;
        this.lastPosY;
        this.lastMouse = { x: black.x, y: black.y };

        this.ball = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }

        this.draw = function () {
            this.update();
            this.ball();
            this.drawLine();
            this.move();
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
            this.direction = Math.atan2(black.y - this.y, black.x - this.x);
            this.distance = (black.x - this.x) * (black.x - this.x) + (black.y - this.y) * (black.y - this.y);
            this.strenght = G / (this.distance * this.speed);
            this.acc.x = Math.cos(this.direction) * this.strenght * black.mass;
            this.acc.y = Math.sin(this.direction) * this.strenght * black.mass;
            this.velocity.x += this.acc.x;
            this.velocity.y += this.acc.y;
            this.velocity.x *= 0.9995;
            this.velocity.y *= 0.9995;
            //console.log(this.strenght);
            // this.constraint(5, -5);
            this.x += this.velocity.x;
            this.y += this.velocity.y;
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