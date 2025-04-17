// All the JavaScript code from earlier

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 10; // Size of each block
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;
let direction;
let gameOver = false;
let gameInterval;

// Function to start the game
function startGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  food = generateFood();
  direction = "RIGHT";
  gameOver = false;

  // Set the game to update every 100ms (game loop)
  gameInterval = setInterval(updateGame, 100);
}

// Function to stop the game
function stopGame() {
  clearInterval(gameInterval);
  gameOver = true;
  alert("Oops! The Snake has collided! Game Over!"); // Custom message here
}

// Function to update the game
function updateGame() {
  if (gameOver) return;

  moveSnake();
  checkCollision();
  drawGame();
}

// Function to draw everything on the canvas
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw the snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "green" : "black"; // Head is green, body is black
    ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
  });

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
}

// Function to move the snake
function moveSnake() {
  let head = Object.assign({}, snake[0]);

  if (direction === "RIGHT") head.x++;
  if (direction === "LEFT") head.x--;
  if (direction === "UP") head.y--;
  if (direction === "DOWN") head.y++;

  snake.unshift(head); // Add new head to the front of the snake

  if (head.x === food.x && head.y === food.y) {
    food = generateFood(); // Regenerate food if snake eats it
  } else {
    snake.pop(); // Remove tail
  }
}

// Function to generate food at a random location
function generateFood() {
  let foodX = Math.floor(Math.random() * columns);
  let foodY = Math.floor(Math.random() * rows);
  return { x: foodX, y: foodY };
}

// Function to check for collisions
function checkCollision() {
  const head = snake[0];

  // Check if the snake collides with walls
  if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
    stopGame();
  }

  // Check if the snake collides with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      stopGame();
    }
  }
}

// Function to change the direction of the snake
function changeDirection(event) {
  if (event.keyCode === 37 && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.keyCode === 38 && direction !== "DOWN") {
    direction = "UP";
  } else if (event.keyCode === 39 && direction !== "LEFT") {
    direction = "RIGHT";
  } else if (event.keyCode === 40 && direction !== "UP") {
    direction = "DOWN";
  }

  // Prevent scrolling when using the arrow keys
  event.preventDefault();
}

// Event listener for key presses
document.addEventListener("keydown", changeDirection);

// Event listener for the start button
document.getElementById("startGameBtn").addEventListener("click", startGame);