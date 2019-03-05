import * as _chalk from 'chalk'
const chalk = _chalk.default
const config = {
  name: 'pros-node-debugger',
  version: '0.0.0'
}
export const getWelcomingMessage = () => {
  return `Welcome to ${chalk.green(config.name)}, version: ${chalk.gray(config.version)}`
}