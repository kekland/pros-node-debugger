import { ChildProcess, spawn } from "child_process";
import { Logger } from "../logger";

export class PROSTerminalProcess {
  private process: ChildProcess;

  constructor() {
    this.process = spawn('prosv5', ['terminal'])
    if (this.process.stdout != null) {
      this.process.stdout.on('data', this.onOutput)
    }
    else {
      Logger.warn('Cannot bind stdout - object is null', 'PROSTerminalProcess')
    }

    if (this.process.stderr != null) {
      this.process.stderr.on('data', this.onError)
    }
    else {
      Logger.warn('Cannot bind stderr - object is null', 'PROSTerminalProcess')
    }

    this.process.on('close', this.onClose)
    Logger.log('Process launched', 'PROSTerminalProcess')
  }

  private onOutput(data: string) {
    Logger.log(`${data}`, 'PROSTerminalProcess')
  }

  private onError(error: string) {
    Logger.error(`${error}`, 'PROSTerminalProcess')
  }

  private onClose(code: number, signal: number) {
    Logger.error(`Terminal closed with code ${code} and signal ${signal}`, 'PROSTerminalProcess')
    Logger.warn(`Check the connection between the brain and computer.`, `PROSTerminalProcess`)
  }
}