import { spawn } from 'child_process'
import * as express from 'express'
import * as http from 'http'
import * as socketio from 'socket.io'
import { EnvironmentUtils } from './env/env.utils'
import { Logger } from './logger'
import { PROSProcess } from './pros-process/pros.process'
import { getWelcomingMessage } from './welcome'

// socketio.default()
const bootstrap = async () => {
  const expressServer = express.default()
  expressServer.use(express.static('www'))
  expressServer.listen(8080)
  const socketServer = socketio.listen(8078)
  socketServer.on('connection', (socket) => {
    Logger.log(`New connection: ${socket.id}`, 'socketServer')

    socket.on('flash', () => {
      if (prosProcess.isFlashing) {
        return
      }
      Logger.log('Starting to flash')
      prosProcess.flash()
    })
  })
  Logger.log(`Running socket.io server on port ${8078}, express server on port ${8080}`, 'bootstrap')

  const prosProcess = new PROSProcess((data: any) => {
    socketServer.emit('data', data)
  },
    EnvironmentUtils.getConfigStrict('cliLocation'),
    EnvironmentUtils.getConfigStrict('projectLocation'))

  prosProcess.openTerminal()
}

bootstrap()
