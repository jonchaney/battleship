const Board = require('./board.js');

class Player {
    constructor() {
        this.board = new Board();
    }
}

module.exports = Player;