import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
// import * as winstonDaily from 'winston-daily-rotate-file';
const { combine, timestamp, printf } = winston.format;
const dir = __dirname + '/../../../log';
// const dailyOptions = (level: string) => {
//   return {
//     level,
//     datePattern: 'YYYY-MM-DD',
//     dirname: dir + `/${level}`,
//     filename: `%DATE%.${level}`,
//     maxSize: '100M',
//     maxFiles: '30d',
//     extension: '.log',
//     zippedArchive: true, // gzip으로 압축 가능
//   };
// };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const warnFilter = winston.format((info, _opts) => {
  return info.level === 'warn' ? info : false;
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorFilter = winston.format((info, _opts) => {
  return info.level === 'error' ? info : false;
});
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
    process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.DailyRotateFile({
            datePattern: 'YYYY-MM-DD',
            dirname: dir + `/warn`,
            filename: `%DATE%.warn`,
            maxSize: '100M',
            maxFiles: '30d',
            extension: '.log',
            level: 'warn',
            format: combine(warnFilter(), logFormat),
            zippedArchive: true, // gzip으로 압축 가능
          }),
          new winston.transports.DailyRotateFile({
            datePattern: 'YYYY-MM-DD',
            dirname: dir + `/error`,
            filename: `%DATE%.error`,
            maxSize: '100M',
            maxFiles: '30d',
            extension: '.log',
            level: 'error',
            format: combine(errorFilter(), logFormat),
            zippedArchive: true, // gzip으로 압축 가능
          }),
          // new winstonDaily(dailyOptions('info')),
          // new winstonDaily(dailyOptions('warn')),
          // new winstonDaily(dailyOptions('error')),
        ]
      : [
          new winston.transports.Console({
            level: 'silly',
            format: winston.format.combine(
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              winston.format.errors({ stack: true }),
              utilities.format.nestLike('MOHEYUM', {
                prettyPrint: true,
              }),
            ),
          }),
        ],

  // transports: [
  //   process.env.NODE_ENV === 'production'
  //     ? new winstonDaily(dailyOptions('info'))
  //     : new winston.transports.Console({
  //         level: 'silly',
  //         format: winston.format.combine(
  //           winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  //           winston.format.errors({ stack: true }),
  //           utilities.format.nestLike('MOHEYUM', {
  //             prettyPrint: true,
  //           }),
  //         ),
  //       }),
  //   // new winston.transports.Console({
  //   //   level: process.env.NODE_ENV === 'production' ? 'warn' : 'silly',
  //   //   format:
  //   //     process.env.NODE_ENV === 'production'
  //   //       ? winston.format.simple() //production은 가볍게
  //   //       : winston.format.combine(
  //   //           winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  //   //           winston.format.errors({ stack: true }),
  //   //           utilities.format.nestLike('MOHEYUM', {
  //   //             prettyPrint: true,
  //   //           }),
  //   //         ),
  //   // }),
  //   //daily rotate
  //   // new winstonDaily(dailyOptions('warn')),
  //   // new winstonDaily(dailyOptions('error')),
  // ],
});
