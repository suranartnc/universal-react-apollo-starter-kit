import config from '../../../shared/configs'

export function outputError(error) {
  if (config.isProduction === false) {
    return error
  }
  throw new Error('Internal Server Error')
}
