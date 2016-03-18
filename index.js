'use strict'

let YAML = require('yamljs')

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

    for (let i = 0; i < width; ++i) {
      this.board.push([])
      for (let j = 0; j < height; ++j) {
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

    for (let row of this.board.board) {
      for (let cell of row) {
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
    let game = new Game(this.spec.name)

    // setup Board
    let board = new Board(this.spec.fieldSize.width, this.spec.fieldSize.height)

    for (let piece of this.spec.pieces) {
      for(let pos of piece.initialPositions) {
        board.setPiece(pos, new Piece(piece))
      }
    }

    game.board = board

    return game
  }
}

let gc = new GameCreator('rules.yml')
let game = gc.generateGame()

game.showState()
