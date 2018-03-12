const Player = require('../src/player.js')
const Board = require('../src/board.js')
const Battleship = require('../src/battleship.js')
const Ship = require('../src/ship.js')

let game = new Battleship();
let playerOne = game.players[0]
let playerTwo = game.players[1]
let ship = new Ship("Carrier", 4)
game.playGame();

test('player name is set correctly', () => {
    expect(playerOne.name).toBe('Player One');
});

test('board grid is ten x ten', () => {
    expect(playerOne.board.grid.length).toBe(10);
    expect(playerOne.board.grid[0].length).toBe(10);
});

test('places ship correctly', () => {
    expect(playerOne.board.validPosition([0,0], ship, 'Horizontal')).toBe(true);
});

test('returns false if placed ship out of bounds', () => {
    expect(playerOne.board.validPosition([9,0], ship, 'Vertical')).toBe(false);
});

test('places ship in correct location', () => {
    expect(playerOne.board.placeShip([0,0], ship, 'Vertical'));
    expect(playerOne.board.grid[0][0] === 1).toBe(true)
    expect(playerOne.board.grid[1][0] === 1).toBe(true)
    expect(playerOne.board.grid[2][0] === 1).toBe(true)
    expect(playerOne.board.grid[3][0] === 1).toBe(true)
});

test('board is updated when ship is hit', () => {
    // player one get fried upon
    playerOne.board.fire([0,0])
    expect(playerOne.board.grid[0][0] === 'x').toBe(true)
});

test('board is updated when shot is a miss', () => {
    // player one get fried upon
    playerOne.board.fire([0,5])
    expect(playerOne.board.grid[0][5] === 'o').toBe(true)
});

