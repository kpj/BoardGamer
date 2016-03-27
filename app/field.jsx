import React from 'react'
import Client from './client.js'

class Board extends React.Component {
  constructor (props) {
    super(props)

    this.client = new Client()
    this.state = {
      board: 2
    }
  }

  render () {
    return <p>This should be a {this.state.board}</p>
  }
}

export default Board
