import { logErrDetails } from './logger.js';
function errorHandler(err) {
    logErrDetails({ error: err, message: 'Error occurred in REST Service Fastify server!' });
}
export const handleUncaughtErrors = () => {
    process.on('unhandledRejection', errorHandler);
    process.on('uncaughtException', errorHandler);
};
export const handleExit = () => {
    process.on('SIGINT', () => {
        process.exit(0);
    });
    process.on('exit', () => {
        process.exit(0);
    });
};
//# sourceMappingURL=fatal.js.map