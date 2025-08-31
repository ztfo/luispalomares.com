<template>
  <div v-if="isActive" class="secret-snake-overlay" @click="handleOverlayClick">
    <div class="snake-game-container" @click.stop>
      <button @click="closeGame" class="close-button" aria-label="Close game">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
      
      <div class="canvas-wrapper">
        <canvas 
          ref="gameCanvas" 
          :width="canvasSize" 
          :height="canvasSize"
          @keydown="handleKeyPress"
          tabindex="0"
          class="snake-canvas"
        ></canvas>
      </div>
      
      <div v-if="gameOver" class="game-over-overlay">
        <div class="game-over-content">
          <h3>Game Over!</h3>
          <p>Score: {{ score }}</p>
          <button @click="restartGame" class="restart-btn">Play Again</button>
          <button @click="closeGame" class="close-btn">Close</button>
        </div>
      </div>
      
      <div class="score-display">Score: {{ score }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecretSnakeGame',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      canvasSize: 400,
      snake: [],
      food: {},
      direction: 'right',
      gameLoop: null,
      score: 0,
      gameOver: false,
      gameSpeed: 150,
      ctx: null
    }
  },
  watch: {
    isActive(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.initGame();
          this.startGameLoop();
        });
      } else {
        this.stopGameLoop();
      }
    }
  },
  methods: {
    initGame() {
      const canvas = this.$refs.gameCanvas;
      this.ctx = canvas.getContext('2d');
      
      // Initialize snake at center
      this.snake = [
        { x: 8, y: 8 },
        { x: 7, y: 8 },
        { x: 6, y: 8 }
      ];
      
      this.direction = 'right';
      this.score = 0;
      this.gameOver = false;
      this.generateFood();
      
      // Focus canvas for keyboard input
      canvas.focus();
    },
    
    generateFood() {
      const gridSize = this.canvasSize / 20; // 20x20 grid
      this.food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
      
      // Make sure food doesn't spawn on snake
      while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y)) {
        this.food = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize)
        };
      }
    },
    
    startGameLoop() {
      this.gameLoop = setInterval(() => {
        this.updateGame();
        this.drawGame();
      }, this.gameSpeed);
    },
    
    stopGameLoop() {
      if (this.gameLoop) {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
      }
    },
    
    updateGame() {
      if (this.gameOver) return;
      
      const head = { ...this.snake[0] };
      
      // Move head based on direction
      switch (this.direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
      }
      
      // Check wall collision
      const gridSize = this.canvasSize / 20;
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        this.endGame();
        return;
      }
      
      // Check self collision
      if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        this.endGame();
        return;
      }
      
      // Add new head
      this.snake.unshift(head);
      
      // Check food collision
      if (head.x === this.food.x && head.y === this.food.y) {
        this.score += 10;
        this.generateFood();
        // Increase speed slightly
        if (this.gameSpeed > 50) {
          this.gameSpeed -= 2;
          this.stopGameLoop();
          this.startGameLoop();
        }
      } else {
        // Remove tail if no food eaten
        this.snake.pop();
      }
    },
    
    drawGame() {
      if (!this.ctx) return;
      
      // Clear canvas with completely black background
      this.ctx.fillStyle = '#000000'; // Completely black background
      this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
      
      const gridSize = this.canvasSize / 20;
      
      // Create a continuous gradient across the entire snake
      if (this.snake.length > 0) {
        const firstSegment = this.snake[0];
        const lastSegment = this.snake[this.snake.length - 1];
        
        // Create gradient from head to tail
        const gradient = this.ctx.createLinearGradient(
          firstSegment.x * gridSize, 
          firstSegment.y * gridSize, 
          lastSegment.x * gridSize, 
          lastSegment.y * gridSize
        );
        gradient.addColorStop(0, '#42b883'); // Green at head
        gradient.addColorStop(1, '#3e71fa'); // Blue at tail
        
        // Draw snake with continuous gradient
        this.snake.forEach((segment, index) => {
          if (index === 0) {
            // Head - use the gradient (no white dots)
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
          } else {
            // Body - use the same gradient
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
          }
        });
      }
      
      // Draw food as a green circle
      this.ctx.fillStyle = '#42b883'; // Green color
      const foodX = this.food.x * gridSize + gridSize / 2;
      const foodY = this.food.y * gridSize + gridSize / 2;
      const foodRadius = gridSize / 2;
      this.ctx.beginPath();
      this.ctx.arc(foodX, foodY, foodRadius, 0, 2 * Math.PI);
      this.ctx.fill();
    },
    
    handleKeyPress(event) {
      event.preventDefault();
      
      switch (event.key) {
        case 'ArrowUp':
          if (this.direction !== 'down') this.direction = 'up';
          break;
        case 'ArrowDown':
          if (this.direction !== 'up') this.direction = 'down';
          break;
        case 'ArrowLeft':
          if (this.direction !== 'right') this.direction = 'left';
          break;
        case 'ArrowRight':
          if (this.direction !== 'left') this.direction = 'right';
          break;
        case 'Escape':
          this.closeGame();
          break;
      }
    },
    
    endGame() {
      this.gameOver = true;
      this.stopGameLoop();
    },
    
    restartGame() {
      this.gameOver = false;
      this.score = 0;
      this.gameSpeed = 150;
      this.initGame();
      this.startGameLoop();
    },
    
    closeGame() {
      this.$emit('close-game');
    },
    
    handleOverlayClick() {
      this.closeGame();
    }
  },
  
  beforeUnmount() {
    this.stopGameLoop();
  }
}

// this was fun :) 

</script>

<style scoped lang="scss">
.secret-snake-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;
}

.snake-game-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.close-button {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  transition: all 0.2s ease;
  z-index: 10000;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.canvas-wrapper {
  padding: 20px; // Same thickness as snake segments
  background: linear-gradient(45deg, #42b883, #3e71fa); // Blue to green gradient matching logo
  display: flex;
  align-items: center;
  justify-content: center;
}

.snake-canvas {
  border: none; // Removed border from canvas itself
  background: none; // Removed background from canvas itself
  cursor: pointer;
  outline: none;
}

.score-display {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  background: transparent; // Transparent background
}

.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-over-content {
  background-color: var(--black);
  padding: 2rem;
  text-align: center;
  border: 1px solid #333;
  
  h3 {
    color: #ffffff;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
  }
  
  p {
    color: #cccccc;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  
  button {
    background-color: transparent;
    border: 1px solid var(--green);
    color: var(--white);
    padding: 0.75rem 1.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    text-transform: capitalize;
    transition: .5s;
    -webkit-font-smoothing: antialiased;
    
    &:hover {
      background-color: var(--green);
    }
    
    &.close-btn {
      border-color: #666;
      color: #cccccc;
      
      &:hover {
        background-color: #666;
        color: #ffffff;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
