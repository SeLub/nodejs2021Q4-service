import server from '../server.js';
export const logErrDetails = ({ message = '', error = {}, additionalData = {} }) => {
    server.log.error(error, message, additionalData);
};
export const logInfoDetails = ({ message = '', additionalData = {} }) => {
    server.log.info(message, additionalData);
};
//# sourceMappingURL=logger.js.map