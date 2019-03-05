import { Logger } from "./logger";
import { spawn } from 'child_process'
import { PROSTerminalProcess } from "./pros-process/pros.process";
import { getWelcomingMessage } from "./welcome";

const bootstrap = async () => {  
  console.log(getWelcomingMessage())
  
}

bootstrap()