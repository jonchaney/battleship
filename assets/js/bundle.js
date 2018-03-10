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

        this.playerOne;
        this.playerTwo;
    }

    _createClass(Battleship, [{
        key: 'playGame',
        value: function playGame(e) {
            e.preventDefault();
            this.playerOne = new Player(e.target[0].value); // create players
            this.playerTwo = new Player(e.target[1].value);
            document.getElementsByClassName('form')[0].style = 'display:none'; // remove form
            this.displayBoards();
        }
    }, {
        key: 'playGameTest',
        value: function playGameTest() {
            this.playerOne = new Player('Philip');
            this.playerTwo = new Player('Harold');

            document.getElementsByClassName('form')[0].style = 'display:none'; // remove form 

            var play = this.playerOne.won() || this.playerTwo.won();

            this.displayBoard(this.playerOne);
            // place ships
            this.placeShips(this.playerOne);
        }
    }, {
        key: 'setUpPlayerBoards',
        value: function setUpPlayerBoards(players) {}
    }, {
        key: 'displayBoard',
        value: function displayBoard(player) {
            player.displayBoard(player.name);
        }
    }, {
        key: 'placeShips',
        value: function placeShips(player) {
            document.getElementById('message').innerHTML = player.name + ' place your';
            player.placeShips();
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

var Board = __webpack_require__(4);

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
                document.getElementById('ship').innerHTML = ships[i].type + ' (length ' + ships[i].length + ')';
                document.getElementById('tables').addEventListener('click', function (event) {
                    placeSingleShip(event.target.data, ships[i], _this.board, function () {
                        if (i < ships.length - 1) {
                            document.getElementById('ship').innerHTML = ships[i + 1].type + ' (length ' + ships[i + 1].length + ')';
                        }
                        i++;
                    });
                });
            };

            function placeSingleShip(coordinates, ship, board, nextShip) {
                var axis = document.getElementById('axis').innerHTML;
                if (board.validPosition(coordinates, ship, axis)) {
                    board.placeShip(coordinates, ship, axis);
                    board.renderBoard();
                } else {
                    console.log('invalid position');
                }
                if (ship.length === ship.coordinates.length) {
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
        value: function displayBoard(name) {
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

var Ship = function () {
    function Ship(type, length) {
        _classCallCheck(this, Ship);

        this.length = length;
        this.count = length;
        this.type = type;
        this.coordinates = [];
    }

    _createClass(Ship, [{
        key: "isSunk",
        value: function isSunk() {
            if (this.count === 0) {
                return true;
            }
        }
    }]);

    return Ship;
}();

module.exports = Ship;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ship = __webpack_require__(3);

var Board = function () {
    function Board() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

        _classCallCheck(this, Board);

        this.grid = this.generateBoard(n);
        this.ships = [new Ship('Battleship', 4), new Ship('Cruiser', 3), new Ship('Carrier', 5), new Ship('Submarine', 3), new Ship('Destroyer', 2)];
        this.gameStarted = false;
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
                    }
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            table.setAttribute('id', '' + name);
            tables.appendChild(table);
            console.log(this.grid);
        }
    }, {
        key: 'renderBoard',
        value: function renderBoard() {
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
            var i = 0;
            if (axis === 'Horizontal') {
                // check for overlapping ship
                while (i < ship.length) {
                    if (this.grid[coordinates[0]][coordinates[1] + i] === 1) {
                        return false;
                    };
                    i++;
                }
                // check if out of bounds
                if (coordinates[1] + ship.length > this.grid[0].length) {
                    return false;
                }
            } else {
                // check if out of bounds
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
            ship.coordinates.push(startPos);
            this.grid[startPos[0]][startPos[1]] = 1;

            var i = 1;
            if (axis === 'Horizontal') {
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
    }]);

    return Board;
}();

module.exports = Board;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map