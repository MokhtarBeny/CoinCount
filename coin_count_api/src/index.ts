import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from '@/utils/logger';
import osf from "@/utils/osf";
import fs from 'fs';
import database from "@utils/database";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(morgan('dev'));

const port = process.env.PORT || 3000;

fs.readdirSync("./src/routes").map((file) => {
  app.use("/api", require(`./routes/${file}`));
});


app.listen(port,async () => {
  const networkIp = osf.getNetworkIp();
  console.clear();
  await database();
  logger.info(`Server running on port ${port}`);
  logger.info(`Local: http://localhost:${port}`);
  logger.info(`Network: http://${networkIp}:${port}`);
});
