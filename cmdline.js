'use strict'

let utils = require('./utils.js')
let Game = require('./game.js')

let gc = new Game.GameCreator('rules.yml')
let game = gc.generateGame()

game.startGame()

while (true) {
  game.showState()
  console.log()

  let res = utils.readCommandsfromStdin(`[${game.getCurrentPlayerName()}] Move: `)
  if (res === undefined) {
    console.log('Invalid input\n')
  } else {
    let [startPos, endPos] = res
    game.handleInput(startPos, endPos)
  }
  console.log('#######################')
}
