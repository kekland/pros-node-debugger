import { Logger } from "./logger";
import { spawn } from 'child_process'
import { PROSTerminalProcess } from "./pros-process/pros.process";
import { getWelcomingMessage } from "./welcome";
import * as socketio from 'socket.io';

//socketio.default()
const bootstrap = async () => {  
  const process = new PROSTerminalProcess('C:/Program Files/PROS/cli/prosv5.exe', (data) => {
  })
}

bootstrap()
