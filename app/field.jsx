import React from 'react'
import Client from './client.js'

class Cell extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let rowMarker = (this.props.x % 2 == 0) ? 'evenRow' : 'oddRow'
    return React.createElement(
      'span', {
        className: `board-cell ${rowMarker}`
      }, this.props.value)
  }
}

class Board extends React.Component {
  constructor (props) {
    super(props)

    this.client = new Client(this.setState.bind(this))
    this.state = {
      board: [[]]
    }
  }

  setState (key, val) {
    this.state[key] = val
    this.forceUpdate()
  }

  clickHandler (row, col) {
    console.log('Click:', row, col)
  }

  render () {
    let cells = []

    for (let row_ind in this.state.board) {
      for (let col_ind in this.state.board[row_ind]) {
        let ele = React.createElement(Cell, {
          value: this.state.board[row_ind][col_ind],
          x: row_ind,
          y: col_ind,
          onClick: this.clickHandler,
          key: `cell ${row_ind}x${col_ind}`
        })
        cells.push(ele)
      }
    }

    return React.DOM.div({className: 'board'}, cells)
  }
}

export default Board
