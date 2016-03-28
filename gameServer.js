'use strict'

let Game = require('./game.js')

class GameServer {
  constructor (io, sock1, sock2) {
    this.io = io
    this.p1 = sock1
    this.p2 = sock2

    this.initSocketEvents(sock1)
    this.initSocketEvents(sock2)

    let gc = new Game.GameCreator('rules.yml')
    this.game = gc.generateGame()

    this.startGame()
  }

  initSocketEvents (sock) {
    sock.on('tryMove', function (data) {
      try {
        this.game.handleInput(data.source, data.target)

        // TODO: only send updates and not whole state
        this.io.emit('commence', this.game.board.asStringList())

        this.io.emit('stateUpdate', {
          currentPlayer: this.game.getCurrentPlayerName()
        })
      } catch (err) {
        this.io.emit('error', {msg: err})
      }
    }.bind(this))
  }

  startGame () {
    console.log('Starting game')
    this.game.startGame()

    this.io.emit('commence', this.game.board.asStringList())
    this.io.emit('stateUpdate', {
      currentPlayer: this.game.getCurrentPlayerName()
    })
  }
}

module.exports.GameServer = GameServer
