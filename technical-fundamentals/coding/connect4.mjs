/**
 Connect4

 Connect4 is a game where two players take turns placing a token on columns that drop to the bottom.
 When a player forms 4 of his tokens in a line - horizontally, vertically,or diagonally - the player wins.

 [Visualization](https://i.ebayimg.com/images/g/DzMAAOSwSjxj6m0e/s-l1600.jpg)

 Implement Connect 4 with the class below.
 */

export const PLAYER_ONE = 1;
export const PLAYER_TWO = 2;

export class Connect4 {
  board = [];
  currentPlayer;
  theWinner;
  constructor() {
    this.board = Array.from({length: 10}, () => Array(10).fill(0));
    this.currentPlayer = PLAYER_ONE;
  }
  play(col) {

    if (this.theWinner) return;

    for (let row=this.board.length - 1; row>=0; row--) {
      if (this.board[row][col] === 0) {
        this.board[row][col] = this.currentPlayer;
        this.checkWinner(row, col);
        break;
      }
    }

    this.currentPlayer = this.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;

  }

  getValue(row, col) {
    if (row<0 || col<0 || row>this.board.length - 1 || col>this.board[0].length) {
      return false;
    }

    return this.board[row][col];
  }
  checkWinner(row, col) {

    const height = this.board.length;
    const width = this.board[0].length;

    const checkFour = (self, count) => {
      if (count >= 4) {
        self.theWinner = self.currentPlayer;
        return true;
      }
    }

    let count = 0;
    //vertically bottom
    let y = row;
    while (y<=height - 1 && this.currentPlayer === this.board[y][col]) {
      y++;
      count++;
    }
    if (checkFour(this, count)) return;

    //horizontally left
    count = 0;
    let x = col;
    while (x>=0 && this.currentPlayer === this.board[row][x]) {
      x--;
      count++;
    }
    if (checkFour(this, count)) return;
    //horizontally right
    x = col+1;
    while (x<=width && this.currentPlayer === this.board[row][x]) {
      x++;
      count++;
    }
    if (checkFour(this, count)) return;

    // diagonally left top
    count = 0;
    x = col;
    y = row;
    while (x>=0 && y>=0 && this.currentPlayer === this.board[y][x]) {
      x--;
      y--;
      count++;
    }
    if (checkFour(this, count)) return;

    // diagonally right bottom
    x = col+1;
    y = row+1;
    while (x<=width - 1 && y<=height - 1 && this.currentPlayer === this.board[y][x]) {
      x++;
      y++;
      count++;
    }
    if (checkFour(this, count)) return;

    // diagonally right top
    count = 0;
    x = col;
    y = row;
    while (x<=width - 1 && y>=0 && this.currentPlayer === this.board[y][x]) {
      x++;
      y--;
      count++;
    }
    if (checkFour(this, count)) return;

    // diagonally left bottom
    x = col-1;
    y = row+1;
    while (x>=0 && y<=height - 1 && this.currentPlayer === this.board[y][x]) {
      x--;
      y++;
      count++;
    }
    checkFour(this, count);

  }
  print() {}

  winner() {
    return this.theWinner;
  }
}
