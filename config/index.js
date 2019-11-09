import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV;

const baseConfig = {
  env,
  isDev: env === 'development',
  isStage: env === 'stage',
  isProd: env === 'production',
  port: process.env.API_PORT,
};

export const clientId = process.env.CLIENT_ID;
export const db = {
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
};

const envConfig = {
  clientId,
};

export default { ...baseConfig, ...envConfig };
