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
        
        this.setUpBoards(this.players);
    }
    
    displayBoard(player) {
        player.displayBoard(player.name);
    }

    setUpBoards(players) {
        let i = 0;
        function setUpBoard(nextPlayer){
            document.getElementById('axis').innerHTML = 'Horizontal';
            players[i].displayBoard();
            players[i].placeShips(() => nextPlayer());   
            i++;
        }
        
        function nextPlayer(){
            setUpBoard(() => {
                console.log('boards set up')
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