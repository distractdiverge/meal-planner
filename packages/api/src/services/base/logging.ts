import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { Environment } from './settings.service';

export enum LoggingLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

export interface Logger {
  log(level: LoggingLevel, message: string, meta?: object): void;
  debug(message: string, meta?: object): void;
  info(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
  error(message: string, meta?: object): void;
}

class WinstonLogger implements Logger {
  private readonly _instance: winston.Logger;

  constructor(env: Environment, level: LoggingLevel) {

    const transports: Transport[] = [];

    if (env === Environment.Production) {
      transports.push(
        new winston.transports.File({
          filename: 'meal-planner.log',
          tailable: true,
        })
      );
    } else {
      transports.push(
        new winston.transports.Console({ 
          format: winston.format.combine(winston.format.cli()) 
        })
      );
    }

    this._instance = winston.createLogger({
      level,
      transports,
    });
  }

  public log(level: LoggingLevel, msg: string, meta?: object): void {
    this._instance.log(level, msg, meta);
  }
  
  public debug = (msg: string, meta?: object): void => this.log(LoggingLevel.Debug, msg, meta);
  public info = (msg: string, meta?: object): void => this.log(LoggingLevel.Info, msg, meta);
  public warn = (msg: string, meta?: object): void => this.log(LoggingLevel.Warn, msg, meta);
  public error = (msg: string, meta?: object): void => this.log(LoggingLevel.Error, msg, meta);
}

const getInstance = (env: Environment, level: LoggingLevel = LoggingLevel.Error): Logger => 
  new WinstonLogger(env, level);

export default getInstance;