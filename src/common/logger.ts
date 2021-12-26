import server from '../server.js'

/**
 *
 * @param message
 * @param error
 * @param additionalData
 */
export const logErrDetails = ({ message = '', error = {}, additionalData = {} }) => {
  server.log.error(error, message, additionalData)
}

/**
 *
 * @param message
 * @param additionalData
 */
export const logInfoDetails = ({ message = '', additionalData = {} }) => {
  server.log.info(message, additionalData)
}