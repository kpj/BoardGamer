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
  let [_, lnm] = getNumberLetterMap()

  let [fromStr, toStr] = inp.split(';')
  if (fromStr.length === 0 || toStr.length === 0) {
    return
  }

  let [fromX, fromY] = fromStr.trim().split(' ')
  if (fromX === undefined || fromY === undefined) {
    return
  }
  let startPos = {x: lnm.get(fromX.trim()), y: fromY.trim()}


  let [toX, toY] = toStr.trim().split(' ')
  if (toX === undefined || toY === undefined) {
    return
  }
  let endPos = {x: lnm.get(toX.trim()), y: toY.trim()}

  return [startPos, endPos]
}

function getNumberLetterMap () {
  let map1 = new Map()
  let map2 = new Map()

  for(let i = 97; i < 123; ++i) {
    map1.set(i-97, String.fromCharCode(i))
    map2.set(String.fromCharCode(i), i-97)
  }

  return [map1, map2]
}

module.exports.listContainsDict = listContainsDict
module.exports.readCommandsfromStdin = readCommandsfromStdin
module.exports.getNumberLetterMap = getNumberLetterMap
