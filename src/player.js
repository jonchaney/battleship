const Board = require('./board.js');

class Player {
    constructor(name) {
        this.name = name;
        this.board = new Board();
        this.shipsSunk = 0;
    }

    placeShips() {
        let i = 0;
        let ships = this.board.ships;
        let loopShips = (ships) => {
            if (this.board.shipsPlaced === this.board.ships.length-1) { 
                console.log('line 15');
                return; 
            }
            ships[i].shipInfo(); // display ship information
            document.getElementById('tables').addEventListener('click', (event) => {
                placeSingleShip(event.target.data, ships[i], this.board, () => {
                    i++;
                    this.board.shipsPlaced = i;
                    if (this.board.shipsPlaced === 5) { 
                        return;
                    } else if (i < ships.length) { 
                        document.getElementById('ship').innerHTML = `${ships[i].type} (length ${ships[i].length})` 
                    } 
                    console.log(i);
                });
            })
        }
    
        function placeSingleShip(coordinates, ship, board, nextShip) {
            let axis = document.getElementById('axis').innerHTML;
            if (board.validPosition(coordinates, ship, axis)) {
                board.placeShip(coordinates, ship, axis);
                board.updateBoard();
            } else {
                board.errors('invalid position');
            }
            if (board.shipsPlaced === board.ships.length-1) {

                return;
            } else if (ship.length === ship.coordinates.length) {
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