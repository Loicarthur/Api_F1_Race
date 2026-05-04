import winston from 'winston';

const { combine, timestamp, json, colorize, simple } = winston.format;

const isProd = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      format: isProd ? combine(timestamp(), json()) : combine(colorize(), simple()),
    }),
  ],
});
