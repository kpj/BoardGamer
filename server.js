'use strict'

let express = require('express')
let http = require('http')
let socketIO = require('socket.io')

let app = express()
app.use(express.static(__dirname + '/dist'))

let server = http.Server(app)
server.listen(process.env.PORT || 3000, function () {
  console.log('listening on *:3000')
})

let io = socketIO(server)
