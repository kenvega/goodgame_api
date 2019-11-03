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
export const mysqlPort = process.env.MYSQL_PORT;

const envConfig = {
  mysqlPort,
  clientId,
};

export default { ...baseConfig, ...envConfig };
