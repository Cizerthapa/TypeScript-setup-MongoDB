import pino from 'pino'
import env from './env'

const logger = pino({
  level: env.LOG_LEVEL || env.isDev ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS: dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
      colorize: true,
    },
  },
})

export default logger
