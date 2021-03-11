class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.draw = function() {
      c.beginPath();
      c.rect(this.x, this.y, this.w, this.h);
      // c.strokeStyle = 'black';
      // c.lineWidth = 1;
      c.fillStyle = "black";
      c.fill();
      //c.stroke();
      c.closePath();
    };

    this.hit = function(x, y) {
      if (
        this.x < x &&
        this.y < y &&
        this.x + this.w > x &&
        this.y + this.h > y
      )
        return true;
      return false;
    };
  }
}
