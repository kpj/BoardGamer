'use strict'

import IO from 'socket.io-client'

class Client {
  constructor () {
    console.log('New client created')
    this.socket = IO.connect()
  }
}

export default Client
