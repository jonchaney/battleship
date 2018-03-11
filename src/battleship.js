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
        function firstFunction(nextPlayer){
            // do some asynchronous work
            // and when the asynchronous stuff is complete
            console.log('setUp', i)
            document.getElementById('axis').innerHTML = 'Horizontal';
            players[i].displayBoard();
            players[i].placeShips(() => nextPlayer());   
            i++;
        }
        
        function secondFunction(){
            // call first function and pass in a callback function which
            // first function runs when it has completed
            console.log('done')
            firstFunction(function() {
                console.log('huzzah, I\'m done!');
            });    
        }

        firstFunction(() => secondFunction());
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