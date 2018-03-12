describe("Player", () => {
    const Player = require('../../src/player.js');
    const Battleship = require('../../src/battleship.js');
    let player;
    let game;
  
    beforeEach(() => {
      game = new Battleship();  
      game.playGame();
    });
    
    describe("when player is instantiated", () => {
        it("should have a 10 x 10 grid", () => {
            let player = game.players[0];
            let board = player.board;
            expect(board.grid.length).toEqual(10);
            expect(board.grid[0].length).toEqual(10);
        });

        it("should have five ships", () => {
            let ships = player.ships;
            expect(ships.length).toEqual(5);
        });
    });

    
  });
  