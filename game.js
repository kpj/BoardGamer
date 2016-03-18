'use strict'

let YAML = require('yamljs')
let utils = require('./utils.js')


class Piece {
  /*
   * Single piece on the board
   */
  constructor (spec, owner, playerNum) {
    this.spec = spec
    this.owner = owner

    this.sprite = this.spec.symbols[playerNum]
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

  setPiece (viewport, pos, piece) {
    let transPos = this.transformCoordinates(viewport, pos)

    if (this.board[transPos.y][transPos.x] !== undefined) {
      throw `Board position ${transPos.x}x${transPos.y} in use`
    }

    this.board[transPos.y][transPos.x] = piece
  }

  getPieceRel (viewport, pos) {
    let transPos = this.transformCoordinates(viewport, pos)
    return this.board[transPos.y][transPos.x]
  }

  movePieceRel (viewport, startPos, endPos) {
    let transStartPos = this.transformCoordinates(viewport, startPos)
    let transEndPos = this.transformCoordinates(viewport, endPos)

    this.board[transEndPos.y][transEndPos.x] = this.board[transStartPos.y][transStartPos.x]
    this.board[transStartPos.y][transStartPos.x] = undefined
  }

  getPieceAbs (pos) {
    return this.board[pos.y][pos.x]
  }

  movePieceAbs (startPos, endPos) {
    this.board[endPos.y][endPos.x] = this.board[startPos.y][startPos.x]
    this.board[startPos.y][startPos.x] = undefined
  }

  transformCoordinates (viewport, pos) {
    /*
     * Transform given coordinates accodring to current player
     */
    return {
      x: viewport.origin.x + viewport.origin.xf * pos.x,
      y: viewport.origin.y + viewport.origin.yf * pos.y
    }
  }
}

class Game {
  /*
   * Base class of every game
   */
  constructor (name, players) {
    this.name = name
    this.players = players

    this.board = undefined
    this.currentPlayerIndex = -1
  }

  showState () {
    if (this.board === undefined) {
      throw 'No board set yet'
    }

    // print header
    process.stdout.write('  ')
    let [nlm, _] = utils.getNumberLetterMap()
    for (let ind = 0; ind < this.board.board.length; ++ind) {
      process.stdout.write(nlm.get(ind))
    }
    console.log()

    // print board with margins
    let c = 0
    for (let row of this.board.board) {
      process.stdout.write(`${c} `)

      for (let cell of row) {
        if (cell === undefined) {
          process.stdout.write('_')
        } else {
          process.stdout.write(String(cell.sprite))
        }
      }

      process.stdout.write(` ${c}`)
      c++

      console.log()
    }

    // print footer
    process.stdout.write('  ')
    for (let ind = 0; ind < this.board.board.length; ++ind) {
      process.stdout.write(nlm.get(ind))
    }
    console.log()
  }

  startGame () {
    this.currentPlayerIndex = 0
  }

  nextTurn () {
    /*
     * Cycle players
     */
    this.currentPlayerIndex++
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentPlayerIndex = 0
    }
  }

  handleInput (startPos, endPos) {
    /*
     * Advance game on successful move
     */
    try {
      this.attemptMove(startPos, endPos)
    } catch (err) {
      console.log(`Invalid move (${err}), try again`)
      return
    }

    this.nextTurn()
  }

  attemptMove (startPos, endPos) {
    /*
     * Attempt to move piece.
     * Throw exception if it doesn't work
     */
    if (this.currentPlayerIndex === -1) {
      throw 'Game has not started yet'
    }

    let curPlayer = this.players[this.currentPlayerIndex]
    let piece = this.board.getPieceAbs(startPos)

    // check if there is a piece at all
    if (piece === undefined) {
      throw 'No piece selected'
    }

    // check if piece belongs to current player
    if (piece.owner.name !== curPlayer.name) {
      throw 'Trying to play opponent\'s piece'
    }

    let rel_move = {
      x: (endPos.x - startPos.x) * curPlayer.origin.xf,
      y: (endPos.y - startPos.y) * curPlayer.origin.yf
    }

    // check if move is valid
    if (!utils.listContainsDict(piece.spec.moves, rel_move)) {
      throw 'Attempting invalid move'
    }

    // do move
    this.board.movePieceAbs(startPos, endPos)
  }

  getCurrentPlayerName () {
    return this.players[this.currentPlayerIndex].name
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
    let game = new Game(this.spec.name, this.spec.players)

    // setup Board
    let board = new Board(this.spec.fieldSize.width, this.spec.fieldSize.height)

    let pc = 0
    for (let player of this.spec.players) {
      for (let piece of this.spec.pieces) {
        for (let pos of piece.initialPositions) {
          board.setPiece(player, pos, new Piece(piece, player, pc))
        }
      }
      pc++
    }

    game.board = board

    return game
  }
}

module.exports.GameCreator = GameCreator
