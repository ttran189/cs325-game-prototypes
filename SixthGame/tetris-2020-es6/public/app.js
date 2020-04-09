(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("classes/Board.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

var _CONSTANT = require("../data/CONSTANT");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Board = /*#__PURE__*/function (_Phaser$GameObjects$G) {
  _inherits(Board, _Phaser$GameObjects$G);

  function Board(scene, options) {
    var _this;

    _classCallCheck(this, Board);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Board).call(this, scene, options));

    _this.setDefaultStyles({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 0.3
      },
      fillStyle: {
        color: 0xcccccc,
        alpha: 1
      }
    });

    _this.boardData = _CONSTANT.CONSTANT.gameBoard.BOARD_DATA;

    _this.draw();

    return _this;
  }

  _createClass(Board, [{
    key: "fix",
    value: function fix(brick) {
      for (var i = 0; i < brick.dotArray.length; i++) {
        var dot = brick.dotArray[i];
        var y = dot.column;
        var x = dot.row;
        this.mark(x, y, dot.color);
      } //this.showData();

    }
  }, {
    key: "reset",
    value: function reset() {
      this.boardData = _CONSTANT.CONSTANT.gameBoard.BOARD_DATA;
    }
  }, {
    key: "mark",
    value: function mark(x, y, color) {
      this.boardData[x][y] = color;
    }
  }, {
    key: "showData",
    value: function showData() {
      console.table(this.boardData);
    }
  }, {
    key: "toPositionX",
    value: function toPositionX(column) {
      return (column + _CONSTANT.CONSTANT.gameBoard.OFFSET_COL) * _CONSTANT.CONSTANT.gameBoard.CELL_SIZE;
    }
  }, {
    key: "toPositionY",
    value: function toPositionY(row) {
      return (row + _CONSTANT.CONSTANT.gameBoard.OFFSET_ROW) * _CONSTANT.CONSTANT.gameBoard.CELL_SIZE;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(x, y) {
      return this.boardData[x][y] === null;
    }
  }, {
    key: "checkToClear",
    value: function checkToClear(gameData) {
      var completedRows = [];

      for (var i = _CONSTANT.CONSTANT.gameBoard.NUM_ROWS - 1; i >= 6; i--) {
        var counter = 0;

        for (var j = 0; j < _CONSTANT.CONSTANT.gameBoard.NUM_COLS; j++) {
          if (this.boardData[i][j] !== null) counter++;
        }

        if (counter === _CONSTANT.CONSTANT.gameBoard.NUM_COLS) {
          completedRows.push(i);
        }
      }

      var finishedCnt = completedRows.length;

      while (completedRows.length !== 0) {
        var row = completedRows.pop();

        for (var _j = 0; _j < _CONSTANT.CONSTANT.gameBoard.NUM_COLS; _j++) {
          this.boardData[row][_j] = null;
        }

        this.bringDown(row);
      }

      return finishedCnt;
    }
  }, {
    key: "bringDown",
    value: function bringDown(fromRow) {
      for (var i = fromRow; i >= 6; i--) {
        for (var j = 0; j < _CONSTANT.CONSTANT.gameBoard.NUM_COLS; j++) {
          this.boardData[i][j] = this.boardData[i - 1][j];
        }
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clear();

      for (var row = 0; row < this.boardData.length; row++) {
        for (var column = 0; column < this.boardData[0].length; column++) {
          var x = this.toPositionX(column);
          var y = this.toPositionY(row);
          var rect = new Phaser.Geom.Rectangle(x, y, _CONSTANT.CONSTANT.gameBoard.CELL_SIZE, _CONSTANT.CONSTANT.gameBoard.CELL_SIZE);

          if (this.boardData[row][column] === null) {//this.strokeRectShape(rect);
          } else {
            //this.lineStyle(1, 0x000000, 0);
            this.fillStyle(this.boardData[row][column]);
            this.fillRectShape(rect);
          }
        }
      }
    }
  }]);

  return Board;
}(Phaser.GameObjects.Graphics);

exports.Board = Board;
});

;require.register("classes/Brick.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brick = void 0;

var _CONSTANT = require("../data/CONSTANT");

var _Dot = require("./Dot");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Brick = /*#__PURE__*/function (_Phaser$GameObjects$G) {
  _inherits(Brick, _Phaser$GameObjects$G);

  function Brick(scene, options, board, shapeIndex) {
    var _this;

    _classCallCheck(this, Brick);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Brick).call(this, scene, options));
    _this.board = board;
    _this.dotArray = [];
    _this.rotationIndex = 0;
    _this.playedSound = false;

    _this.setCoordinate();

    _this.setDefaultStyles({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 0.3
      },
      fillStyle: {
        color: 0xcccccc,
        alpha: 1
      }
    });

    _this.shapeIndex = shapeIndex;
    _this.shape = _CONSTANT.CONSTANT.gameBoard.BRICK_SHAPES[_this.shapeIndex]; // color here

    _this.draw();

    return _this;
  }

  _createClass(Brick, [{
    key: "getColor",
    value: function getColor() {
      switch (this.shapeIndex) {
        case 0:
          return 0xCF3616;

        case 1:
          return 0xBDC007;

        case 2:
          return 0x169907;

        case 3:
          return 0x07996F;

        case 4:
          return 0x076F99;

        case 5:
          return 0x410799;

        case 6:
          return 0x99078A;
      }
    }
  }, {
    key: "setCoordinate",
    value: function setCoordinate() {
      this.row = 0;
      this.column = _CONSTANT.CONSTANT.gameBoard.OFFSET_MIDDLE;
    }
  }, {
    key: "showData",
    value: function showData() {
      console.log("row: " + this.row + " col: " + this.column);
    }
  }, {
    key: "clearSet",
    value: function clearSet() {
      while (this.dotArray.length !== 0) {
        var d = this.dotArray.pop();
        d.clear();
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clearSet();
      this.grid = this.shape.grids[this.rotationIndex];

      for (var row = 0; row < this.grid.length; row++) {
        for (var column = 0; column < this.grid[0].length; column++) {
          if (this.grid[row][column] === "x") {
            var x = this.row + row;
            var y = this.column + column;
            this.dotArray.push(new _Dot.Dot(this.scene, {}, x, y, this.board, this.getColor()));
          }
        }
      }
    }
    /**
     * #####################################
     * Action
     * #####################################
     */

    /**
     * Rotation
     * ---------------------
     */

  }, {
    key: "canRotate",
    value: function canRotate(tmpRotateID) {
      if (tmpRotateID === -1) tmpRotateID = 3;else if (tmpRotateID === 4) tmpRotateID = 0;
      var tmpGrid = this.shape.grids[tmpRotateID];

      for (var row = 0; row < tmpGrid.length; row++) {
        for (var column = 0; column < tmpGrid[0].length; column++) {
          if (tmpGrid[row][column] === "x") {
            var y = this.row + row;
            var x = this.column + column;

            if (x < 0 || x > _CONSTANT.CONSTANT.gameBoard.NUM_COLS - 1) {
              console.log("Cannot rotate > invalid x: " + x); //console.table(tmpGrid);

              return false;
            }

            if (y > _CONSTANT.CONSTANT.gameBoard.NUM_ROWS - 1) {
              console.log("Cannot rotate > invalid y: " + y); //console.table(tmpGrid);

              return false;
            }

            if (!this.board.isEmpty(y, x)) {
              console.log("Cannot rotate > occupied x: " + x + " y: " + y); //console.table(tmpGrid);

              return false;
            }
          }
        }
      }

      return true;
    }
  }, {
    key: "changeUp",
    value: function changeUp() {
      if (this.canRotate(this.rotationIndex - 1)) {
        this.scene.sound.play("sound-move");
        this.rotationIndex--;
        if (this.rotationIndex === -1) this.rotationIndex = 3;
        this.draw();
      }
    }
  }, {
    key: "changeDown",
    value: function changeDown() {
      if (this.canRotate(this.rotationIndex + 1)) {
        this.scene.sound.play("sound-move");
        this.rotationIndex++;
        if (this.rotationIndex === 4) this.rotationIndex = 0;
        this.draw();
      }
    }
    /**
     * Left
     * ---------------------
     */

  }, {
    key: "canMoveLeft",
    value: function canMoveLeft() {
      var flag = true;

      for (var i = 0; i < this.dotArray.length; i++) {
        if (!this.dotArray[i].canMoveLeft()) {
          flag = false;
          break;
        }
      }

      return flag;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      if (this.canMoveLeft()) {
        this.scene.sound.play("sound-move");

        for (var i = 0; i < this.dotArray.length; i++) {
          this.dotArray[i].moveLeft();
        }

        this.column--;
      }
    }
    /**
     * Right
     * ---------------------
     */

  }, {
    key: "canMoveRight",
    value: function canMoveRight() {
      var flag = true;

      for (var i = 0; i < this.dotArray.length; i++) {
        if (!this.dotArray[i].canMoveRight()) {
          flag = false;
          break;
        }
      }

      return flag;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      if (this.canMoveRight()) {
        this.scene.sound.play("sound-move");

        for (var i = 0; i < this.dotArray.length; i++) {
          this.dotArray[i].moveRight();
        }

        this.column++;
      }
    }
    /**
     * Fall
     * ---------------------
     */

  }, {
    key: "canFall",
    value: function canFall() {
      var flag = true;

      for (var i = 0; i < this.dotArray.length; i++) {
        if (!this.dotArray[i].canFall()) {
          flag = false;
          break;
        }
      }

      return flag;
    }
  }, {
    key: "fall",
    value: function fall() {
      if (this.canFall()) {
        for (var i = 0; i < this.dotArray.length; i++) {
          this.dotArray[i].fall();
        }

        this.row++;

        if (this.scene.keyDown.isDown) {
          this.scene.sound.play('sound-swap');
          this.scene.gameData.sPoint++;
        }

        return true;
      }

      return false;
    }
  }, {
    key: "goDown",
    value: function goDown() {
      var cnt = 0;

      while (this.canFall()) {
        this.fall();
        cnt++;
      }

      this.scene.gameData.sPoint += _CONSTANT.CONSTANT.gameBoard.SCORE_PER_GO_DOWN * cnt;
    }
  }]);

  return Brick;
}(Phaser.GameObjects.Graphics);

exports.Brick = Brick;
});

;require.register("classes/Dot.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dot = void 0;

var _CONSTANT = require("../data/CONSTANT");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Dot = /*#__PURE__*/function (_Phaser$GameObjects$G) {
  _inherits(Dot, _Phaser$GameObjects$G);

  function Dot(scene, options, row, column, board, color) {
    var _this;

    _classCallCheck(this, Dot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dot).call(this, scene, options));
    _this.board = board;
    _this.color = color;

    _this.setCoordinate(row, column);

    _this.draw();

    return _this;
  }

  _createClass(Dot, [{
    key: "setCoordinate",
    value: function setCoordinate(row, column) {
      this.row = row;
      this.column = column;
      this.draw();
    }
  }, {
    key: "showData",
    value: function showData() {
      console.log("row: " + this.row + " col: " + this.column);
    }
  }, {
    key: "toPositionX",
    value: function toPositionX(column) {
      return (column + _CONSTANT.CONSTANT.gameBoard.OFFSET_COL) * _CONSTANT.CONSTANT.gameBoard.CELL_SIZE;
    }
  }, {
    key: "toPositionY",
    value: function toPositionY(row) {
      return (row + _CONSTANT.CONSTANT.gameBoard.OFFSET_ROW) * _CONSTANT.CONSTANT.gameBoard.CELL_SIZE;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clear();
      var x = this.toPositionX(this.column);
      var y = this.toPositionY(this.row);
      var rect = new Phaser.Geom.Rectangle(x, y, _CONSTANT.CONSTANT.gameBoard.CELL_SIZE, _CONSTANT.CONSTANT.gameBoard.CELL_SIZE);
      this.fillStyle(this.color);
      this.fillRectShape(rect);
      this.scene.add.existing(this);
    }
    /**
     * #####################################
     * Action
     * #####################################
     */

    /**
     * Left
     * ---------------------
     */

  }, {
    key: "didHitLeft",
    value: function didHitLeft() {
      return this.column === 0;
    }
  }, {
    key: "canMoveLeft",
    value: function canMoveLeft() {
      if (this.didHitLeft()) return false;
      return this.board.isEmpty(this.row, this.column - 1);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.column--;
      this.draw();
    }
    /**
     * Right
     * ---------------------
     */

  }, {
    key: "didHitRight",
    value: function didHitRight() {
      return this.column === _CONSTANT.CONSTANT.gameBoard.NUM_COLS - 1;
    }
  }, {
    key: "canMoveRight",
    value: function canMoveRight() {
      if (this.didHitRight()) return false;
      return this.board.isEmpty(this.row, this.column + 1);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.column++;
      this.draw();
    }
    /**
     * Fall
     * ---------------------
     */

  }, {
    key: "didHitBottom",
    value: function didHitBottom() {
      return this.row === _CONSTANT.CONSTANT.gameBoard.NUM_ROWS - 1;
    }
  }, {
    key: "canFall",
    value: function canFall() {
      if (this.didHitBottom()) return false;
      return this.board.isEmpty(this.row + 1, this.column);
    }
  }, {
    key: "fall",
    value: function fall() {
      this.row++;
      this.draw();
    }
  }]);

  return Dot;
}(Phaser.GameObjects.Graphics);

exports.Dot = Dot;
});

;require.register("classes/GridBoard.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridBoard = void 0;

var _CONSTANT = require("../data/CONSTANT");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GridBoard = /*#__PURE__*/function (_Phaser$GameObjects$G) {
  _inherits(GridBoard, _Phaser$GameObjects$G);

  function GridBoard(scene, options) {
    var _this;

    _classCallCheck(this, GridBoard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GridBoard).call(this, scene, options));

    _this.setDefaultStyles({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 0.2
      },
      fillStyle: {
        color: 0x6C6C6C,
        alpha: 1
      }
    });

    _this.boardData = _CONSTANT.CONSTANT.gameBoard.BOARD_DATA;

    _this.draw();

    return _this;
  }

  _createClass(GridBoard, [{
    key: "toPositionX",
    value: function toPositionX(column) {
      return (column + _CONSTANT.CONSTANT.gameBoard.OFFSET_COL) * _CONSTANT.CONSTANT.gameBoard.CELL_SIZE;
    }
  }, {
    key: "toPositionY",
    value: function toPositionY(row) {
      return (row + _CONSTANT.CONSTANT.gameBoard.OFFSET_ROW) * _CONSTANT.CONSTANT.gameBoard.CELL_SIZE;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clear();

      for (var row = 0; row < this.boardData.length; row++) {
        for (var column = 0; column < this.boardData[0].length; column++) {
          var x = this.toPositionX(column);
          var y = this.toPositionY(row);
          var rect = new Phaser.Geom.Rectangle(x, y, _CONSTANT.CONSTANT.gameBoard.CELL_SIZE, _CONSTANT.CONSTANT.gameBoard.CELL_SIZE);
          this.depth = 10;

          if (x < 20) {
            this.fillStyle(0x6C6C6C);
            this.fillRectShape(rect);
            console.log(x);
          } else {
            this.strokeRectShape(rect);
          }
        }
      }
    }
  }]);

  return GridBoard;
}(Phaser.GameObjects.Graphics);

exports.GridBoard = GridBoard;
});

;require.register("classes/NextBrick.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextBrick = void 0;

var _CONSTANT = require("../data/CONSTANT");

var _Dot = require("./Dot");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NextBrick = /*#__PURE__*/function (_Phaser$GameObjects$G) {
  _inherits(NextBrick, _Phaser$GameObjects$G);

  function NextBrick(scene, options, board, shapeIndex) {
    var _this;

    _classCallCheck(this, NextBrick);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NextBrick).call(this, scene, options));
    _this.board = board;
    _this.dotArray = [];
    _this.rotationIndex = 0;
    _this.row = 0;
    _this.column = 0;

    _this.setDefaultStyles({
      lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 0.3
      },
      fillStyle: {
        color: 0xcccccc,
        alpha: 1
      }
    });

    _this.shapeIndex = shapeIndex;
    _this.shape = _CONSTANT.CONSTANT.gameBoard.BRICK_SHAPES[_this.shapeIndex];
    return _this;
  }

  _createClass(NextBrick, [{
    key: "getColor",
    value: function getColor() {
      switch (this.shapeIndex) {
        case 0:
          return 0xCF3616;

        case 1:
          return 0xBDC007;

        case 2:
          return 0x169907;

        case 3:
          return 0x07996F;

        case 4:
          return 0x076F99;

        case 5:
          return 0x410799;

        case 6:
          return 0x99078A;
      }
    }
  }, {
    key: "setCoordinate",
    value: function setCoordinate(row) {
      this.row = row;
      this.column = _CONSTANT.CONSTANT.gameBoard.OFFSET_NEXT_COL;
      this.draw();
    }
  }, {
    key: "clearSet",
    value: function clearSet() {
      while (this.dotArray.length !== 0) {
        var d = this.dotArray.pop();
        d.clear();
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clearSet();
      this.grid = this.shape.grids[this.rotationIndex];

      for (var row = 0; row < this.grid.length; row++) {
        for (var column = 0; column < this.grid[0].length; column++) {
          if (this.grid[row][column] === "x") {
            var x = this.row + row;
            var y = this.column + column;
            this.dotArray.push(new _Dot.Dot(this.scene, {}, x, y, this.board, this.getColor()));
          }
        }
      }
    }
    /**
     * #####################################
     * Action
     * #####################################
     */

  }]);

  return NextBrick;
}(Phaser.GameObjects.Graphics);

exports.NextBrick = NextBrick;
});

;require.register("data/CONSTANT.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONSTANT = void 0;
var CONSTANT = {
  gameBoard: {
    NUM_ROWS: 24,
    NUM_COLS: 10,
    CELL_SIZE: 20,
    OFFSET_COL: 20,
    OFFSET_ROW: 3,
    OFFSET_NEXT_COL: 13,
    OFFSET_NEXT_ROW_1: 3,
    OFFSET_NEXT_ROW_2: 10,
    OFFSET_MIDDLE: 3,
    SCORE_PER_ROW: 50,
    SCORE_PER_GO_DOWN: 5,
    BOARD_DATA: [[null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null]],
    BRICK_SHAPES: [{
      name: "shape_i",
      grids: [[[null, null, null, null], ["x", "x", "x", "x"], [null, null, null, null], [null, null, null, null]], [[null, null, "x", null], [null, null, "x", null], [null, null, "x", null], [null, null, "x", null]], [[null, null, null, null], [null, null, null, null], ["x", "x", "x", "x"], [null, null, null, null]], [[null, "x", null, null], [null, "x", null, null], [null, "x", null, null], [null, "x", null, null]]]
    }, {
      name: "shape_l1",
      grids: [[["x", null, null], ["x", "x", "x"], [null, null, null]], [[null, "x", "x"], [null, "x", null], [null, "x", null]], [[null, null, null], ["x", "x", "x"], [null, null, "x"]], [[null, "x", null], [null, "x", null], ["x", "x", null]]]
    }, {
      name: "shape_l2",
      grids: [[[null, null, "x"], ["x", "x", "x"], [null, null, null]], [[null, "x", null], [null, "x", null], [null, "x", "x"]], [[null, null, null], ["x", "x", "x"], ["x", null, null]], [["x", "x", null], [null, "x", null], [null, "x", null]]]
    }, {
      name: "shape_z1",
      grids: [[[null, "x", "x"], ["x", "x", null], [null, null, null]], [[null, "x", null], [null, "x", "x"], [null, null, "x"]], [[null, null, null], [null, "x", "x"], ["x", "x", null]], [["x", null, null], ["x", "x", null], [null, "x", null]]]
    }, {
      name: "shape_z2",
      grids: [[["x", "x", null], [null, "x", "x"], [null, null, null]], [[null, null, "x"], [null, "x", "x"], [null, "x", null]], [[null, null, null], ["x", "x", null], [null, "x", "x"]], [[null, "x", null], ["x", "x", null], ["x", null, null]]]
    }, {
      name: "shape_o",
      grids: [[[null, "x", "x", null], [null, "x", "x", null], [null, null, null, null]], [[null, "x", "x", null], [null, "x", "x", null], [null, null, null, null]], [[null, "x", "x", null], [null, "x", "x", null], [null, null, null, null]], [[null, "x", "x", null], [null, "x", "x", null], [null, null, null, null]]]
    }, {
      name: "shape_t",
      grids: [[[null, "x", null], ["x", "x", "x"], [null, null, null]], [[null, "x", null], [null, "x", "x"], [null, "x", null]], [[null, null, null], ["x", "x", "x"], [null, "x", null]], [[null, "x", null], ["x", "x", null], [null, "x", null]]]
    }]
  }
};
exports.CONSTANT = CONSTANT;
});

require.register("data/const.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = Object.freeze({
  colors: Object.freeze({
    aqua: '#62f6ff',
    black: '#000',
    gold: '#fed141',
    white: '#fff'
  }),
  fonts: Object.freeze({
    "default": 'Futura, system-ui, sans-serif'
  }),
  hexColors: Object.freeze({
    darkGray: 0x222222,
    red: 0xff2200,
    white: 0xffffff
  })
});

exports["default"] = _default;
});

require.register("initialize.js", function(exports, require, module) {
"use strict";

var _boot = _interopRequireDefault(require("scenes/boot"));

var _default = _interopRequireDefault(require("scenes/default"));

var _menu = _interopRequireDefault(require("scenes/menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.game = new Phaser.Game({
  // See <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
  width: 1000,
  height: 600,
  // zoom: 1,
  // resolution: 1,
  type: Phaser.AUTO,
  // parent: null,
  // canvas: null,
  // canvasStyle: null,
  // seed: null,
  title: '☕️ Brunch with Phaser and ES6',
  // 'My Phaser 3 Game'
  url: 'https://github.com/samme/brunch-phaser-es6',
  version: '0.0.1',
  // input: {
  //   keyboard: true,
  //   mouse: true,
  //   touch: true,
  //   gamepad: false
  // },
  // disableContextMenu: false,
  // banner: false
  banner: {
    // hidePhaser: false,
    // text: 'white',
    background: ['#e54661', '#ffa644', '#998a2f', '#2c594f', '#002d40']
  },
  // fps: {
  //   min: 10,
  //   target: 60,
  //   forceSetTimeout: false,
  // },
  // antialias: false,
  // pixelArt: false,
  // transparent: false,
  // clearBeforeRender: true,
  // backgroundColor: 0x000000, // black
  loader: {
    // baseURL: '',
    path: 'assets/' // maxParallelDownloads: 32,
    // crossOrigin: 'anonymous',
    // timeout: 0

  },
  physics: {
    "default": 'arcade',
    arcade: {
      gravity: {
        y: 180
      }
    }
  },
  scene: [_boot["default"], _default["default"], _menu["default"]]
});
});

require.register("scenes/boot.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _const = _interopRequireDefault(require("data/const"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Rectangle = Phaser.Geom.Rectangle;

var BootScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(BootScene, _Phaser$Scene);

  function BootScene() {
    var _this;

    _classCallCheck(this, BootScene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BootScene).call(this, 'boot'));
    _this.progressBar = null;
    _this.progressBgRect = null;
    _this.progressRect = null;
    return _this;
  }

  _createClass(BootScene, [{
    key: "preload",
    value: function preload() {
      this.load.image('bg', 'bg.png');
      this.load.image('bg2', 'bg2.png');
      this.load.image('title', 'title.png');
      this.load.image('bg-dim-1', 'bg-dim-1.png');
      this.load.image("cell", "cell.png");
      this.load.spritesheet('btn-newGame', 'btn-newGame.png', {
        frameWidth: 121,
        frameHeight: 26
      });
      this.load.spritesheet('btn-highScore', 'btn-highScore.png', {
        frameWidth: 121,
        frameHeight: 26
      });
      this.load.spritesheet('btn-about', 'btn-about.png', {
        frameWidth: 121,
        frameHeight: 26
      });
      this.load.audio('sound-swap', 'sound-swap.wav');
      this.load.audio('sound-click', 'sound-click.wav');
      this.load.audio('sound-fallFast', 'sound-fallFast.wav');
      this.load.audio('sound-done', 'sound-done.wav');
      this.load.audio('sound-drop', 'sound-drop.wav');
      this.load.audio('sound-move', 'sound-move.wav');
      this.load.audio('sound-bgMusic', 'sound-bgMusic.mp3');
      this.load.on('progress', this.onLoadProgress, this);
      this.load.on('complete', this.onLoadComplete, this);
      this.createProgressBar();
    }
  }, {
    key: "create",
    value: function create() {
      this.registry.set('score', 0);
      this.scene.start('menu');
    } // extend:

  }, {
    key: "createProgressBar",
    value: function createProgressBar() {
      var main = this.cameras.main;
      this.progressBgRect = new Rectangle(0, 0, 0.5 * main.width, 50);
      Rectangle.CenterOn(this.progressBgRect, 0.5 * main.width, 0.5 * main.height);
      this.progressRect = Rectangle.Clone(this.progressBgRect);
      this.progressBar = this.add.graphics();
    }
  }, {
    key: "onLoadComplete",
    value: function onLoadComplete(loader, totalComplete, totalFailed) {
      console.debug('complete', totalComplete);
      console.debug('failed', totalFailed);
      this.progressBar.destroy();
    }
  }, {
    key: "onLoadProgress",
    value: function onLoadProgress(progress) {
      console.debug('progress', progress);
      this.progressRect.width = progress * this.progressBgRect.width;
      this.progressBar.clear().fillStyle(_const["default"].hexColors.darkGray).fillRectShape(this.progressBgRect).fillStyle(this.load.totalFailed ? _const["default"].hexColors.red : _const["default"].hexColors.white).fillRectShape(this.progressRect);
    }
  }]);

  return BootScene;
}(Phaser.Scene);

exports["default"] = BootScene;
});

;require.register("scenes/default.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Board = require("../classes/Board");

var _Brick = require("../classes/Brick");

var _GridBoard = require("../classes/GridBoard");

var _CONSTANT = require("../data/CONSTANT");

var _NextBrick = require("../classes/NextBrick");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DefaultScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(DefaultScene, _Phaser$Scene);

  function DefaultScene() {
    _classCallCheck(this, DefaultScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(DefaultScene).call(this, 'default'));
  }

  _createClass(DefaultScene, [{
    key: "init",
    value: function init(data) {
      console.debug('init', this.scene.key, data, this);
      this.events.on('shutdown', this.shutdown, this);
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      var picBg = this.add.image(500, 300, 'bg2');
      this.fallTimer = this.time.addEvent({
        delay: 1000,
        callback: this.fall,
        callbackScope: this,
        loop: true
      });
      this.board = new _Board.Board(this, {});
      this.gridBoard = new _GridBoard.GridBoard(this, {});
      this.add.existing(this.board);
      this.add.existing(this.gridBoard);
      this.brickQueue = [];
      this.brickQueueObj = [];
      this.addBrickIDsToQueue();
      this.brick = new _Brick.Brick(this, {}, this.board, this.getBrickIDFromQueue());
      this.bgMusic = this.sound.add('sound-bgMusic');
      this.bgMusic.play({
        volume: 0.5,
        loop: true
      });
      this.gameData = {
        sPoint: 0,
        score: 0,
        level: 1,
        destroyed: 0,
        player: "",
        time: null,
        nexShapeIndices: [],
        nextSpecialIndices: []
      };
      var styleConfig = {
        font: "20px 'Verdana'",
        fill: "#ff0000",
        align: "center"
      };
      this.data_score = this.add.text(640, 320, "0", styleConfig);
      this.data_sPoint = this.add.text(240, 320, "0", styleConfig);
      this.data_time = this.add.text(640, 400, "0", styleConfig);
      this.data_level = this.add.text(240, 400, "0", styleConfig);
      this.data_player = this.add.text(640, 480, "0", styleConfig);
      this.data_destroyed = this.add.text(240, 480, "0", styleConfig);
      this.keyLeft = this.input.keyboard.addKey('LEFT');
      this.keyLeft.on('down', function () {
        return _this.brick.moveLeft();
      });
      this.keyRight = this.input.keyboard.addKey('RIGHT');
      this.keyRight.on('down', function () {
        return _this.brick.moveRight();
      });
      this.keyA = this.input.keyboard.addKey('A');
      this.keyA.on('down', function () {
        return _this.brick.changeUp();
      });
      this.keyUP = this.input.keyboard.addKey('UP');
      this.keyUP.on('down', function () {
        return _this.brick.changeUp();
      });
      this.keyD = this.input.keyboard.addKey('D');
      this.keyD.on('down', function () {
        return _this.brick.changeDown();
      });
      this.keySPACE = this.input.keyboard.addKey('SPACE');
      this.keySPACE.on('down', function () {
        _this.sound.play('sound-drop');

        _this.brick.goDown();
      });
      this.keyDown = this.input.keyboard.addKey('DOWN');
      this.input.keyboard.once('keydown_Q', this.quit, this);
    }
  }, {
    key: "addNextBricksToQueue",
    value: function addNextBricksToQueue() {
      for (var i = 0; i < this.brickQueue; i++) {
        var row = 3;
        if (i === 1) row = 10;
      }
    }
  }, {
    key: "addBrickIDsToQueue",
    value: function addBrickIDsToQueue() {
      var cnt = 2 - this.brickQueue.length;

      for (var i = 0; i < cnt; i++) {
        var tmpShapeIndex = Math.floor(Math.random() * _CONSTANT.CONSTANT.gameBoard.BRICK_SHAPES.length);
        this.brickQueue.push(tmpShapeIndex);
        this.brickQueueObj.push(new _NextBrick.NextBrick(this, {}, this.board, tmpShapeIndex));
      }

      this.brickQueueObj[0].setCoordinate(2);
      this.brickQueueObj[1].setCoordinate(6);
    }
  }, {
    key: "getBrickIDFromQueue",
    value: function getBrickIDFromQueue() {
      var tmp = this.brickQueue.shift();
      var tmpObj = this.brickQueueObj.shift();
      tmpObj.clearSet();
      tmpObj.destroy();
      this.addBrickIDsToQueue();
      return tmp;
    }
  }, {
    key: "updateData",
    value: function updateData() {
      if (!this.brick.canFall() && !this.brick.playedSound) {
        this.sound.play('sound-click');
        this.brick.playedSound = true;
      }

      this.data_score.text = this.gameData.score;
      this.data_sPoint.text = this.gameData.sPoint;
      this.data_time.text = "00:00:00";
      this.data_level.text = this.gameData.level;
      this.data_player.text = "Trung Tran";
      this.data_destroyed.text = this.gameData.destroyed;
    }
  }, {
    key: "update",
    value: function update() {
      if (this.keyDown.isDown) {
        this.brick.fall();
      }

      this.updateData();
    }
  }, {
    key: "getRandWithProb",
    value: function getRandWithProb(setWithProb) {
      var sum = 0;

      for (var i = 0; i < setWithProb.length; i++) {
        sum += setWithProb[i];
      }

      var pick = Math.random() * sum;

      for (var _i = 0; _i < setWithProb.length; _i++) {
        pick -= setWithProb[_i];

        if (pick <= 0) {
          return _i;
        }
      }
    } // extend:

  }, {
    key: "quit",
    value: function quit() {
      // this.removeBrick();
      // this.fallTimer.destroy();
      this.scene.start('menu');
    }
  }, {
    key: "removeBrick",
    value: function removeBrick() {
      this.brick.clearSet();
      this.brick = null;
    }
  }, {
    key: "createBrick",
    value: function createBrick() {
      this.brick = new _Brick.Brick(this, {}, this.board, this.getBrickIDFromQueue());
    }
  }, {
    key: "fall",
    value: function fall() {
      if (!this.brick.fall()) {
        this.board.fix(this.brick);
        this.brick.clearSet();
        this.brick.destroy();
        var completedRowsCnt = this.board.checkToClear();

        if (completedRowsCnt !== 0) {
          this.sound.play('sound-done');
        }

        this.updateScore(completedRowsCnt);
        this.board.draw();
        this.createBrick();
      }
    }
  }, {
    key: "updateScore",
    value: function updateScore(completedRowsCnt) {
      switch (completedRowsCnt) {
        case 1:
          this.gameData.score += Math.floor(1 * completedRowsCnt * _CONSTANT.CONSTANT.gameBoard.SCORE_PER_ROW);
          break;

        case 2:
          this.gameData.score += Math.floor(2 * completedRowsCnt * _CONSTANT.CONSTANT.gameBoard.SCORE_PER_ROW);
          break;

        case 3:
          this.gameData.score += Math.floor(3 * completedRowsCnt * _CONSTANT.CONSTANT.gameBoard.SCORE_PER_ROW);
          break;

        case 4:
          this.gameData.score += Math.floor(4 * completedRowsCnt * _CONSTANT.CONSTANT.gameBoard.SCORE_PER_ROW);
          break;
      }

      this.gameData.destroyed += completedRowsCnt;
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      this.registry.set('score', this.score);
    }
  }]);

  return DefaultScene;
}(Phaser.Scene);

exports["default"] = DefaultScene;
});

;require.register("scenes/menu.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MenuScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);

  function MenuScene() {
    _classCallCheck(this, MenuScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuScene).call(this, 'menu'));
  }

  _createClass(MenuScene, [{
    key: "init",
    value: function init(data) {
      console.debug('init', this.scene.key, data, this);
    }
  }, {
    key: "create",
    value: function create() {
      var player = this.sound;
      var scene = this.scene;
      var selectedMenu = 1;
      var picBg = this.add.image(500, 300, 'bg');
      var picTitle = this.add.image(0, 0, 'title');
      picTitle.setOrigin(0, 0);
      picTitle.setPosition((game.renderer.width - picTitle.width) / 2, 100);
      var picBgDim = this.add.image(0, 0, 'bg-dim-1');
      picBgDim.setOrigin(0, 0);
      picBgDim.setPosition((game.renderer.width - picBgDim.width) / 2, 270);
      var btnNewGame = this.add.sprite(0, 0, 'btn-newGame').setInteractive();
      btnNewGame.setOrigin(0, 0);
      btnNewGame.setPosition((game.renderer.width - btnNewGame.width) / 2 - 10, 305);
      btnNewGame.setFrame(1); // btnNewGame.on('pointerover', function(pointer) {
      //     player.play('sound-swap');
      //     btnNewGame.setFrame(1);
      // });
      // btnNewGame.on('pointerout', function(pointer) {
      //     btnNewGame.setFrame(0);
      // });

      btnNewGame.setScale(1.3);
      var btnHighScore = this.add.sprite(0, 0, 'btn-highScore').setInteractive();
      btnHighScore.setOrigin(0, 0);
      btnHighScore.setPosition((game.renderer.width - btnHighScore.width) / 2 - 12, 355); // btnHighScore.on('pointerover', function(pointer) {
      //     player.play('sound-swap');
      //     btnHighScore.setFrame(1);
      // });
      // btnHighScore.on('pointerout', function(pointer) {
      //     btnHighScore.setFrame(0);
      // });

      btnHighScore.setScale(1.3);
      var btnAbout = this.add.sprite(0, 0, 'btn-about').setInteractive();
      btnAbout.setOrigin(0, 0);
      btnAbout.setPosition((game.renderer.width - btnAbout.width) / 2 - 12, 405); // btnAbout.on('pointerover', function(pointer) {
      //     player.play('sound-swap');
      //     btnAbout.setFrame(1);
      // });
      // btnAbout.on('pointerout', function(pointer) {
      //     btnAbout.setFrame(0);
      // });

      btnAbout.setScale(1.3); //this.input.on('pointerup', this.start, this);

      btnNewGame.on('pointerup', function (pointer) {
        player.play('sound-click');
      });
      btnHighScore.on('pointerup', function (pointer) {
        player.play('sound-click');
      });
      btnAbout.on('pointerup', function (pointer) {
        player.play('sound-click');
      });
      var keyUp = this.input.keyboard.addKey('UP');
      keyUp.on('down', function (event) {
        selectedMenu--;
        if (selectedMenu === 0) selectedMenu = 3;
        highLightBtn();
      });
      var keyDown = this.input.keyboard.addKey('DOWN');
      keyDown.on('down', function (event) {
        selectedMenu++;
        if (selectedMenu === 4) selectedMenu = 1;
        highLightBtn();
      });

      function highLightBtn() {
        player.play('sound-swap');

        switch (selectedMenu) {
          case 1:
            btnNewGame.setFrame(1);
            btnHighScore.setFrame(0);
            btnAbout.setFrame(0);
            break;

          case 2:
            btnNewGame.setFrame(0);
            btnHighScore.setFrame(1);
            btnAbout.setFrame(0);
            break;

          case 3:
            btnNewGame.setFrame(0);
            btnHighScore.setFrame(0);
            btnAbout.setFrame(1);
            break;
        }
      }

      var keyEnter = this.input.keyboard.addKey('ENTER');
      keyEnter.on('down', function (event) {
        switch (selectedMenu) {
          case 1:
            scene.start('default');
            break;

          case 2:
            scene.start('highScore');
            break;

          case 3:
            scene.start('about');
            break;
        }
      });
    }
  }]);

  return MenuScene;
}(Phaser.Scene);

exports["default"] = MenuScene;
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map