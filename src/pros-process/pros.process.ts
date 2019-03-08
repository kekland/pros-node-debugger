import { IPty, spawn } from 'node-pty'
import { Readable, Writable } from 'stream'
import stripAnsi from 'strip-ansi'
import { Logger } from '../logger'

export class PROSProcess {
  public isFlashing: boolean
  private currentProcess: IPty | null
  private prosExecutable: string
  private prosProjectFolder: string
  private onData: (data: object) => void
  private buffer: string = ''

  constructor(onData: (data: object) => void, prosExecutableFolder: string, prosProjectFolder: string) {
    this.currentProcess = null
    this.prosExecutable = prosExecutableFolder
    this.prosProjectFolder = prosProjectFolder
    this.onData = onData
    this.isFlashing = false
  }

  public openTerminal() {
    this.startPROSCommand(['terminal'], (data) => this.onOutput(data, true))
  }

  public flash() {
    this.isFlashing = true
    this.startPROSCommand(['mu'], (data) => this.onOutput(data, false), (code, signal) => {
      this.currentProcess = null
      this.isFlashing = false
      this.openTerminal()
    })
  }

  private fixData(incData: string): string {
    let data = stripAnsi(incData)
    data = data.replace('\n', '')
    data = data.replace('\r', '')
    return data
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
                           overrideOnExit?: (exitCode: number, signal: number | undefined) => void) {
    if (this.currentProcess != null) {
      this.currentProcess.kill()
      this.currentProcess = null
    }
    this.currentProcess = spawn(this.prosExecutable, args,
      { cwd: this.prosProjectFolder, env: this.getEnv(), cols: 10000 })

    this.currentProcess.on('data', onData)
    this.currentProcess.on('exit', (overrideOnExit) ? overrideOnExit : (code, signal) => this.onExit(code, signal))
  }

  private onOutput(incomingData: string, tryToParse: boolean = false) {
    const data = this.fixData(incomingData)
    if (data.length < 5) {
      return
    }
    if (!tryToParse) {
      this.onData({ type: 'message', data })
    } else {
      try {
        const obj = JSON.parse(data)
        this.onData(obj)
      } catch (err) {
        this.onData({ type: 'message', data, meta: { cannotParse: true } })
      }
    }
  }

  private onExit(code: number, signal: number | undefined) {
    this.onData({ type: 'error', data: `onExit: pty closed with code ${code} and signal ${signal}` })
    this.currentProcess = null
  }
}
