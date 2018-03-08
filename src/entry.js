const Battleship = require('./battleship.js')

document.addEventListener('DOMContentLoaded', () => {
    
    let game = new Battleship();

    game.start();

});