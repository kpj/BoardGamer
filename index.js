'use strict'

let Game = require('./game.js')


let gc = new Game.GameCreator('rules.yml')
let game = gc.generateGame()

game.startGame()

game.showState()
game.handleInput({x: 0, y: 1}, {x: 0, y: 2})
game.showState()
game.handleInput({x: 0, y: 1}, {x: 0, y: 2})
game.showState()
