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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var remove = function remove(id) {
    var element = document.getElementById("" + id);
    element.parentNode.removeChild(element);
};

var toggleElement = function toggleElement(id) {
    var element = document.getElementById("" + id);
    if (element.style.display === "none") {
        element.style.display = "";
    } else {
        element.style.display = 'none';
    }
};

var compareArray = function compareArray(arrayA, arrayB) {
    if (arrayA.join() === arrayB.join()) {
        return true;
    } else {
        return false;
    }
};

var changeInnerHtml = function changeInnerHtml(id, str) {
    document.getElementById("" + id).innerHTML = "" + str;
};

exports.remove = remove;
exports.toggleElement = toggleElement;
exports.compareArray = compareArray;
exports.changeInnerHtml = changeInnerHtml;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Battleship = __webpack_require__(2);

document.addEventListener('DOMContentLoaded', function () {
    window.game = new Battleship();
    game.playGame();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = __webpack_require__(3);
var Util = __webpack_require__(0);

var Battleship = function () {
    function Battleship() {
        _classCallCheck(this, Battleship);

        this.players = [new Player('Player One'), new Player('Player Two')];
    }

    _createClass(Battleship, [{
        key: 'playGame',
        value: function playGame() {
            var _this = this;

            this.setUpBoards(this.players, function () {
                return _this.battle();
            });
        }
    }, {
        key: 'battle',
        value: function battle() {
            var _this2 = this;

            var i = 0;
            var j = 1;
            var move = function move(players, nextPlayer) {
                var player = players[i % 2];
                var opposingPlayer = players[j % 2];
                player.makeMove(opposingPlayer, nextPlayer);
                i++;
                j++;
            };

            var nextPlayer = function nextPlayer() {
                var gameOver = _this2.players[0].lost() || _this2.players[1].lost();
                if (gameOver) {
                    if (_this2.players[0].lost()) {
                        _this2.displayWinner(_this2.players[0]);
                    } else {
                        _this2.displayWinner(_this2.players[1]);
                    }
                    Util.remove('attack');
                } else {
                    move(_this2.players, function () {
                        return nextPlayer();
                    });
                }
            };

            move(this.players, function () {
                return nextPlayer();
            });
        }
    }, {
        key: 'displayBoard',
        value: function displayBoard(player) {
            player.displayBoard(player.name);
        }
    }, {
        key: 'setUpBoards',
        value: function setUpBoards(players, startBattle) {
            var i = 0;
            var setUpBoard = function setUpBoard(nextPlayer) {
                players[i].displayBoard();
                players[i].placeShips(function () {
                    return nextPlayer();
                });
                i++;
            };

            var nextPlayer = function nextPlayer() {
                setUpBoard(function () {
                    Util.toggleElement('place-ships');
                    startBattle();
                });
            };

            setUpBoard(function () {
                return nextPlayer();
            });
        }
    }, {
        key: 'toggleAxis',
        value: function toggleAxis() {
            var axis = document.getElementById('axis');
            if (axis.innerHTML === "Horizontal") {
                axis.innerHTML = 'Vertical';
            } else {
                axis.innerHTML = 'Horizontal';
            }
        }
    }, {
        key: 'displayWinner',
        value: function displayWinner(player) {
            Util.changeInnerHtml('winner', player.name + ' is the winner!');
        }
    }]);

    return Battleship;
}();

module.exports = Battleship;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = __webpack_require__(4);
var Util = __webpack_require__(0);

var Player = function () {
    function Player(name) {
        _classCallCheck(this, Player);

        this.name = name;
        this.board = new Board();
    }

    _createClass(Player, [{
        key: 'placeShips',
        value: function placeShips(shipsPlaced) {
            var _this = this;

            var i = 0;
            var ships = this.board.ships;
            document.getElementById('message').innerHTML = this.name + ' place your&nbsp;'; // tell player which ship to place
            var loopShips = function loopShips(ships) {
                ships[i].shipInfo(); // display ship information
                document.getElementById('' + _this.name).addEventListener('click', function (event) {
                    if (i !== _this.board.ships.length) {
                        // only respond to onclick if all ships placed
                        placeSingleShip(event.target.data, ships[i], function () {
                            i++;
                            if (i === _this.board.ships.length) {
                                // if all ships are placed
                                setTimeout(function () {
                                    // set time out for UI/UX purposes
                                    Util.remove(_this.name); // remove board from DOM
                                    _this.board.gameStarted = true;
                                    shipsPlaced(); // call back function
                                }, 1000);
                            } else {
                                document.getElementById('ship').innerHTML = ships[i].type + ' (length ' + ships[i].length + ')';
                            }
                        });
                    }
                });
            };

            var placeSingleShip = function placeSingleShip(coordinates, ship, nextShip) {
                var axis = document.getElementById('axis').innerHTML;
                if (_this.board.validPosition(coordinates, ship, axis)) {
                    _this.board.placeShip(coordinates, ship, axis);
                    _this.board.updateBoard(_this.name);
                } else {
                    _this.board.errors('invalid position');
                }
                if (ship.length === ship.coordinates.length) {
                    nextShip();
                }
            };
            loopShips(ships);
        }
    }, {
        key: 'makeMove',
        value: function makeMove(opposingPlayer, callback) {
            opposingPlayer.displayBoard();
            document.getElementById('attack').innerHTML = this.name + ' make your move, attack!'; // tell player to attack
            var move = function move(opposingPlayer) {
                document.getElementById('' + opposingPlayer.name).addEventListener('click', function (event) {
                    var board = opposingPlayer.board;
                    var coordinate = event.target.data;

                    takeShot(coordinate, board, function () {
                        callback();
                    });
                });
                var takeShot = function takeShot(coordinate, board, nextPlayer) {
                    if (board.fire(coordinate)) {
                        Util.remove('' + opposingPlayer.name);
                        board.display(opposingPlayer.name);
                        setTimeout(function () {
                            board.attackInfo("");
                            Util.remove('' + opposingPlayer.name);
                            nextPlayer();
                        }, 1000);
                    }
                };
            };
            move(opposingPlayer);
        }
    }, {
        key: 'lost',
        value: function lost() {
            if (this.board.shipsSunk === this.board.ships.length) {
                return true;
            } else {
                return false;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ship = __webpack_require__(5);
var Util = __webpack_require__(0);

var Board = function () {
    function Board() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

        _classCallCheck(this, Board);

        this.grid = this.generateBoard(n);
        this.ships = [new Ship('Battleship', 4), new Ship('Cruiser', 3), new Ship('Carrier', 5), new Ship('Submarine', 3), new Ship('Destroyer', 2)];
        this.gameStarted = false;
        this.shipsSunk = 0;
    }

    _createClass(Board, [{
        key: 'display',
        value: function display(name) {
            var _this = this;

            var tables = document.getElementById('tables'); // get container
            var table = document.getElementById('' + name);
            if (!table) {
                // if it does not exist create a new one
                table = document.createElement('table');;
            }
            var tr = void 0; // row
            var td = void 0; // column

            // time complecity to render board to DOM is O(n^2)
            this.grid.forEach(function (row, i) {
                tr = document.createElement('tr');
                row.forEach(function (col, j) {
                    td = document.createElement('td');
                    td.data = [i, j];
                    if (_this.grid[i][j] === 1 && !_this.gameStarted) {
                        // only show where ships are placed if 
                        td.classList.add('occupied'); // game has not started
                    } else if (_this.grid[i][j] === 'o') {
                        td.classList.add('missed');
                    } else if (_this.grid[i][j] === 'x') {
                        td.classList.add('hit');
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
        value: function updateBoard(name) {
            var table = document.getElementById('' + name);
            // remove all the chldren (rows) and update board
            // removing all children is O(n)
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }
            this.display(name);
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
            this.clearErrors(); // clear errors
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
                while (ship.coordinates.length < ship.length) {
                    ship.coordinates.push([startPos[0], startPos[1] + i]); // add location data to ship
                    this.grid[startPos[0]][startPos[1] + i] = 1; // update grid
                    i++;
                }
            } else {
                // vertical placement
                while (ship.coordinates.length < ship.length) {
                    ship.coordinates.push([startPos[0] + i, startPos[1]]);
                    this.grid[startPos[0] + i][startPos[1]] = 1;
                    i++;
                }
            }
        }
    }, {
        key: 'fire',
        value: function fire(coordinate) {
            this.clearErrors();
            var location = this.grid[coordinate[0]][coordinate[1]]; // get grid data
            var position = { miss: 0, hit: 1 };
            switch (location) {
                case position.miss:
                    this.grid[coordinate[0]][coordinate[1]] = 'o';
                    this.attackInfo('you missed!');
                    return true;
                case position.hit:
                    this.grid[coordinate[0]][coordinate[1]] = 'x';
                    this.attackInfo('nice shot!');
                    this.checkShips(coordinate);
                    return true;
                default:
                    this.errors('you already fired there!');
                    return false;
            }
        }
    }, {
        key: 'checkShips',
        value: function checkShips(coordinate) {
            var _this2 = this;

            // checking the coordinates of each ship to see which ship was hit and if it was sunk
            // time complexity O(nk)
            // n = number of ships 
            // k = length of longest ship
            this.ships.forEach(function (ship) {
                ship.coordinates.forEach(function (location) {
                    if (Util.compareArray(coordinate, location)) {
                        ship.count++;
                        if (ship.isSunk()) {
                            _this2.attackInfo('You sunk their ' + ship.type + '!');
                            _this2.shipsSunk += 1;
                        }
                    }
                });
            });
        }
    }, {
        key: 'attackInfo',
        value: function attackInfo(msg) {
            Util.changeInnerHtml('attack-info', msg);
        }
    }, {
        key: 'errors',
        value: function errors(error) {
            Util.changeInnerHtml('errors', error);
        }
    }, {
        key: 'clearErrors',
        value: function clearErrors() {
            Util.changeInnerHtml('errors', "");
        }
    }]);

    return Board;
}();

module.exports = Board;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ship = function () {
    function Ship(type, length) {
        _classCallCheck(this, Ship);

        this.length = length;
        this.count = 0;
        this.type = type;
        this.coordinates = [];
    }

    _createClass(Ship, [{
        key: 'isSunk',
        value: function isSunk() {
            if (this.count === this.length) {
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