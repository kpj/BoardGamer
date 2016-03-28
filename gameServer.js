'use strict'

let Game = require('./game.js')

class GameServer {
  constructor (sock1, sock2) {
    this.p1 = sock1
    this.p2 = sock2

    let gc = new Game.GameCreator('rules.yml')
    this.game = gc.generateGame()

    this.startGame()
  }

  startGame () {
    console.log('Starting game')
    this.game.startGame()

    this.p1.emit('commence', this.game.board.asStringList())
    this.p2.emit('commence', this.game.board.asStringList())
  }
}

module.exports.GameServer = GameServer
