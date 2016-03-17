var YAML = require('yamljs')

class Piece {
  /*
   * Single piece on the board
   */
  constructor (spec) {
    this.spec = spec
  }
}

class Board {
  /*
   * Board of game
   */
  constructor (width, height) {
    this.board = []

    for (var i = 0; i < width; ++i) {
      this.board.push([])
      for (var j = 0; j < height; ++j) {
        this.board[this.board.length-1].push(undefined)
      }
    }
  }

  setPiece (pos, piece) {
    this.board[pos.y][pos.x] = piece
  }
}

class Game {
  /*
   * Base class of every game
   */
  constructor (name) {
    this.name = name
    this.board = undefined
  }

  showState () {
    if (this.board === undefined) {
      console.log('No board set')
      return
    }

    for (var row of this.board.board) {
      for (var cell of row) {
        if (cell === undefined) {
          process.stdout.write('_')
        } else {
          process.stdout.write(String(cell.spec.symbol))
        }
      }
      console.log()
    }
  }
}

class GameCreator {
  /*
   * Create game logic object from given YAML file
   */
  constructor (fname) {
    this.spec = YAML.load(fname)
  }

  generateGame () {
    var game = new Game(this.spec.name)

    // setup Board
    var board = new Board(this.spec.fieldSize.width, this.spec.fieldSize.height)

    for (var piece of this.spec.pieces) {
      for(var pos of piece.initialPositions) {
        board.setPiece(pos, new Piece(piece))
      }
    }

    game.board = board

    return game
  }
}

var gc = new GameCreator('rules.yml')
var game = gc.generateGame()

game.showState()
