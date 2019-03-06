import { Logger } from "../logger";
import { Readable, Writable } from 'stream'
import { spawn, IPty } from 'node-pty'
export class PROSTerminalProcess {
  private process: IPty;
  private onData: (obj: object) => void;

  constructor(prosExec: string, onData: (obj: object) => void) {
    console.log(process.cwd())
    const env = process.env
    const envMod: {[key: string]: string} = {};
    for(const v in env) {
      envMod[v] = (env[v] as string)
    }
    this.process = spawn(`${prosExec}`, ['terminal'], {env: envMod, cwd: process.cwd()})

    this.process.on('data', this.onOutput)
    this.process.on('exit', this.onClose)

    Logger.log('Process launched', 'PROSTerminalProcess')

    this.onData = onData
  }

  private onOutput(data: string) {
    Logger.log(`${data}`, 'PROSTerminalProcess')
    try {
      const obj = JSON.parse(data)
      this.onData(obj)
    }
    catch (err) {
      Logger.error('Cannot parse object', 'PROSTerminalProcess')
    }
  }

  private onError(error: string) {
    Logger.error(`${error}`, 'PROSTerminalProcess')
  }

  private onClose(code: number, signal: number | undefined) {
    Logger.error(`Terminal closed with code ${code} and signal ${signal}`, 'PROSTerminalProcess')
    Logger.warn(`Check the connection between the brain and computer.`, `PROSTerminalProcess`)
  }
}