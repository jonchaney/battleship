const Player = require('./player.js');
const Util = require('./util.js')

class Battleship {
    constructor() {
        this.players = [];
    }
    
    playGame() {
        this.players.push(new Player('Player One'));
        this.players.push(new Player('Player Two'));
        this.setUpBoards(this.players);
    }

    battle() {
        let i = 0;
        let j = 1;
        const move = (players, nextPlayer) => { 
            let player = players[i%2];
            let opposingPlayer = players[j%2];
            player.makeMove(opposingPlayer, nextPlayer); 
            i++;
            j++;
        }
        
        const nextPlayer = () => {
            let gameOver = this.players[0].lost() || this.players[1].lost()
            if(gameOver) {
                if (this.players[0].lost()) {
                    this.displayWinner(this.players[0])
                } else {
                    this.displayWinner(this.players[1])
                }
                Util.remove('attack');
            } else {
                move(this.players, () => nextPlayer());    
            }
        }

        move(this.players, () => nextPlayer());
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

    displayWinner(player) {
        Util.changeInnerHtml('winner',`${player.name} is the winner!`);
    }
}

module.exports = Battleship;