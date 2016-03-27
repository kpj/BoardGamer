'use strict'

let express = require('express')
let http = require('http')
let socketIO = require('socket.io')

let app = express()
//app.use(express.static(__dirname + '/dist'))

let webpack = require('webpack')
let webpackConfig = require('./webpack.config.js')
let compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}))

let server = http.Server(app)
let io = socketIO(server)

io.on('connection', function (socket) {
  console.log('a user connected')
})

server.listen(process.env.PORT || 3000, function () {
  console.log('listening on *:3000')
})
