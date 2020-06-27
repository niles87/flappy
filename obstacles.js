const obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.width = 20;
    this.color = `hsl(${hue},100%,50%)`;
    this.counted = false;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  update() {
    this.x -= gameSpeed;
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }
}

function handleObstacles() {
  // 75
  if (frame % 90 === 0) {
    obstaclesArray.unshift(new Obstacle());
  }
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  if (obstaclesArray.length > 15) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}
