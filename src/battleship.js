const Player = require('./player.js');
const Util = require('./util.js')

class Battleship {
    constructor() {
        this.players = [];
    }
    
    playGame() {
        document.getElementsByClassName('form')[0].style = 'display:none'; // remove form 
        this.players.push(new Player('Player One'));
        this.players.push(new Player('Player Two'));
        this.setUpBoards(this.players);
    }

    battleship() {
        // start battling
        console.log('start battle');
    }

    displayBoard(player) {
        player.displayBoard(player.name);
    }

    setUpBoards(players) {
        let i = 0;
        const setUpBoard = (nextPlayer) => { 
            document.getElementById('axis').innerHTML = 'Horizontal';
            players[i].displayBoard();
            players[i].placeShips(() => nextPlayer());   
            i++;
        }
        
        const nextPlayer = () => {
            setUpBoard(() => {
                Util.remove('place-ships')
                this.battleship();
            });    
        }
        setUpBoard(() => nextPlayer());
    }

    toggleAxis() {
        let axis = document.getElementById('axis');
        if (axis.innerHTML === "Horizontal") {
            axis.innerHTML = 'Vertical';
        } else {
            axis.innerHTML = 'Horizontal';
        }
    }
}

module.exports = Battleship;