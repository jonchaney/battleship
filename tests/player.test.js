const Player = require('../src/player.js')
const Board = require('../src/board.js')

let player = new Player('Jon');
let board = new Board();

test('player name is set correctly', () => {
    expect(player.name).toBe('Jon');
});
