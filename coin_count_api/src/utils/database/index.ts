import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../logger';
dotenv.config();
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;
const dbName = process.env.DB_NAME as string;
const connectionString: string = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

const options: mongoose.ConnectOptions = {
};

const connection = ()=>{
  mongoose.connect(connectionString, options)
    .then(() => logger.info('Connected to MongoDB'))
    .catch((err: Error) => logger.error(err.message));
}

export default connection;
