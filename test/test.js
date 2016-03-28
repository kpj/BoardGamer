'use strict'

let chai = require('chai')

chai.should()

let Game = require(__dirname + '/../game')
let gc = new Game.GameCreator('rules.yml')

describe('Game', () => {
  describe('#verifyMove()', () => {
    let game

    beforeEach(() => {
      game = gc.generateGame()
      game.startGame()
    })

    it('allows simple pawn movement', () => {
      game.verifyMove(
        {x: 0, y: 1},
        {x: 0, y: 2}
      ).should.be.true
    })

    it('disallows moving over other pieces', () => {
      game.verifyMove(
        {x: 0, y: 0},
        {x: 0, y: 4}
      ).should.be.false
    })

    it('allows moving the bishop diagonally', () => {
      // move own pawn out of the way
      game.attemptMove(
        {x: 4, y: 1},
        {x: 4, y: 2}
      )

      // move own bishop
      game.verifyMove(
        {x: 5, y: 0},
        {x: 2, y: 3}
      ).should.be.true
    })
  })
})
