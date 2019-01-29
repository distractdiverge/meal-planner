import { createLogger, transports, format } from 'winston';

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
              format.cli()
          )
        })
    ]
});

const log = (level:LoggingLevel, msg:string, meta?:any):void => { logger.log(level, msg, meta); return; };
const logDebug = (msg: string, meta?: object) => log(LoggingLevel.Debug, msg, meta);
const logInfo = (msg: string, meta?: object) => log(LoggingLevel.Info, msg, meta);
const logWarn = (msg: string, meta?: object) => log(LoggingLevel.Warn, msg, meta);
const logError = (msg: string, meta?: object) => log(LoggingLevel.Error, msg, meta);

export {
    log,
    logDebug,
    logInfo,
    logWarn,
    logError,
    LoggingLevel,
}