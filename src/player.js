const Board = require('./board.js');

class Player {
    constructor(name) {
        this.name = name;
        this.board = new Board();
        this.shipsSunk = 0;
    }

    placeShips(nextPlayer) {
        let i = 0;
        let ships = this.board.ships;
        document.getElementById('message').innerHTML = `${this.name} place your&nbsp;`
        let loopShips = (ships) => {
            ships[i].shipInfo(); // display ship information
            document.getElementById('tables').addEventListener('click', (event) => {
                placeSingleShip(event.target.data, ships[i], this.board, this.name, () => {
                    i++;
                    this.board.shipsPlaced = i;
                    if (this.board.shipsPlaced === 5) { 
                        nextPlayer();
                        return;
                    } else if (i < ships.length) { 
                        document.getElementById('ship').innerHTML = `${ships[i].type} (length ${ships[i].length})` 
                    } 
                    console.log(i);
                });
            })
        }
    
        function placeSingleShip(coordinates, ship, board, name, nextShip) {
            let axis = document.getElementById('axis').innerHTML;
            if (board.validPosition(coordinates, ship, axis)) {
                board.placeShip(coordinates, ship, axis);
                board.updateBoard(name);
            } else {
                board.errors('invalid position');
            }
            if (ship.length === ship.coordinates.length) {
                nextShip();
            } 
        }
        loopShips(ships);         
    }

    makeMove() {

    }

    won() {
        if(this.board.ships.count === 5) {
            return false;
        } else {
            return true;
        }
    }

    displayBoard() {
        this.board.display(this.name);
    }
}

module.exports = Player;