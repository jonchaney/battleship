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
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token, expected ; (27:73)\n\n\u001b[0m \u001b[90m 25 | \u001b[39m\u001b[32m                            }, 500);\u001b[39m\n \u001b[90m 26 | \u001b[39m\u001b[32m                        } else { \u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 27 | \u001b[39m\u001b[32m                            document.getElementById('ship').innerHTML = `\u001b[39m${ships[i]\u001b[33m.\u001b[39mtype} (length ${ships[i]\u001b[33m.\u001b[39mlength})\u001b[32m` \u001b[39m\n \u001b[90m    | \u001b[39m                                                                         \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 28 | \u001b[39m\u001b[32m                        } \u001b[39m\n \u001b[90m 29 | \u001b[39m\u001b[32m                    });\u001b[39m\n \u001b[90m 30 | \u001b[39m\u001b[32m                }\u001b[39m\u001b[0m\n");

/***/ }),
/* 3 */,
/* 4 */,
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