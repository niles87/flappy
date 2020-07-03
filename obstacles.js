const obstaclesArray = [];

const topRock = new Image();
topRock.src = "./media/top.png";
const bottomRock = new Image();
bottomRock.src = "./media/bottom.png";

function drawObstacle(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.originalWidth = 144;
    this.originalHeight = 324;
    this.width = this.originalWidth / 4;
    this.counted = false;
  }

  draw() {
    drawObstacle(
      topRock,
      0,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x,
      0,
      this.width,
      this.top
    );
    drawObstacle(
      bottomRock,
      0,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x,
      canvas.height - this.bottom,
      this.width,
      this.bottom
    );
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
