import express,{ Express } from 'express';
// import * as subdomain from 'express-subdomain';
import * as apiRoutes from './users.routes';
import * as adminRoutes from './admin.routes';

export function initRoutes(app: Express) {
  app.use('/api/v1/user', apiRoutes.initRoutes(app, express.Router()));
  app.use('/api/v1/admin', adminRoutes.initRoutes(app, express.Router()));
  app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to SARVADHI world!!' }));
}

