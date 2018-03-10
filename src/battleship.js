const Player = require('./player.js');

class Battleship {
    constructor() {
        this.playerOne;
        this.playerTwo;
    }
    
    playGame(e) {
        e.preventDefault();
        this.playerOne = new Player(e.target[0].value); // create players
        this.playerTwo = new Player(e.target[1].value);
        document.getElementsByClassName('form')[0].style = 'display:none';  // remove form
        this.displayBoards(); 
    }

    playGameTest() {
        this.playerOne = new Player('Philip');
        this.playerTwo = new Player('Harold'); 
        document.getElementsByClassName('form')[0].style = 'display:none'; // remove form 
        
        let play = this.playerOne.won() || this.playerTwo.won();
        this.displayBoard(this.playerOne);
        // place ships
        this.placeShips(this.playerOne);
    }
    
    displayBoard(player) {
        player.displayBoard(player.name);
    }

    placeShips(player) {
        document.getElementById('message').innerHTML = `${player.name} place your`
        player.placeShips();
        // this.playerTwo.placeShips();
    }

    getCoordinates(e) {
        console.log(e.target.data)
    }

    setAxis() {
        let axis = document.getElementById('axis');
        if (axis.innerHTML === "Horizontal") {
            axis.innerHTML = 'Vertical';
        } else {
            axis.innerHTML = 'Horizontal';
        }
    }

}

module.exports = Battleship;