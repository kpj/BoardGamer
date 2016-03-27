import React from 'react'
import ReactDOM from 'react-dom'

import Board from './field.jsx'

if (typeof document !== 'undefined') {
  ReactDOM.render(<Board />, document.body)
}

module.exports = Board
