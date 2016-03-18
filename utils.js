'use strict'

function listContainsDict (list, ele) {
  // TODO: is there a better way? :-(
  for (let e of list) {
    if (e.x === ele.x && e.y === ele.y) {
      return true
    }
  }
  return false
}

module.exports.listContainsDict = listContainsDict
