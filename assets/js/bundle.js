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
    game.playGame();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = __webpack_require__(2);
var Util = __webpack_require__(5);

var Battleship = function () {
    function Battleship() {
        _classCallCheck(this, Battleship);

        this.players = [];
    }

    _createClass(Battleship, [{
        key: 'playGame',
        value: function playGame() {
            document.getElementsByClassName('form')[0].style = 'display:none'; // remove form 
            this.players.push(new Player('Player One'));
            this.players.push(new Player('Player Two'));
            this.setUpBoards(this.players);
        }
    }, {
        key: 'battle',
        value: function battle() {
            console.log('start battle');
        }
    }, {
        key: 'displayBoard',
        value: function displayBoard(player) {
            player.displayBoard(player.name);
        }
    }, {
        key: 'setUpBoards',
        value: function setUpBoards(players) {
            var _this = this;

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
                    _this.battle();
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
var Util = __webpack_require__(5);

var Player = function () {
    function Player(name) {
        _classCallCheck(this, Player);

        this.name = name;
        this.board = new Board();
        this.shipsSunk = 0;
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
                    if (i !== 5) {
                        // only respond to onclick if all ships placed
                        placeSingleShip(event.target.data, ships[i], function () {
                            i++;
                            if (i === 5) {
                                // if all ships are placed
                                setTimeout(function () {
                                    // set time out for UI/UX purposes
                                    Util.remove(_this.name); // remove board from DOM
                                    shipsPlaced(); // call back function
                                }, 500);
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
        key: 'won',
        value: function won() {
            if (this.board.shipsSunk === 5) {
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
                        td.classList.add('occupied');
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

/***/ }),
/* 5 */
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

exports.remove = remove;
exports.toggleElement = toggleElement;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map