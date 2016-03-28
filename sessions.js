'use strict'

let gs = require('./gameServer.js')

class Manager {
  constructor () {
    this.clients = []
  }

  addClient (socket) {
    this.clients.push(socket)

    if (this.clients.length >= 2) {
      this.initGame(this.clients.pop(), this.clients.pop())
    }
  }

  initGame (sock1, sock2) {
    let serv = new gs.GameServer(sock1, sock2)
  }
}

module.exports.Manager = Manager
