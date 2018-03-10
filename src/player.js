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
            document.getElementById('ship').innerHTML = `${ships[i].type} (length ${ships[i].length})`
            document.getElementById('tables').addEventListener('click', (event) => {
                placeSingleShip(event, ships[i], this.board, () => {
                    if (i < ships.length-1) { document.getElementById('ship').innerHTML = `${ships[i+1].type} (length ${ships[i+1].length})` }
                    i++;
                });
            })
        }
    
        function placeSingleShip(event, ship, board, nextShip) {
            let coordinates = event.target.data;
            let axis = document.getElementById('axis').innerHTML;
            if (board.validPosition(coordinates, ship, axis)) {
                board.placeShip(coordinates, ship, axis);
                board.rerenderBoard();
            } else {
                console.log('invalid position');
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

    displayBoard(name) {
        this.board.display(this.name);
    }
}

module.exports = Player;