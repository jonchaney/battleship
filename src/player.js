const Board = require('./board.js');
const Util = require('./util.js');

class Player {
    constructor(name) {
        this.name = name;
        this.board = new Board();
    }

    placeShips(shipsPlaced) {
        let i = 0;
        let ships = this.board.ships;
        document.getElementById('message').innerHTML = `${this.name} place your&nbsp;` // tell player which ship to place
        let loopShips = (ships) => { 
            ships[i].shipInfo(); // display ship information
            document.getElementById(`${this.name}`).addEventListener('click', (event) => { 
                if (i !== this.board.ships.length) { // only respond to onclick if all ships placed
                    placeSingleShip(event.target.data, ships[i], () => {
                        i++;
                        if (i === this.board.ships.length) {                  // if all ships are placed
                            setTimeout(() => {          // set time out for UI/UX purposes
                                Util.remove(this.name); // remove board from DOM
                                this.board.gameStarted = true;
                                shipsPlaced();          // call back function
                            }, 1000);
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

    makeMove(opposingPlayer, callback) {
        opposingPlayer.displayBoard();
        document.getElementById('attack').innerHTML = `${this.name} make your move, attack!` // tell player to attack
        const move = (opposingPlayer) => { 
            document.getElementById(`${opposingPlayer.name}`).addEventListener('click', (event) => { 
                let board = opposingPlayer.board;
                let coordinate = event.target.data;

                takeShot(coordinate, board, () => {
                    callback();
                });
            });
            const takeShot = (coordinate, board, nextPlayer) => {
                if (board.fire(coordinate)) {
                    Util.remove(`${opposingPlayer.name}`);
                    board.display(opposingPlayer.name);
                    setTimeout(() => {     
                        board.attackInfo("");
                        Util.remove(`${opposingPlayer.name}`);
                        nextPlayer();
                    }, 1000);
                }
            }
        }
        move(opposingPlayer);      
    }

    lost() {
        if(this.board.shipsSunk === this.board.ships.length-1) {
            return true;
        } else {
            return false;
        }
    }

    displayBoard() {
        this.board.display(this.name);
    }
}

module.exports = Player;