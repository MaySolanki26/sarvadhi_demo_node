/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express,{ Express } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

import * as routes from './routes/';
import { logger } from './logger/Logger';
import { environment } from './config';

dotenv.config();

/**
 * App Variables
 */
if (!environment.port) {
  process.exit(1);
}

const PORT: number = environment.port;

export class Server {

  private app: Express;

  constructor() {
    this.app = express();

    // Express middleware
    this.app.use(cors({
      optionsSuccessStatus: 200
    }));
    this.app.use(urlencoded({
      extended: true
    }));
    this.app.use(json());
    // this.app.use(expressValidator());
    this.app.listen(PORT, () => {
      logger.info(`--> Server successfully started at port ${PORT}`);
    });
    routes.initRoutes(this.app);
  }

  getApp() {
    return this.app;
  }
}
new Server();
