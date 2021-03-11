class Clock {
    constructor(x, y, distance, color, index) {

        // Global Variables
        this.color = color;
        this.index = index;
        this.centerX = x;
        this.centerY = y;
        this.smooth = 0;
        this.radius = 10;
        this.distance = distance;
        this.seconds = - Math.PI / 2;
        this.x = this.centerX + Math.cos(this.seconds) * this.distance;
        this.y = this.centerY + Math.sin(this.seconds) * this.distance;

        // Functions

        this.update = function () {
            this.draw();
            this.line();
            if (frames++ > 30) {
                this.rotate();
                if (this.smooth < 0.025)
                    this.smooth += 0.0005 / this.index;
            }
            this.follow();
            this.hour12();
            if (this.index == 1)
                this.center();
        }

        this.center = function () {
            c.beginPath();
            c.fillStyle = this.color;
            c.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
            c.fill();
            c.closePath();
        }

        this.line = function () {
            c.beginPath();
            c.lineWidth = 3;
            c.strokeStyle = this.color;
            c.moveTo(this.centerX, this.centerY);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath();
        }

        this.hour12 = function () {
            c.beginPath();
            c.fillStyle = this.color;
            c.arc(this.centerX, this.centerY + Math.sin(-Math.PI / 2) * this.distance, this.radius, 0, Math.PI * 2);
            c.fill();
            c.closePath();
        }

        this.follow = function () {
            c.beginPath();
            c.strokeStyle = this.color;
            c.lineWidth = 10;
            c.arc(this.centerX, this.centerY, this.distance, -Math.PI / 2, this.seconds);
            c.stroke();
            c.closePath();
        }

        this.rotate = function () {
            this.seconds += (this.getAngle() - this.seconds) * this.smooth;
            this.x = this.centerX + Math.cos(this.seconds) * this.distance;
            this.y = this.centerY + Math.sin(this.seconds) * this.distance;
        }

        this.getAngle = function () {
            let angle;
            switch (this.index) {
                case 1: {
                    let seconds = new Date().getSeconds();
                    seconds = seconds * Math.PI / 30 - Math.PI / 2;
                    angle = seconds;
                    break;
                }
                case 2: {
                    let minutes = new Date().getMinutes();
                    minutes = minutes * Math.PI / 30 - Math.PI / 2;
                    angle = minutes;
                    break;
                }
                case 3: {
                    let hours = new Date().getHours();
                    hours = hours * Math.PI / 12 - Math.PI / 2;
                    angle = hours;
                    break;
                }
            }
            return angle;
        }

        this.draw = function () {
            c.beginPath();
            c.fillStyle = this.color;
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            c.fill();
            c.closePath();
        }

        console.log('Clock Created');
    }
}