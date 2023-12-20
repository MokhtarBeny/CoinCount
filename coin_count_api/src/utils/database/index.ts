import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../logger';

const getDbName = (): string => {
  const env = process.env.NODE_ENV || 'development';
  switch (env) {
    case 'test':
      return process.env.DB_NAME_TEST || "coin_count";
    case 'production':
      return process.env.DB_NAME_PROD || "coin_count";
    default:
      return process.env.DB_NAME_DEV || "coin_count";
  }
};


dotenv.config();
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;
const dbName = getDbName();




const genConnectionString = (db: string = dbName): string => {
  return `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${db}?retryWrites=true&w=majority`;
}

const options: mongoose.ConnectOptions = {

};

const connection = (db: string = dbName) => {
  mongoose.connect(genConnectionString(db), options)
    .then(() =>
      logger.info('Connected to MongoDB'))
    .catch((err: Error) => logger.error(err.message));
}

export default connection;
