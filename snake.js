const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

function resizeCanvas() {
  const gameContainer = document.querySelector(".game-container");
  const containerWidth = gameContainer.clientWidth;

  canvas.width = containerWidth;
  canvas.height = containerWidth; // Tetap persegi

  drawBackground();
  drawSnake();
  drawFood();
}

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);
canvas.width = 400;
canvas.height = 400;

const box = 20; // Ukuran grid
let score = 0;
let speed = 200; // Kecepatan permainan

// Posisi ular awal
let snake = [{ x: 8 * box, y: 8 * box }];
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box,
};

// Fungsi untuk menggambar latar belakang luar angkasa
function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawStars();
}

// Fungsi untuk menggambar bintang
function drawStars() {
  const starCount = 50;
  for (let i = 0; i < starCount; i++) {
    ctx.fillStyle = "white";
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2,
      2
    );
  }
}

// Fungsi untuk menggambar kepala ular dengan lebih detail
function drawSnakeHead(x, y) {
  const gradient = ctx.createRadialGradient(
    x + 10,
    y + 10,
    5,
    x + 10,
    y + 10,
    20
  );
  gradient.addColorStop(0, "#00ff88");
  gradient.addColorStop(1, "#006600");

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, box, box);

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x + 5, y + 5, 3, 0, Math.PI * 2);
  ctx.arc(x + 15, y + 5, 3, 0, Math.PI * 2);
  ctx.fill();
}

// Fungsi untuk menggambar tubuh ular
function drawSnakeBody(x, y) {
  const gradient = ctx.createLinearGradient(x, y, x + box, y + box);
  gradient.addColorStop(0, "#006600");
  gradient.addColorStop(1, "#00ff88");

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, box, box);

  ctx.strokeStyle = "#004400";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, box, box);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      drawSnakeHead(snake[i].x, snake[i].y);
    } else {
      drawSnakeBody(snake[i].x, snake[i].y);
    }
  }
}

// Fungsi untuk menggambar makanan
function drawFood() {
  ctx.fillStyle = "#ff0055";
  ctx.fillRect(food.x, food.y, box, box);
}

// Fungsi untuk memperbarui posisi ular
function updateSnake() {
  const head = { ...snake[0] };

  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  // Ular makan makanan
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = score;

    // Animasi skor
    scoreElement.classList.add("flash-score");
    setTimeout(() => {
      scoreElement.classList.remove("flash-score");
    }, 200);

    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box,
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snakeCollision(head, snake)
  ) {
    clearInterval(game);
    alert("Game Over!");
  }
}

// Cek apakah ular menabrak dirinya sendiri
function snakeCollision(head, snake) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Kontrol gerakan ular
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function gameLoop() {
  drawBackground();
  drawSnake();
  drawFood();
  updateSnake();
}

// Mulai permainan
let game = setInterval(gameLoop, speed);

// Tombol restart
restartButton.addEventListener("click", () => {
  clearInterval(game);
  score = 0;
  scoreElement.textContent = score;
  snake = [{ x: 8 * box, y: 8 * box }];
  direction = "RIGHT";
  game = setInterval(gameLoop, speed);
});
