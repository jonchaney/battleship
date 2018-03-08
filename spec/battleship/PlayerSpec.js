describe("Player", () => {
    const Player = require('../../src/player.js');
    let player;
  
    beforeEach(() => {
      player = new Player();
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
  
    // describe("when song has been paused", () => {
    //   beforeEach(() => {
    //     player.play(song);
    //     player.pause();
    //   });
  
    //   it("should indicate that the song is currently paused", () => {
    //     expect(player.isPlaying).toBeFalsy();
  
    //     // demonstrates use of 'not' with a custom matcher
    //     expect(player).not.toBePlaying(song);
    //   });
  
    //   it("should be possible to resume", () => {
    //     player.resume();
    //     expect(player.isPlaying).toBeTruthy();
    //     expect(player.currentlyPlayingSong).toEqual(song);
    //   });
    // });
  
    // demonstrates use of spies to intercept and test method calls
    // it("tells the current song if the user has made it a favorite", () => {
    //   spyOn(song, 'persistFavoriteStatus');
  
    //   player.play(song);
    //   player.makeFavorite();
  
    //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    // });
  
    //demonstrates use of expected exceptions
    // describe("#resume", () => {
    //   it("should throw an exception if song is already playing", () => {
    //     player.play(song);
  
    //     expect(() => {
    //       player.resume();
    //     }).toThrowError("song is already playing");
    //   });
    // });
  });
  