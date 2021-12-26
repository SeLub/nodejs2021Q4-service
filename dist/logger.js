import { pino } from 'pino';
const transport = pino.transport({
    targets: [
        { level: 'info', target: 'pino/file', options: { destination: 2, translateTime: 'SYS:standard' } },
        { level: 'trace', target: 'pino/file', options: { destination: './logs/full.log', mkdir: true } },
        { level: 'error', target: 'pino/file', options: { destination: './logs/error.log', mkdir: true } }
    ],
});
export const logger = pino(transport);
//# sourceMappingURL=logger.js.map