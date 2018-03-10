const Battleship = require('./battleship.js')

document.addEventListener('DOMContentLoaded', () => {
    
    window.game = new Battleship();
    game.playGameTest();
});