class Board {
    constructor(n = 10) {
        this.grid = this.generateBoard(n);
    }

    display() {
        
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
}

module.exports = Board;