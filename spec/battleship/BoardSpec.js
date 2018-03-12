describe("Player", () => {
    const Board = require('../../src/board.js');
    let board;
  
    beforeEach(() => {
      board = new Board();
    });
    
    describe("when player is instantiated", () => {
        it("should have a 10 x 10 grid", () => {
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
  