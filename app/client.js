'use strict'

import IO from 'socket.io-client'

class Client {
  constructor (stateCallback) {
    this.socket = IO.connect()

    this.setState = stateCallback
    this.board = []

    this.initSocketEvents()
  }

  initSocketEvents () {
    let self = this

    this.socket.on('commence', function (boardData) {
      self.board = boardData
      self.setState('board', self.board)
    })
  }
}

export default Client
