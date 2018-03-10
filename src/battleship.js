const Player = require('./player.js');

class Battleship {
    constructor() {
        this.players = [];
    }
    
    playGame(e) {
        e.preventDefault();
        this.players = [new Player(e.target[0].value), new Player(e.target[1].value)]; // create players
        document.getElementsByClassName('form')[0].style = 'display:none';  // remove form
        this.setUpBoards();
    }

    playGameTest() {
        document.getElementsByClassName('form')[0].style = 'display:none'; // remove form 
        this.players.push(new Player('Philip'));
        this.players.push(new Player('Jessica'));
        
        this.setUpBoards();
    }
    
    displayBoard(player) {
        player.displayBoard(player.name);
    }

    setUpBoards() {
        let i = 0;
        let players = this.players;
        document.getElementById('axis').innerHTML = 'Horizontal';
        let loopPlayers = (players) => {
            players[i].displayBoard();
            document.getElementById('message').innerHTML = `${players[i].name} place your&nbsp;`
        
            arrangeBoard(players[i], () => {
                console.log('arrange cb')
                if (i >= players.length) { 
                    console.log('done');
                }
                i++;
            });
        }
    
        function arrangeBoard(player, nextPlayer) {
            player.placeShips();
            if (player.board.shipsPlaced === 4) {
                nextPlayer();
            }
        }

        loopPlayers(players);   
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