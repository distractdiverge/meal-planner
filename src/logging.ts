import { createLogger, transports, format } from 'winston';
import { __, partial } from 'ramda';

enum LoggingLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

const logger = createLogger({
    level: LoggingLevel.Debug,
    transports: [
        new transports.Console({
          format: format.combine(
              format.colorize(),
              format.cli(),
          )
        })
    ]
});

const log = (level:LoggingLevel, msg:string, meta:any = undefined):void => { logger.log(level, msg, meta); return; };
const logDebug = partial(log, [LoggingLevel.Debug]);
const logInfo = partial(log, [LoggingLevel.Info]);
const logWarn = partial(log, [LoggingLevel.Warn]);
const logError = partial(log, [LoggingLevel.Error]);

export {
    log,
    logDebug,
    logInfo,
    logWarn,
    logError,
    LoggingLevel,
}