import './style.css'

const canvas = document.querySelector('#gameCanvas')
const ctx = canvas.getContext('2d')
const currentScoreEl = document.querySelector('#currentScore')
const highScoreEl = document.querySelector('#highScore')
const gameStatusEl = document.querySelector('#gameStatus')
const startPauseBtn = document.querySelector('#startPauseBtn')
const restartBtn = document.querySelector('#restartBtn')

const gridSize = 20
const tileCount = canvas.width / gridSize
const gameSpeed = 150

let snake = [
  { x: 10, y: 10 }
]
let food = { x: 15, y: 15 }
let dx = 0
let dy = 0
let nextDx = 0
let nextDy = 0
let score = 0
let highScore = localStorage.getItem('snakeHighScore') || 0
let gameLoop = null
let gameRunning = false
let gamePaused = false
let lastTime = 0

highScoreEl.textContent = highScore

function drawGame(currentTime) {
  if (gamePaused) return
  
  gameLoop = requestAnimationFrame(drawGame)
  
  const deltaTime = currentTime - lastTime
  if (deltaTime < gameSpeed) return
  
  lastTime = currentTime
  
  clearCanvas()
  moveSnake()
  if (checkCollision()) {
    gameOver()
    return
  }
  drawFood()
  drawSnake()
}

function clearCanvas() {
  ctx.fillStyle = '#0d1117'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function moveSnake() {
  dx = nextDx
  dy = nextDy
  
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  snake.unshift(head)
  
  if (head.x === food.x && head.y === food.y) {
    score += 10
    currentScoreEl.textContent = score
    if (score > highScore) {
      highScore = score
      highScoreEl.textContent = highScore
      localStorage.setItem('snakeHighScore', highScore)
    }
    generateFood()
  } else {
    snake.pop()
  }
}

function checkCollision() {
  const head = snake[0]
  
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true
  }
  
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true
    }
  }
  
  return false
}

function drawSnake() {
  snake.forEach((segment, index) => {
    if (index === 0) {
      ctx.font = `${gridSize}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('🐍', segment.x * gridSize + gridSize / 2, segment.y * gridSize + gridSize / 2 + 2)
    } else {
      ctx.fillStyle = '#3db892'
      ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4)
    }
  })
}

function drawFood() {
  ctx.font = `${gridSize}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('🍎', food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2 + 2)
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  }
  
  while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    }
  }
}

function startGame() {
  if (!gameRunning) {
    gameRunning = true
    gamePaused = false
    gameStatusEl.textContent = '游戏进行中 - 使用方向键控制'
    startPauseBtn.textContent = '暂停'
    dx = 1
    dy = 0
    lastTime = performance.now()
    gameLoop = requestAnimationFrame(drawGame)
  } else if (gamePaused) {
    gamePaused = false
    gameStatusEl.textContent = '游戏进行中 - 使用方向键控制'
    startPauseBtn.textContent = '暂停'
    lastTime = performance.now()
    gameLoop = requestAnimationFrame(drawGame)
  } else {
    gamePaused = true
    gameStatusEl.textContent = '游戏已暂停'
    startPauseBtn.textContent = '继续'
    cancelAnimationFrame(gameLoop)
  }
}

function resetGame() {
  cancelAnimationFrame(gameLoop)
  snake = [{ x: 10, y: 10 }]
  dx = 0
  dy = 0
  nextDx = 0
  nextDy = 0
  score = 0
  currentScoreEl.textContent = score
  gameRunning = false
  gamePaused = false
  generateFood()
  clearCanvas()
  drawFood()
  drawSnake()
  gameStatusEl.textContent = '按开始按钮开始游戏'
  startPauseBtn.textContent = '开始'
}

function gameOver() {
  cancelAnimationFrame(gameLoop)
  gameRunning = false
  gameStatusEl.textContent = `游戏结束! 最终分数: ${score}`
  startPauseBtn.textContent = '开始'
}

document.addEventListener('keydown', (e) => {
  if (!gameRunning || gamePaused) return
  
  switch (e.key) {
    case 'ArrowUp':
      if (dy !== 1) {
        nextDx = 0
        nextDy = -1
      }
      e.preventDefault()
      break
    case 'ArrowDown':
      if (dy !== -1) {
        nextDx = 0
        nextDy = 1
      }
      e.preventDefault()
      break
    case 'ArrowLeft':
      if (dx !== 1) {
        nextDx = -1
        nextDy = 0
      }
      e.preventDefault()
      break
    case 'ArrowRight':
      if (dx !== -1) {
        nextDx = 1
        nextDy = 0
      }
      e.preventDefault()
      break
  }
})

startPauseBtn.addEventListener('click', startGame)
restartBtn.addEventListener('click', resetGame)

clearCanvas()
generateFood()
drawFood()
drawSnake()
