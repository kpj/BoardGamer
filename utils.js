'use strict'

let readlineSync = require('readline-sync')


function listContainsDict (list, ele) {
  // TODO: is there a better way? :-(

  if (list === undefined) {
    return false
  }

  for (let e of list) {
    if (e.x === ele.x && e.y === ele.y) {
      return true
    }
  }
  return false
}

function readCommandsfromStdin (query) {
  let inp = readlineSync.question(query)

  let [fromStr, toStr] = inp.split(';')
  if (fromStr.length === 0 || toStr.length === 0) {
    return
  }

  let [fromX, fromY] = fromStr.trim().split(' ')
  if (fromX === undefined || fromY === undefined) {
    return
  }
  let startPos = {x: fromX.trim(), y: fromY.trim()}


  let [toX, toY] = toStr.trim().split(' ')
  if (toX === undefined || toY === undefined) {
    return
  }
  let endPos = {x: toX.trim(), y: toY.trim()}

  return [startPos, endPos]
}

module.exports.listContainsDict = listContainsDict
module.exports.readCommandsfromStdin = readCommandsfromStdin
