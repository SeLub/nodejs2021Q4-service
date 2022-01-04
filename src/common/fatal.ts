import { logErrDetails } from './logger.js'

/**
 *
 * @param err
 */
function errorHandler(err: object) {
  logErrDetails( { error: err, message: 'Error occurred in REST Service Fastify server!' } )
}

/**
 * Makes sure that the process doesn't shut down
 * for any uncaught errors – and logs them to
 * for easier debugging.
 */
export const handleUncaughtErrors = () => {
  process.on('unhandledRejection', errorHandler)
  process.on('uncaughtException', errorHandler)
}

/**
 *
 */
export const handleExit = () => {
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    process.exit(0)
  })

  process.on('exit', () => {
    process.exit(0)
  })
}
