import React from 'react'
import Client from './client.js'

class Cell extends React.Component {
  constructor (props) {
    super(props)
  }

  handleClick (event) {
    this.props.onClick(this.props.y, this.props.x)
  }

  render () {
    let rowMarker = (this.props.y % 2 === 0) ? 'evenRow' : 'oddRow'
    let classes = `board-cell ${rowMarker}`
    if (this.props.selected) {
      classes += ' selected-cell'
    }

    return React.createElement(
      'div', {
        className: classes,
        onClick: this.handleClick.bind(this)
      }, this.props.value)
  }
}

class Board extends React.Component {
  constructor (props) {
    super(props)

    this.client = new Client(this.setState.bind(this))
    this.state = {
      board: [[]],
      firstClick: undefined,
      currentPlayer: 'undefined',
      player: 'nameless player'
    }
  }

  handleCellClick (row, col) {
    if (this.state.firstClick === undefined) {
      this.setState({firstClick: {x: col, y: row}})
    } else {
      let target = {x: col, y: row}
      this.client.tryMove(this.state.firstClick, target)
      this.setState({firstClick: undefined})
    }
  }

  render () {
    let cells = []

    for (let row_ind in this.state.board) {
      for (let col_ind in this.state.board[row_ind]) {
        let ele = React.createElement(Cell, {
          value: this.state.board[row_ind][col_ind],
          x: col_ind,
          y: row_ind,
          onClick: this.handleCellClick.bind(this),
          key: `cell ${row_ind}x${col_ind}`,
          selected: this.state.firstClick !== undefined && this.state.firstClick.x === col_ind && this.state.firstClick.y === row_ind
        })
        cells.push(ele)
      }
    }

    return React.createElement(
      'div', {
        className: 'root'
      }, [
        React.createElement('div', {key: 'statusBar'}, `Current player: ${this.state.currentPlayer} (you are ${this.state.player})`),
        React.DOM.div({className: 'board', key: 'board'}, cells)
      ]
    )
  }
}

export default Board
