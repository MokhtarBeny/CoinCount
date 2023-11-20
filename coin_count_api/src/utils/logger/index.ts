import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(info => {
          const { level, message, timestamp } = info;
          return `${level} : ${message} at ${timestamp}`;
        })
      ),
      level: 'error'
    }),
  
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(info => {
          const { level, message } = info;
          return `${level} : ${message}`;
        })
      ),
      level: 'info'
    })
  ]
});

export default logger;
  