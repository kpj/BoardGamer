'use strict'

let Game = require('./game.js')

class GameServer {
  constructor (sock1, sock2) {
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
      let success = this.game.handleInput(data.source, data.target)

      if (success) {
        // TODO: only send updates and not whole state
        this.p1.emit('commence', this.game.board.asStringList())
        this.p2.emit('commence', this.game.board.asStringList())
      }
    }.bind(this))
  }

  startGame () {
    console.log('Starting game')
    this.game.startGame()

    this.p1.emit('commence', this.game.board.asStringList())
    this.p2.emit('commence', this.game.board.asStringList())
  }
}

module.exports.GameServer = GameServer
