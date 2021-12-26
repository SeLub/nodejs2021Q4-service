import { pino } from 'pino';
import { LOG_LEVEL } from './common/config.js';
let log_level = LOG_LEVEL ? LOG_LEVEL : 'info';
const transport = pino.transport({
    targets: [
        { level: log_level, target: 'pino/file', options: { destination: 2, translateTime: 'SYS:standard' } },
        { level: log_level, target: 'pino/file', options: { destination: './logs/full.log', mkdir: true } },
        { level: 'error', target: 'pino/file', options: { destination: './logs/error.log', mkdir: true } }
    ],
});
export const logger = pino(transport);
//# sourceMappingURL=logger.js.map