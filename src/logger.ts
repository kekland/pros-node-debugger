import * as _chalk from 'chalk'
import * as moment from 'moment'
const chalk = _chalk.default

export class Logger {

  public static log(message: string, context?: string) {
    const msg = Logger._buildMsg(message, context)
    // tslint:disable-next-line:no-console
    Logger._write(console.log, `${chalk.green(msg)} ${chalk.gray(Logger._getDiff())}\n`)
  }

  public static warn(message: string, context?: string) {
    const msg = Logger._buildMsg(message, context)
    // tslint:disable-next-line:no-console
    Logger._write(console.warn, `${chalk.yellow(msg)} ${chalk.gray(Logger._getDiff())}\n`)
  }

  public static error(message: string, context?: string) {
    const msg = Logger._buildMsg(message, context)
    // tslint:disable-next-line:no-console
    Logger._write(console.error, `${chalk.red(msg)} ${chalk.gray(Logger._getDiff())}\n`)
  }
  private static lastTimestamp: number = -1
  private static _write(func: (message: string) => void, message: string) {
    func(message)
  }

  private static _getDiff(): string {
    if (Logger.lastTimestamp === -1) {
      Logger.lastTimestamp = moment.now()
    }
    const timestampNow = moment.now()
    const diff = timestampNow - Logger.lastTimestamp
    let diffString = (diff > 0) ? `+${diff}` : `${diff}`
    diffString += 'ms'
    Logger.lastTimestamp = moment.now()
    return diffString
  }

  private static _buildMsg(message: string, context?: string): string {
    let msg = ``
    if (context != null) {
      msg = `[${context}] ${message}`
    } else {
      msg = `[No Context] ${message}`
    }
    return msg
  }
}
