import React from 'react'
import Board from './field.jsx'

if (typeof document !== 'undefined') {
  React.render(<Board />, document.body)
}

module.exports = Board
