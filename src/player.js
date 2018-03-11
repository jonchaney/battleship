const Board = require('./board.js');
const Util = require('./util.js');

class Player {
    constructor(name) {
        this.name = name;
        this.board = new Board();
        this.shipsSunk = 0;
    }

    placeShips(shipsPlaced) {
        let i = 0;
        let ships = this.board.ships;
        document.getElementById('message').innerHTML = `${this.name} place your&nbsp;` // tell player which ship to place
        let loopShips = (ships) => { 
            ships[i].shipInfo(); // display ship information
            document.getElementById(`${this.name}`).addEventListener('click', (event) => { 
                if (i !== 5) { // only respond to onclick if all ships placed
                    placeSingleShip(event.target.data, ships[i], () => {
                        i++;
                        if (i === 5) {                  `// if all ships are placed
                            setTimeout(() => {          // set time out for UI/UX purposes
                                Util.remove(this.name); // remove board from DOM
                                shipsPlaced();          // call back function
                            }, 500);
                        } else { 
                            document.getElementById('ship').innerHTML = `${ships[i].type} (length ${ships[i].length})` 
                        } 
                    });
                }
            });

        }
    
        const placeSingleShip = (coordinates, ship, nextShip) => {
            let axis = document.getElementById('axis').innerHTML;
            if (this.board.validPosition(coordinates, ship, axis)) {
                this.board.placeShip(coordinates, ship, axis);
                this.board.updateBoard(this.name);
            } else {
                this.board.errors('invalid position');
            }
            if (ship.length === ship.coordinates.length) {
                nextShip();
            } 
        }
        loopShips(ships);         
    }

    won() {
        if(this.board.shipsSunk === 5) {
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