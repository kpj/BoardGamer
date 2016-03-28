'use strict'

import IO from 'socket.io-client'

class Client {
  constructor (stateCallback) {
    this.socket = IO.connect()
    this.setState = stateCallback

    this.initSocketEvents()
  }

  initSocketEvents () {
    let self = this

    this.socket.on('commence', function (data) {
      this.setState({
        board: data.board,
        player: data.player.name
      })
    }.bind(this))

    this.socket.on('boardUpdate', function (data) {
      this.setState({board: data.board})
    }.bind(this))

    this.socket.on('error', function (err) {
      console.log(err)
    })

    this.socket.on('stateUpdate', function (state) {
      self.setState(state)
    })
  }

  tryMove (source, target) {
    this.socket.emit('tryMove', {
      source: source,
      target: target
    })
  }
}

export default Client
