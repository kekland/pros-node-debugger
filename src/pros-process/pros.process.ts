import { IPty, spawn } from 'node-pty'
import { Readable, Writable } from 'stream'
import { Logger } from '../logger'

export class PROSProcess {
  private currentProcess: IPty | null
  private prosExecutable: string
  private prosProjectFolder: string
  private onData: (data: object) => void

  constructor(onData: (data: object) => void, prosExecutableFolder: string, prosProjectFolder: string) {
    this.currentProcess = null
    this.prosExecutable = prosExecutableFolder
    this.prosProjectFolder = prosProjectFolder
    this.onData = onData
  }

  public openTerminal() {
    this.startPROSCommand(['terminal'], (data) => this.onOutput(data, true))
  }

  public flash() {
    this.startPROSCommand(['mu'], (data) => this.onOutput(data, false), (code, signal) => {
      this.openTerminal()
    })
  }

  private getEnv() {
    const env = process.env
    const envMod: { [key: string]: string } = {}
    // tslint:disable-next-line:forin
    for (const v in env) {
      envMod[v] = (env[v] as string)
    }
    return envMod
  }
  private startPROSCommand(args: string[],
                           onData: (data: string) => void,
                           overrideOnClose?: (exitCode: number, signal: number | undefined) => void) {
    if (this.currentProcess != null) {
      this.currentProcess.kill()
      this.currentProcess = null
    }
    this.currentProcess = spawn(this.prosExecutable, args, { cwd: this.prosProjectFolder, env: this.getEnv() })

    this.currentProcess.on('data', onData)
    this.currentProcess.on('exit', (overrideOnClose) ? overrideOnClose : this.onClose)
  }

  private onOutput(data: string, tryToParse: boolean = false) {
    if (!tryToParse) {
      this.onData({ type: 'message', data })
      return
    } else {
      try {
        const obj = JSON.parse(data)
        this.onData(obj)
      } catch (err) {
        this.onData({ type: 'error', data: 'onOutput: Cannot parse object' })
      }
    }
  }

  private onClose(code: number, signal: number | undefined) {
    this.onData({ type: 'error', data: `onClose: pty closed with code ${code} and signal ${signal}` })
    this.currentProcess = null
  }
}
