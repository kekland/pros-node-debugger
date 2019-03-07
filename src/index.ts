import { spawn } from 'child_process'
import * as socketio from 'socket.io'
import { EnvironmentUtils } from './env/env.utils'
import { Logger } from './logger'
import { PROSProcess } from './pros-process/pros.process'
import { getWelcomingMessage } from './welcome'

// socketio.default()
const bootstrap = async () => {
  const prosProcess = new PROSProcess((data) => Logger.log(JSON.stringify(data), 'bootstrap'),
    EnvironmentUtils.getConfigStrict('cliLocation'),
    EnvironmentUtils.getConfigStrict('projectLocation'))
}

bootstrap()
