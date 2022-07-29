/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Player {
  constructor(color, playerNum) {
    this.color = color;
    this.playerNum = playerNum;
  }
}

class Game {
  constructor(playerArray, width = 7, height = 6) {
    this.width = width;
    this.height = height;
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    this.players = playerArray;
    this.currPlayer = this.players[0]; // active player starting with first player
    this.makeBoard();
    this.makeHtmlBoard();
  }
  /** makeBoard: create in-JS board structure:
  board = array of rows, each row is array of cells  (board[y][x]) */
  makeBoard() {
    for (let i = 0; i < this.height; i++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }
  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const htmlBoard = document.querySelector('#board');

    // creating and labeling the top row of cells
    // where a user can click to trigger the handleClick fn
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    // binding this so later on click "this" will be referring to the game
    this.handleClickBind = this.handleClick.bind(this);

    // mousedown to prevent clicking on 1 col and dragging and mouseup on another
    top.addEventListener("mousedown", this.handleClickBind);

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    htmlBoard.append(top);

    // creating and label each row of cells by looping
    // over and adding the y-axis (<tr>)
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    //put piece in the array board
    this.board[y][x] = this.currPlayer;
    //put piece in the html board
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundColor = this.currPlayer.color;
    const placement = document.getElementById(`${y}-${x}`);
    placement.append(piece);
  }

  /** endGame: announce game end and create a reset button*/

  endGame(msg) {
    alert(msg);
    const htmlBoard = document.querySelector('#board');;
    htmlBoard.classList.toggle('finished');
  }

  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
    // place piece in board and add to HTML table
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.playerNum} won!`);
    }

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) { return endGame("Tie Game!"); }

    // switch players 
    this.currPlayer = this.players[this.currPlayer.playerNum % this.players.length];
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    const _win = cells =>
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    // for every cell check if theres a winner going horizontal (right), vertical (down),
    // or either diagonals (downwards left/right). it will cover everything since it goes through every cell
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }

  // resets the game by remaking the board/htmlboard and removing the reset button

  /*resetGame() {
    this.board = [];
    const htmlBoard = document.querySelector('#board');
    htmlBoard.innerHTML = "";
    const resetBtn = document.querySelector('#resetBtn');
    resetBtn.remove();
    this.makeBoard();
    this.makeHtmlBoard();
    htmlBoard.classList.toggle('finished');
  } */
}


function isValidColor(str) {
  let s = new Option().style;
  s.color = str;
  return s.color == str.toLowerCase();
}

document.getElementById('start').addEventListener('click', () => {
  let p1Color = document.getElementById('p1-color').value;
  let p2Color = document.getElementById('p2-color').value;
  p1Color = p1Color != "" && isValidColor(p1Color) ? p1Color : "#BB86FC";
  p2Color = p2Color != "" && isValidColor(p2Color) ? p2Color : "#00C2AE";
  let p1 = new Player(p1Color, 1);
  let p2 = new Player(p2Color, 2);
  new Game([p1, p2], 7, 6);
});







