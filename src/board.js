const Ship = require('./ship.js');

class Board {
    constructor(n = 10) {
        this.grid = this.generateBoard(n);
        this.ships = [new Ship('Battleship', 4),
                      new Ship('Cruiser', 3),
                      new Ship('Carrier', 5),
                      new Ship('Submarine', 3),
                      new Ship('Destroyer', 2)];
        this.shipsSunk = 0;
        this.gameStarted = false;
    }

    display(name) {
        let tables = document.getElementById('tables'); // get container
        let table = document.getElementById(`${name}`) 
        if (!table) { // if it does not exist create a new one
            table = document.createElement('table');;
        } 
        let tr; // row
        let td; // column

        // time complecity to render board to DOM is O(n^2)
        this.grid.forEach((row, i) => {
            tr = document.createElement('tr');
            row.forEach((col, j) => {
                td = document.createElement('td');
                td.data = [i,j]
                if (this.grid[i][j] ===  1 && !this.gameStarted) { // only show where ships are placed if 
                    td.classList.add('occupied');                  // game has not started
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
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        this.display(name);
    }

    // time complexity to generate board is O(n^2)
    generateBoard(n) {
        let row = [];
        let grid = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                row.push(0);
            }
            grid.push(row);
            row = [];
        }
        return grid;
    }

    validPosition(coordinates, ship, axis) {
        this.clearErrors(); // clear errors
        let i = 0;
        if (axis === 'Horizontal') { // check for overlapping ship
            while (i < ship.length) {
                if (this.grid[coordinates[0]][coordinates[1]+i] === 1){ 
                    return false; 
                };
                i++;
            }
            if (coordinates[1] + ship.length > this.grid[0].length) { // check if out of bounds
                return false;
            }
        } else { // check if valid position for vertical placement
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
        if (axis === 'Horizontal') { 
            while (ship.coordinates.length < ship.length) {
                ship.coordinates.push([startPos[0],startPos[1]+i]) // add location data to ship
                this.grid[startPos[0]][startPos[1]+i] = 1;         // update grid
                i++;
            }
        } else { // vertical placement
            while (ship.coordinates.length < ship.length) {
                ship.coordinates.push([startPos[0]+i,startPos[1]])
                this.grid[startPos[0]+i][startPos[1]] = 1;
                i++;
            }
        }
    }

    errors(error) {
        document.getElementById('errors').innerHTML = `${error}`;
    }

    clearErrors() {
        document.getElementById('errors').innerHTML = '';
    }
}

module.exports = Board;
