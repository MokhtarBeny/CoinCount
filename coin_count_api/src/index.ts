import app from './app';
import logger from './utils/logger';
import osf from './utils/osf';
import database from './utils/database';
import dotenv from 'dotenv';
import { cryptoDataFetch } from './services/crypto/initializeCryptoDataFetch';




dotenv.config();
const port = process.env.PORT || 3000;


// cryptoDataFetch();


app.use((req, res, next) => {
  // Extract the IP address from the request
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Log the IP address along with the request method and path
  logger.info(`IP: ${ip}, Method: ${req.method}, Path: ${req.path}`);

  next();
});


app.listen(port, async () => {
  const networkIp = osf.getNetworkIp();
  console.clear();
  await database();
  logger.info(`Server running on port ${port}`);
  logger.info(`Local: http://localhost:${port}`);
  logger.info(`Network: http://${networkIp}:${port}`);
});
