const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const newCanvasWidth = canvas.clientWidth;
const newCanvasHeight = canvas.clientHeight;

const restart = document.getElementById("reset");

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");

const background = new Image();
background.src = "./media/BG.png";

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function handleBackground() {
  if (BG.x1 <= -BG.width + (gameSpeed + 1)) BG.x1 = BG.width;
  else BG.x1 -= gameSpeed - 1;
  if (BG.x2 <= -BG.width + (gameSpeed + 1)) BG.x2 = BG.width;
  else BG.x2 -= gameSpeed - 1;
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleObstacles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
  handleCollisions();
  if (handleCollisions()) return;
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}

const audio = new Audio("./media/Loop-Menu.wav");
audio.loop = true;

function init() {
  audio.play();
  animate();
}

window.addEventListener("load", function () {
  setTimeout(init, 2000);
});

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
});

window.addEventListener("touchstart", function (e) {
  e.preventDefault();
  spacePressed = true;
});
window.addEventListener("touchend", function (e) {
  spacePressed = false;
});

restart.addEventListener("click", function () {
  window.location.reload();
});

function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width - 20 > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y + bird.height > canvas.height - obstaclesArray[i].bottom && bird.y < canvas.height))
    ) {
      ctx.font = "25px Georgia";
      ctx.fillStyle = "black";
      ctx.fillText(`Game over, your score is ${score}`, 160, canvas.height / 2);
      audio.pause();
      return true;
    }
  }
}
