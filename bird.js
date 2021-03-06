const playerSprite = new Image();
playerSprite.src = "./media/spritesheet.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.width = 71;
    this.height = 40;
    this.weight = 0.9;
    this.frameX = 0;
    this.frameY = 0;
  }
  update() {
    let curve = Math.sin(angle) * 5;
    if (this.y > canvas.height - this.height + curve) {
      this.y = canvas.height - this.height + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }
    if (spacePressed && this.y > this.height) this.flap();
    this.handlePlayerFrame();
  }

  draw() {
    drawSprite(
      playerSprite,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x - 8,
      this.y - 5,
      this.width * 1.25,
      this.height * 1.25
    );
  }

  flap() {
    this.vy -= 2;
  }

  handlePlayerFrame() {
    if (this.frameX >= 10) {
      this.frameX = 0;
    } else if (frame % 2 === 0) {
      this.frameX++;
    }
  }
}

const bird = new Bird();
