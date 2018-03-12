const Player = require('./player.js');
const Util = require('./util.js')

class Battleship {
    constructor() {
        this.players = [new Player('Player One'), new Player('Player Two')];
    }
    
    playGame() {
        this.setUpBoards(this.players, () => this.battle());
    }

    battle() {
        let i = 0;
        let j = 1;
        Util.toggleElement('attack');
        const move = (players, nextPlayer) => { 
            // switch between players
            let player = players[i%2];
            let opposingPlayer = players[j%2];
            player.makeMove(opposingPlayer, nextPlayer); 
            i++;
            j++;
        }
        
        const nextPlayer = () => {
            let gameOver = this.players[0].lost() || this.players[1].lost()
            if(gameOver) {
                Util.toggleElement('attack'); 
                if (gameOver) {
                    this.displayWinner(this.players)
                    this.playAgain();
                } 
            } else {
                move(this.players, () => nextPlayer());    
            }
        }

        move(this.players, () => nextPlayer());
    }

    displayBoard(player) {
        player.displayBoard(player.name);
    }

    setUpBoards(players, startBattle) {
        let i = 0;
        const setUpBoard = (nextPlayer) => { 
            players[i].displayBoard();
            players[i].placeShips(() => nextPlayer());   
            i++;
        }
        
        const nextPlayer = () => {
            setUpBoard(() => {
                Util.toggleElement('place-ships')
                startBattle()
            });    
        }

        setUpBoard(() => nextPlayer());
    }

    toggleAxis() {
        // toggle axis text button
        let axis = document.getElementById('axis');
        if (axis.innerHTML === "Horizontal") {
            axis.innerHTML = 'Vertical';
        } else {
            axis.innerHTML = 'Horizontal';
        }
    }

    displayWinner(players) {
        if (this.players[0].lost()) {
            Util.changeInnerHtml('winner',`${players[1].name} is the winner!`);
        } else {
            Util.changeInnerHtml('winner',`${players[0].name} is the winner!`);
        }
    }

    playAgain() {
        Util.toggleElement('play-again');
    }

    restartGame(n) {
        // clear player boards
        this.players.forEach((player) => {
            player.resetBoard(n);
        })
        Util.clearInnerHtml('winner');
        Util.toggleElement('play-again');
        Util.toggleElement('place-ships')
        this.playGame();
    }
}

module.exports = Battleship;