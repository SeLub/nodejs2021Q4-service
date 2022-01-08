import { pino } from 'pino';
import { LOG_LEVEL } from './common/config.js';
const logLevel = LOG_LEVEL || 'info';
const transport = pino.transport({
    targets: [
        { level: logLevel, target: 'pino/file', options: { destination: 2, translateTime: 'SYS:standard' } },
        { level: logLevel, target: 'pino/file', options: { destination: './logs/full.log', mkdir: true } },
        { level: 'error', target: 'pino/file', options: { destination: './logs/error.log', mkdir: true } }
    ],
});
export const logger = pino(transport);
//# sourceMappingURL=logger.js.map