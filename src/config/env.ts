import dotenv from 'dotenv';
import { cleanEnv, str, port, url } from 'envalid'; // Import 'envalid' module

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: port({ default: 3000 }),
  CORS_DOMAINS: str(),
  HOST: str(),
  MONGO_URI: url(),
  LOG_LEVEL: str({
    desc: 'Log level for logger.',
    choices: ['', 'fatal', 'error', 'warn', 'info', 'debug', 'trace'],
    default: '',
  }),
});

export default env;

