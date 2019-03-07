import { existsSync } from 'fs'
import * as config from '../config/config'
import { Logger } from '../logger'
export class EnvironmentUtils {
  public static getConfigStrict(name: 'cliLocation' | 'projectLocation'): string {
    const exists = existsSync(config.default[name])
    if (!exists) {
      throw new Error(`Provided path ${config.default[name]} does not exist.`)
    }
    return config.default[name]
  }
}
