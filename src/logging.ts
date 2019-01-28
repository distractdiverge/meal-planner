import { createLogger, transports, format } from 'winston';
import { curry } from 'ramda';

enum LoggingLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

const logger = createLogger({
    level: LoggingLevel.Warn,
    transports: [
        new transports.Console({
          format: format.combine(
              format.colorize(),
              format.cli(),
          )
        })
    ]
});

const log = curry((level:LoggingLevel, msg:string, meta?:object):void => { logger.log(level, msg, meta); return; });
const logDebug = log(LoggingLevel.Debug);
const logInfo = log(LoggingLevel.Info);
const logWarn = log(LoggingLevel.Warn);
const logError = log(LoggingLevel.Error);

export {
    log,
    logDebug,
    logInfo,
    logWarn,
    logError,
    LoggingLevel,
}