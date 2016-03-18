'use strict'

let YAML = require('yamljs')

class Piece {
  /*
   * Single piece on the board
   */
  constructor (spec, owner) {
    this.spec = spec
    this.owner = owner
  }
}

class Board {
  /*
   * Board of game
   */
  constructor (width, height) {
    this.board = []
    this.player = undefined

    for (let i = 0; i < width; ++i) {
      this.board.push([])
      for (let j = 0; j < height; ++j) {
        this.board[this.board.length-1].push(undefined)
      }
    }
  }

  setPiece (pos, piece) {
    let transPos = this.transformCoordinates(pos)

    if (this.board[transPos.y][transPos.x] !== undefined) {
      throw `Board position ${transPos.x}x${transPos.y} in use`
    }

    this.board[transPos.y][transPos.x] = piece
  }

  setCurrentPlayer (player) {
    this.player = player
  }

  transformCoordinates (pos) {
    /*
     * Transform given coordinates accodring to current player
     */
    if (this.player === undefined) {
      throw 'No player set'
    }

    return {
      x: this.player.origin.x + this.player.origin.xf * pos.x,
      y: this.player.origin.y + this.player.origin.yf * pos.y
    }
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
      throw 'No board set yet'
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

    for (let player of this.spec.players) {
      for (let piece of this.spec.pieces) {
        for (let pos of piece.initialPositions) {
          board.setCurrentPlayer(player)
          board.setPiece(pos, new Piece(piece, player))
        }
      }
    }

    game.board = board

    return game
  }
}

let gc = new GameCreator('rules.yml')
let game = gc.generateGame()

game.showState()
