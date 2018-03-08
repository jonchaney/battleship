class Board {
    constructor() {
        this.grid = this.generateBoard();
    }

    // time complexity to generate board is O(n^2)
    generateBoard(n) {
        let row = [];
        let grid = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                row.push(0);
            }
            grid.push(row);
            row = [];
        }
        return grid;
    }
}

module.exports = Board;