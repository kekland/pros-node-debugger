import { spawn } from 'child_process'
import * as socketio from 'socket.io'
import { EnvironmentUtils } from './env/env.utils'
import { Logger } from './logger'
import { PROSProcess } from './pros-process/pros.process'
import { getWelcomingMessage } from './welcome'

// socketio.default()
const bootstrap = async () => {
  const prosProcess = new PROSProcess((data: any) => {
    if (data.type === 'error') {
      Logger.error(data.data, 'prosProcess')
    } else {
      Logger.log(JSON.stringify(data), 'prosProcess')
    }
  },
  EnvironmentUtils.getConfigStrict('cliLocation'),
  EnvironmentUtils.getConfigStrict('projectLocation'))

  prosProcess.flash()
}

bootstrap()
