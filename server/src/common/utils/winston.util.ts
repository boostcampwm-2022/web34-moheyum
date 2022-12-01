import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

const dir = __dirname + '/../../../log';
const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: dir + `/${level}`,
    filename: `%DATE%.${level}`,
    maxSize: '100M',
    maxFiles: '30d',
    extension: '.log',
    zippedArchive: true, // 보관된 로그파일이
  };
};

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'silly',
      format:
        process.env.NODE_ENV === 'production'
          ? winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              utilities.format.nestLike('MOHEYUM', {
                prettyPrint: true,
              }),
            ),
    }),
    //daily rotate
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
});
