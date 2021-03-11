class Circle {
    constructor(x, y, color, distance, radius, sx = 0, sy = 0) {
        this.x = x;
        this.y = y;
        // this.velocity = { x: (Math.random() + 0.5) * 2, y: (Math.random() + 0.5) * 2 };
        this.velocity = { x: sx + (Math.random() - 0.5) * 0, y: sy + (Math.random() - 0.5) * 0 };
        this.acc = { x: 0, y: 0 };
        this.distance = distance;
        this.color = "black";// colorArray[Math.floor(Math.random() * 4.99)];
        //'rgba(200, 200, 200, 0.05)'; // 
        this.radius = 10; // radius;
        this.radians = Math.random() * Math.PI * 2;
        this.lastPosX;
        this.index = index++;
        this.speed = 1 / 1000;
        this.lastPosY;
        this.distances = {
            d: undefined,
            i: undefined
        };
        this.distList = [{
            d: undefined,
            i: undefined
        }];
        this.closest = {
            d: 100000,
            i: 0
        };
        this.strenght = 1;
        this.lastMouse = { x: black.x, y: black.y };

        this.border = function () {
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
                this.velocity.x = - this.velocity.x;
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
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

        this.compare = function (a, b) {
            if (a.d < b.d)
                return true;
            return false;
        }

        this.drawLine = function () {
            // c.moveTo(this.lastPosX, this.lastPosY);
            // c.moveTo(this.lastPosX, this.lastPosY);
            this.closest.d = 10000;
            this.distList = [];
            for (var l = 0; l < circleArray.length; l++) {
                this.distance = Math.sqrt((circleArray[l].x - this.x) * (circleArray[l].x - this.x) + (circleArray[l].y - this.y) * (circleArray[l].y - this.y));
                this.distances.d = this.distance;
                this.distances.i = l;
                this.distList.push({ d: this.distance, i: l });
            }
            for (var p = 0; p < this.distList.length - 1; p++) {
                for (var q = p + 1; q < this.distList.length; q++) {
                    if (this.distList[p].d > this.distList[q].d) {
                        var k = this.distList[p];
                        this.distList[p] = this.distList[q];
                        this.distList[q] = k;
                    }
                }
            }
            // console.log(this.distList);
            var k;
            if (4 > circleArray.length)
                k = circleArray.length;
            else
                k = 4;
            // for (var l = 1; l < 3; l++) {
                //console.log(circleArray[this.distList[1].i].x);
                c.beginPath();
                c.strokeStyle = this.color;
                c.fillStyle = 'rgba(10, 10, 100, 0.1)';
                c.moveTo(this.x, this.y);
                c.lineTo(circleArray[this.distList[1].i].x, circleArray[this.distList[1].i].y);
                c.lineTo(circleArray[this.distList[2].i].x, circleArray[this.distList[2].i].y);
                // c.moveTo(this.x, this.y);
                // c.lineTo(circleArray[this.distList[2].i].x, circleArray[this.distList[2].i].y);
                // c.lineTo(circleArray[this.distList[3].i].x, circleArray[this.distList[3].i].y);
                //console.log(circleArray[this.distList[l].i].x);
                // c.lineWidth = 0.5; // 10 / this.distance;
                // c.stroke();
                c.fill();
                c.closePath();
            // }
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
            // if (circleArray.length > 1) {
            //     for (var a = 0; a < circleArray.length; a++) {
            //         this.distance = (circleArray[a].x - this.x) * (circleArray[a].x - this.x) + (circleArray[a].y - this.y) * (circleArray[a].y - this.y);
            //         this.direction = Math.atan2(circleArray[a].y - this.y, circleArray[a].x - this.x);
            //         // this.distance = Math.sqrt(this.distance);
            //         if (this.distance) {
            //             this.strenght = G / (this.distance * this.speed);
            //             if (this.distance < record)
            //                 record = this.distance;
            //             // console.log((this.distance));
            //             if (this.distance < radius * radius  && circleArray.length > 1) {
            //                 //circleArray.splice(a, 1);
            //                 // delete circleArray[a];
            //                 // console.log(a);
            //                 console.log(circleArray);
            //             }
            //             this.acc.x += Math.cos(this.direction) * this.strenght * black.mass;
            //             this.acc.y += Math.sin(this.direction) * this.strenght * black.mass;
            //         }
            //     }
            //     // console.log(this.x);
            //     //if (circleArray.length > 2){
            //     this.acc.x /= (circleArray.length + 0);
            //     this.acc.y /= (circleArray.length + 0);
            //     //}
            //     this.velocity.x += this.acc.x;
            //     this.velocity.y += this.acc.y;
            //     //console.log(this.strenght);
            //     // this.constraint(15, -15);
            // }
            // var k = 0.9995;
            // // if (circleArray.length > 2)
            // //     k = 0.999;
            // // else k = 0.82;
            // this.velocity.x *= k;
            // this.velocity.y *= k;
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