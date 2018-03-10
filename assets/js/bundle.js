/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Battleship = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', function () {

    window.game = new Battleship();
    game.playGameTest();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = __webpack_require__(2);

var Battleship = function () {
    function Battleship() {
        _classCallCheck(this, Battleship);

        this.players = [];
    }

    _createClass(Battleship, [{
        key: 'playGame',
        value: function playGame(e) {
            e.preventDefault();
            this.players = [new Player(e.target[0].value), new Player(e.target[1].value)]; // create players
            document.getElementsByClassName('form')[0].style = 'display:none'; // remove form
            this.setUpBoards();
        }
    }, {
        key: 'playGameTest',
        value: function playGameTest() {
            document.getElementsByClassName('form')[0].style = 'display:none'; // remove form 
            this.players.push(new Player('Philip'));
            this.players.push(new Player('Jessica'));

            this.setUpBoards();
        }
    }, {
        key: 'displayBoard',
        value: function displayBoard(player) {
            player.displayBoard(player.name);
        }
    }, {
        key: 'setUpBoards',
        value: function setUpBoards() {
            var i = 0;
            var players = this.players;
            document.getElementById('axis').innerHTML = 'Horizontal';
            var loopPlayers = function loopPlayers(players) {
                players[i].displayBoard();
                document.getElementById('message').innerHTML = players[i].name + ' place your&nbsp;';

                arrangeBoard(players[i], function () {
                    console.log('arrange cb');
                    if (i >= players.length) {
                        console.log('done');
                    }
                    i++;
                });
            };

            function arrangeBoard(player, nextPlayer) {
                player.placeShips();
                if (player.board.shipsPlaced === 4) {
                    nextPlayer();
                }
            }

            loopPlayers(players);
        }
    }, {
        key: 'getCoordinates',
        value: function getCoordinates(e) {
            console.log(e.target.data);
        }
    }, {
        key: 'setAxis',
        value: function setAxis() {
            var axis = document.getElementById('axis');
            if (axis.innerHTML === "Horizontal") {
                axis.innerHTML = 'Vertical';
            } else {
                axis.innerHTML = 'Horizontal';
            }
        }
    }]);

    return Battleship;
}();

module.exports = Battleship;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = __webpack_require__(3);

var Player = function () {
    function Player(name) {
        _classCallCheck(this, Player);

        this.name = name;
        this.board = new Board();
        this.shipsSunk = 0;
    }

    _createClass(Player, [{
        key: 'placeShips',
        value: function placeShips() {
            var _this = this;

            var i = 0;
            var ships = this.board.ships;
            var loopShips = function loopShips(ships) {
                if (_this.board.shipsPlaced === _this.board.ships.length - 1) {
                    console.log('line 15');
                    return;
                }
                ships[i].shipInfo(); // display ship information
                document.getElementById('tables').addEventListener('click', function (event) {
                    placeSingleShip(event.target.data, ships[i], _this.board, function () {
                        i++;
                        _this.board.shipsPlaced = i;
                        if (_this.board.shipsPlaced === 5) {
                            return;
                        } else if (i < ships.length) {
                            document.getElementById('ship').innerHTML = ships[i].type + ' (length ' + ships[i].length + ')';
                        }
                        console.log(i);
                    });
                });
            };

            function placeSingleShip(coordinates, ship, board, nextShip) {
                var axis = document.getElementById('axis').innerHTML;
                if (board.validPosition(coordinates, ship, axis)) {
                    board.placeShip(coordinates, ship, axis);
                    board.updateBoard();
                } else {
                    board.errors('invalid position');
                }
                if (board.shipsPlaced === board.ships.length - 1) {

                    return;
                } else if (ship.length === ship.coordinates.length) {
                    nextShip();
                }
            }
            loopShips(ships);
        }
    }, {
        key: 'makeMove',
        value: function makeMove() {}
    }, {
        key: 'won',
        value: function won() {
            if (this.board.ships.count === 5) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'displayBoard',
        value: function displayBoard() {
            this.board.display(this.name);
        }
    }]);

    return Player;
}();

module.exports = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ship = __webpack_require__(4);

var Board = function () {
    function Board() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

        _classCallCheck(this, Board);

        this.grid = this.generateBoard(n);
        this.ships = [new Ship('Battleship', 4), new Ship('Cruiser', 3), new Ship('Carrier', 5), new Ship('Submarine', 3), new Ship('Destroyer', 2)];
        this.gameStarted = false;
        this.shipsPlaced = 0;
    }

    _createClass(Board, [{
        key: 'display',
        value: function display(name) {
            var _this = this;

            var tables = document.getElementById('tables');
            var table = document.createElement('table');
            var tr = void 0; // row
            var td = void 0; // column

            // time complecity to render board to DOM is O(n^2)
            this.grid.forEach(function (row, i) {
                tr = document.createElement('tr');
                row.forEach(function (col, j) {
                    td = document.createElement('td');
                    td.data = [i, j];

                    if (_this.grid[i][j] === 1 && !_this.gameStarted) {
                        td.classList.add('occupied');
                        // td.innerHTML = '🚢';
                    }
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            table.setAttribute('id', '' + name);
            tables.appendChild(table);
        }
    }, {
        key: 'updateBoard',
        value: function updateBoard() {
            var tables = document.getElementById('tables');
            tables.removeChild(tables.firstChild);
            this.display();
        }

        // time complexity to generate board is O(n^2)

    }, {
        key: 'generateBoard',
        value: function generateBoard(n) {
            var row = [];
            var grid = [];
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    row.push(0);
                }
                grid.push(row);
                row = [];
            }
            return grid;
        }
    }, {
        key: 'validPosition',
        value: function validPosition(coordinates, ship, axis) {
            this.clearErrors(); // clear errors if any
            var i = 0;
            if (axis === 'Horizontal') {
                // check for overlapping ship
                while (i < ship.length) {
                    if (this.grid[coordinates[0]][coordinates[1] + i] === 1) {
                        return false;
                    };
                    i++;
                }
                if (coordinates[1] + ship.length > this.grid[0].length) {
                    // check if out of bounds
                    return false;
                }
            } else {
                // check if valid position for vertical placement
                if (coordinates[0] + ship.length > this.grid.length) {
                    return false;
                } else {
                    while (i < ship.length) {
                        if (this.grid[coordinates[0] + i][coordinates[1]] === 1) {
                            return false;
                        }
                        i++;
                    }
                }
            }
            return true;
        }
    }, {
        key: 'placeShip',
        value: function placeShip(startPos, ship, axis) {
            this.grid[startPos[0]][startPos[1]] = 1; // add location data to grid

            var i = 0;
            if (axis === 'Horizontal') {
                // add location data to ship
                while (ship.coordinates.length < ship.length) {
                    ship.coordinates.push([startPos[0], startPos[1] + i]);
                    this.grid[startPos[0]][startPos[1] + i] = 1;
                    i++;
                }
            } else {
                while (ship.coordinates.length < ship.length) {
                    ship.coordinates.push([startPos[0] + i, startPos[1]]);
                    this.grid[startPos[0] + i][startPos[1]] = 1;
                    i++;
                }
            }
        }
    }, {
        key: 'errors',
        value: function errors(error) {
            document.getElementById('errors').innerHTML = '' + error;
        }
    }, {
        key: 'clearErrors',
        value: function clearErrors() {
            document.getElementById('errors').innerHTML = '';
        }
    }]);

    return Board;
}();

module.exports = Board;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ship = function () {
    function Ship(type, length) {
        _classCallCheck(this, Ship);

        this.length = length;
        this.count = length;
        this.type = type;
        this.coordinates = [];
    }

    _createClass(Ship, [{
        key: 'isSunk',
        value: function isSunk() {
            if (this.count === 0) {
                return true;
            }
        }
    }, {
        key: 'shipInfo',
        value: function shipInfo() {
            document.getElementById('ship').innerHTML = this.type + ' (length ' + this.length + ')';
        }
    }]);

    return Ship;
}();

module.exports = Ship;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map