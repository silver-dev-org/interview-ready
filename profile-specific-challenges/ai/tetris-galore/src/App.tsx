import { useRef, useState, useEffect } from "react";
import "./App.css";

// Tetromino shapes (4 rotations each, 4x4 grids)
const TETROMINOES = {
  I: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  O: [
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  S: [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  Z: [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
  J: [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  ],
  L: [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
  ],
};

const COLORS = {
  I: "#00FFFF",
  O: "#FFFF00",
  T: "#800080",
  S: "#00FF00",
  Z: "#FF0000",
  J: "#0000FF",
  L: "#FFA500",
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BASE_GRAVITY_INTERVAL = 500; // ms
const GRAVITY_PER_LEVEL = 50; // ms
const MIN_GRAVITY_INTERVAL = 100; // ms

class TetrisGame {
  container: HTMLElement;
  board: (string | null)[][];
  cells: HTMLElement[][];
  currentPiece: {
    shape: number[][];
    type: string;
    x: number;
    y: number;
    rotation: number;
  };
  nextPiece: {
    shape: number[][];
    type: string;
    x: number;
    y: number;
    rotation: number;
  };
  score: number;
  level: number;
  linesCleared: number;
  gameOver: boolean;
  paused: boolean;
  lastPaint: number;
  animationId: number | null;
  onScoreChange: (score: number) => void;
  onLevelChange: (level: number) => void;
  onLinesChange: (lines: number) => void;
  onGameOver: () => void;

  constructor(
    container: HTMLElement,
    onScoreChange: (score: number) => void,
    onLevelChange: (level: number) => void,
    onLinesChange: (lines: number) => void,
    onGameOver: () => void,
  ) {
    this.container = container;
    this.board = Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(null));
    this.cells = [];
    this.currentPiece = { shape: [], type: "", x: 0, y: 0, rotation: 0 };
    this.nextPiece = { shape: [], type: "", x: 0, y: 0, rotation: 0 };
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.gameOver = false;
    this.paused = true;
    this.lastPaint = 0;
    this.animationId = null;
    this.onScoreChange = onScoreChange;
    this.onLevelChange = onLevelChange;
    this.onLinesChange = onLinesChange;
    this.onGameOver = onGameOver;

    this.initBoard();
    this.spawnPiece();
  }

  initBoard() {
    this.container.innerHTML = "";
    this.container.style.display = "grid";
    this.container.style.gridTemplateColumns = `repeat(${BOARD_WIDTH}, 1fr)`;
    this.container.style.gridTemplateRows = `repeat(${BOARD_HEIGHT}, 1fr)`;
    this.container.style.gap = "1px";
    this.container.style.backgroundColor = "#000";

    for (let y = 0; y < BOARD_HEIGHT; y++) {
      this.cells[y] = [];
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const cell = document.createElement("div");
        cell.style.width = "30px";
        cell.style.height = "30px";
        cell.style.backgroundColor = "#000";
        cell.style.border = "1px solid #333";
        this.container.appendChild(cell);
        this.cells[y][x] = cell;
      }
    }
  }

  spawnPiece() {
    const types = Object.keys(TETROMINOES);
    const type = types[Math.floor(Math.random() * types.length)];
    const shape = TETROMINOES[type as keyof typeof TETROMINOES][0];
    this.currentPiece = {
      shape,
      type,
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: 0,
      rotation: 0,
    };

    if (this.checkCollision(this.currentPiece)) {
      this.gameOver = true;
      this.onGameOver();
      return;
    }

    this.render();
  }

  checkCollision(piece: typeof this.currentPiece): boolean {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x;
          const newY = piece.y + y;
          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && this.board[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  calculateShadowPosition(): { x: number; y: number } {
    let shadowY = this.currentPiece.y;
    while (!this.checkCollision({ ...this.currentPiece, y: shadowY + 1 })) {
      shadowY++;
    }
    return { x: this.currentPiece.x, y: shadowY };
  }

  placePiece() {
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (this.currentPiece.shape[y][x]) {
          const boardX = this.currentPiece.x + x;
          const boardY = this.currentPiece.y + y;
          if (boardY >= 0) {
            this.board[boardY][boardX] =
              COLORS[this.currentPiece.type as keyof typeof COLORS];
          }
        }
      }
    }
    this.clearLines();
    this.spawnPiece();
  }

  clearLines() {
    let newLinesCleared = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (this.board[y].every((cell) => cell !== null)) {
        this.board.splice(y, 1);
        this.board.unshift(Array(BOARD_WIDTH).fill(null));
        newLinesCleared++;
        y++; // check the same row again
      }
    }

    if (newLinesCleared > 0) {
      // Update total lines cleared
      this.linesCleared += newLinesCleared;
      this.onLinesChange(this.linesCleared);

      // Calculate score with level multiplier
      const basePoints = 100 * newLinesCleared;
      const levelMultiplier = this.level;
      this.score += basePoints * levelMultiplier;
      this.onScoreChange(this.score);

      // Check for level progression (every 10 lines)
      const newLevel = Math.floor(this.linesCleared / 10) + 1;
      if (newLevel > this.level) {
        this.level = newLevel;
        this.onLevelChange(this.level);
      }
    }
  }

  movePiece(dx: number, dy: number): boolean {
    const newPiece = {
      ...this.currentPiece,
      x: this.currentPiece.x + dx,
      y: this.currentPiece.y + dy,
    };
    if (!this.checkCollision(newPiece)) {
      this.currentPiece = newPiece;
      this.render();
      return true;
    }
    return false;
  }

  rotatePiece() {
    const newRotation = (this.currentPiece.rotation + 1) % 4;
    const newShape =
      TETROMINOES[this.currentPiece.type as keyof typeof TETROMINOES][
        newRotation
      ];
    const newPiece = {
      ...this.currentPiece,
      shape: newShape,
      rotation: newRotation,
    };
    if (!this.checkCollision(newPiece)) {
      this.currentPiece = newPiece;
      this.render();
    }
  }

  dropPiece() {
    while (this.movePiece(0, 1)) {
      // Keep moving down until can't
    }
    this.placePiece();
  }

  render() {
    // Clear board
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        this.cells[y][x].style.backgroundColor = this.board[y][x] || "#000";
        this.cells[y][x].style.opacity = "1";
      }
    }

    // Calculate and render shadow
    const shadowPosition = this.calculateShadowPosition();

    // Only render shadow if it's different from current piece position
    if (shadowPosition.y !== this.currentPiece.y) {
      for (let y = 0; y < this.currentPiece.shape.length; y++) {
        for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
          if (this.currentPiece.shape[y][x]) {
            const boardX = shadowPosition.x + x;
            const boardY = shadowPosition.y + y;
            if (
              boardX >= 0 &&
              boardX < BOARD_WIDTH &&
              boardY >= 0 &&
              boardY < BOARD_HEIGHT
            ) {
              // Only show shadow on empty cells
              if (!this.board[boardY][boardX]) {
                this.cells[boardY][boardX].style.backgroundColor =
                  COLORS[this.currentPiece.type as keyof typeof COLORS];
                this.cells[boardY][boardX].style.opacity = "0.3";
              }
            }
          }
        }
      }
    }

    // Render current piece
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (this.currentPiece.shape[y][x]) {
          const boardX = this.currentPiece.x + x;
          const boardY = this.currentPiece.y + y;
          if (
            boardX >= 0 &&
            boardX < BOARD_WIDTH &&
            boardY >= 0 &&
            boardY < BOARD_HEIGHT
          ) {
            this.cells[boardY][boardX].style.backgroundColor =
              COLORS[this.currentPiece.type as keyof typeof COLORS];
            this.cells[boardY][boardX].style.opacity = "1";
          }
        }
      }
    }
  }

  start() {
    this.paused = false;
    this.gameLoop();
  }

  pause() {
    this.paused = true;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  getGravityInterval(): number {
    const interval =
      BASE_GRAVITY_INTERVAL - (this.level - 1) * GRAVITY_PER_LEVEL;
    return Math.max(interval, MIN_GRAVITY_INTERVAL);
  }

  gameLoop = (timestamp: number = 0) => {
    if (this.paused || this.gameOver) return;

    if (timestamp - this.lastPaint > this.getGravityInterval()) {
      if (!this.movePiece(0, 1)) {
        this.placePiece();
      }
      this.lastPaint = timestamp;
    }

    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (this.paused || this.gameOver) return;

    switch (event.key) {
      case "ArrowLeft":
      case "a":
      case "A":
        this.movePiece(-1, 0);
        break;
      case "ArrowRight":
      case "d":
      case "D":
        this.movePiece(1, 0);
        break;
      case "ArrowDown":
      case "s":
      case "S":
        this.movePiece(0, 1);
        break;
      case "ArrowUp":
      case "w":
      case "W":
        this.rotatePiece();
        break;
      case " ":
        event.preventDefault();
        this.dropPiece();
        break;
    }
  };

  destroy() {
    this.pause();
    document.removeEventListener("keydown", this.handleKeyPress);
  }
}

function App() {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<TetrisGame | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(true);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const handleGlobalKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (!gameInstanceRef.current) return;
        if (pausedRef.current) {
          gameInstanceRef.current.start();
          setPaused(false);
        } else {
          gameInstanceRef.current.pause();
          setPaused(true);
        }
      } else if (event.key === "Escape") {
        if (gameInstanceRef.current) {
          gameInstanceRef.current.destroy();
        }
        setScore(0);
        setGameOver(false);
        setPaused(true);
        if (gameRef.current) {
          gameInstanceRef.current = new TetrisGame(
            gameRef.current,
            (newScore) => setScore(newScore),
            (newLevel) => setLevel(newLevel),
            (newLines) => setLines(newLines),
            () => setGameOver(true),
          );
          document.addEventListener(
            "keydown",
            gameInstanceRef.current.handleKeyPress,
          );
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKey);

    if (gameRef.current && !gameInstanceRef.current) {
      gameInstanceRef.current = new TetrisGame(
        gameRef.current,
        (newScore) => setScore(newScore),
        (newLevel) => setLevel(newLevel),
        (newLines) => setLines(newLines),
        () => setGameOver(true),
      );
      document.addEventListener(
        "keydown",
        gameInstanceRef.current.handleKeyPress,
      );
    }

    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy();
      }
      document.removeEventListener("keydown", handleGlobalKey);
    };
  }, []);

  const handleStartPause = () => {
    if (!gameInstanceRef.current) return;

    if (paused) {
      gameInstanceRef.current.start();
      setPaused(false);
    } else {
      gameInstanceRef.current.pause();
      setPaused(true);
    }
  };

  const handleRestart = () => {
    if (gameInstanceRef.current) {
      gameInstanceRef.current.destroy();
    }
    setScore(0);
    setGameOver(false);
    setPaused(true);
    if (gameRef.current) {
      gameInstanceRef.current = new TetrisGame(
        gameRef.current,
        (newScore) => setScore(newScore),
        (newLevel) => setLevel(newLevel),
        (newLines) => setLines(newLines),
        () => setGameOver(true),
      );
      document.addEventListener(
        "keydown",
        gameInstanceRef.current.handleKeyPress,
      );
    }
  };

  return (
    <div className="app">
      <h1>Tetris</h1>
      <div className="game-container">
        <div ref={gameRef} className="tetris-board"></div>
        <div className="game-info">
          <div>Score: {score}</div>
          <div>Level: {level}</div>
          <button onClick={handleStartPause}>
            {paused ? "Start" : "Pause"}
          </button>
          <button onClick={handleRestart}>Restart</button>
          {gameOver && <div>Game Over!</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
