import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
// import * as winstonDaily from 'winston-daily-rotate-file';
const { combine, timestamp, printf } = winston.format;
const dir = __dirname + '/../../../log/';

const dailyOptions = (level: string, skip: boolean) => {
  return {
    datePattern: 'YYYY-MM-DD',
    dirname: dir,
    filename: `%DATE%`,
    maxSize: '100M',
    maxFiles: '30d',
    extension: '.log',
    level: level,
    silent: skip,
    format: logFormat,
    zippedArchive: true, // gzip으로 압축 가능
  };
};
const consoleOptions = (level: string, skip: boolean) => {
  return {
    level: level,
    silent: skip,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      utilities.format.nestLike('MOHEYUM', {
        prettyPrint: true,
      }),
    ),
  };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const warnFilter = winston.format((info, _opts) => {
//   return info.level === 'warn' ? info : false;
// });
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const errorFilter = winston.format((info, _opts) => {
//   return info.level === 'error' ? info : false;
// });
const logFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  printf((info) => {
    if (info.stack)
      return `${info.timestamp} ${info.level}: ${info.message} \n Error Stack : ${info.stack}`;
    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

export const winstonLogger = WinstonModule.createLogger({
  format: logFormat,
  transports:
    process.env.SKIP_LOG !== 'true' || !process.env.SKIP_LOG
      ? process.env.NODE_ENV === 'production'
        ? [new winston.transports.DailyRotateFile(dailyOptions('warn', false))]
        : [new winston.transports.Console(consoleOptions('silly', false))]
      : process.env.NODE_ENV === 'production'
      ? [new winston.transports.DailyRotateFile(dailyOptions('warn', true))]
      : [new winston.transports.Console(consoleOptions('silly', true))],
});
