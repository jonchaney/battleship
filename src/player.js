const Ship = require('./ship.js');
const Board = require('./board.js');

class Player {
    constructor() {
        this.board = new Board();
        this.ships = [new Ship('Battleship', 4),
                      new Ship('Cruiser', 3),
                      new Ship('Carrier', 5),
                      new Ship('Submarine', 3),
                      new Ship('Destroyer', 2)];
    }

    placeShips() {

    }

    makeMove() {

    }

    displayBoard() {
        this.board.display();
    }
}

module.exports = Player;