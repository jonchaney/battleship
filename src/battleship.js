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

    battle() {
        this.players[0].makeMove(this.players[1]);
    }

    displayBoard(player) {
        player.displayBoard(player.name);
    }

    setUpBoards(players) {
        let i = 0;
        const setUpBoard = (nextPlayer) => { 
            players[i].displayBoard();
            players[i].placeShips(() => nextPlayer());   
            i++;
        }
        
        const nextPlayer = () => {
            setUpBoard(() => {
                Util.toggleElement('place-ships')
                this.battle();
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