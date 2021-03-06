const Ship = require('./ship.js');
const Util = require('./util.js');

class Board {
    constructor(n = 10) {
        this.generateBoard(n);
        this.ships = [new Ship('Battleship', 4),
                      new Ship('Cruiser', 3),
                      new Ship('Carrier', 5),
                      new Ship('Submarine', 3),
                      new Ship('Destroyer', 2)];
        this.gameStarted = false;
        this.shipsSunk = 0;
    }

    display(name) {
        let tables = document.getElementById('tables');
        let table = document.getElementById(`${name}`) 

        if (!table) { // if it does not exist create a new one
            table = document.createElement('table');;
        }

        if (!tables) { // if it does not exist create a new one
            tables = document.createElement('tables');;
        }  // for testing
        
        let tr; // row
        let td; // column

        this.grid.forEach((row, i) => {
            tr = document.createElement('tr');
            row.forEach((col, j) => {
                td = document.createElement('td');
                td.data = [i,j]
                if (this.grid[i][j] ===  1 && !this.gameStarted) { // only show where ships are placed if game has not started
                    td.classList.add('occupied');                
                } else if (this.grid[i][j] ===  'o') {
                    td.classList.add('missed');
                } else if (this.grid[i][j] ===  'x') {
                    td.classList.add('hit');
                }
                tr.appendChild(td)
            })
            table.appendChild(tr);
        });
        table.setAttribute('id',`${name}`);
        tables.appendChild(table);
    }

    updateBoard(name) {
        let table = document.getElementById(`${name}`);
        // remove all the chldren (rows) and update board
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        this.display(name);
    }

    generateBoard(n) {
        let row = [];
        this.grid = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                row.push(0);
            }
            this.grid.push(row);
            row = [];
        }
    }

    validPosition(coordinates, ship, axis) {
        this.clearErrors();
        let i = 0;
        if (axis === 'Horizontal') { // check for overlapping or out of bounds horizontally placed ship 
            while (i < ship.length) {
                if (this.grid[coordinates[0]][coordinates[1]+i] === 1){ 
                    return false; 
                };
                i++;
            }
            if (coordinates[1] + ship.length > this.grid[0].length) { // check if out of bounds
                return false;
            }
        } else { // check for overlapping or out of bounds vertically placed ship
           if(coordinates[0] + ship.length > this.grid.length) {
               return false;
           } else {
                while (i < ship.length) {
                    if (this.grid[coordinates[0]+i][coordinates[1]] === 1) {
                        return false;
                    }
                    i++;
                }
            }
        }
        return true;
    }

    placeShip(startPos, ship, axis) {
        this.grid[startPos[0]][startPos[1]] = 1; // add location data to grid
        let i = 0;
        if (axis === 'Horizontal') { // horizontal ship placement
            while (ship.coordinates.length < ship.length) {
                ship.coordinates.push([startPos[0],startPos[1]+i]) // add location data to ship
                this.grid[startPos[0]][startPos[1]+i] = 1;         // update grid
                i++;
            }
        } else { // vertical ship placement
            while (ship.coordinates.length < ship.length) {
                ship.coordinates.push([startPos[0]+i,startPos[1]])
                this.grid[startPos[0]+i][startPos[1]] = 1;
                i++;
            }
        }
    }

    fire(coordinate) {
        this.clearErrors();
        let location = this.grid[coordinate[0]][coordinate[1]]; // get grid data
        const position = {miss: 0, hit: 1};
        switch (location) {
            case position.miss:
                this.grid[coordinate[0]][coordinate[1]] = 'o';
                this.attackInfo('you missed!');
                return true;
            case position.hit:
                this.grid[coordinate[0]][coordinate[1]] = 'x';
                this.attackInfo('nice shot!')
                this.checkShips(coordinate);     
                return true;
            default:
                this.errors('you already fired there!')
                return false;
        }
    }

    checkShips(coordinate) {
        // checking the coordinates of each ship to see which ship was hit and if it was sunk
        this.ships.forEach((ship) => {
            ship.coordinates.forEach((location) => {
                if (Util.compareArray(coordinate, location)) {
                    ship.count++
                    if (ship.isSunk()) {
                        this.attackInfo(`You sunk their ${ship.type}!`)
                        this.shipsSunk += 1;
                    } 
                }
            })
        })
    }

    clearShipCoordinates() {
        this.ships.forEach((ship) => {
            ship.coordinates = [];
            ship.count = 0;
        });
    }

    reset(n) {
        // reset game board
        this.generateBoard(n);
        this.gameStarted = false;
        this.shipsSunk = 0;
        this.clearShipCoordinates();
    }

    attackInfo(msg) {
        Util.changeInnerHtml('attack-info', msg)
    }

    errors(error) {
        Util.changeInnerHtml('errors', error);
    }

    clearErrors() {
        Util.changeInnerHtml('errors', "");
    }
}

module.exports = Board;
