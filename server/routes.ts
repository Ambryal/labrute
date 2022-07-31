/* eslint-disable @typescript-eslint/no-misused-promises */
import { Express, Request, Response } from 'express';
import path from 'path';
import Brutes from './endpoints/Brutes.js';
import Logs from './endpoints/Logs.js';
import OAuth from './endpoints/OAuth.js';
import Users from './endpoints/Users.js';

const initRoutes = (app: Express) => {
  app.get('/api', (req: Request, res: Response) => res.status(200).send({
    message: 'server is running!',
  }));

  // OAuth
  app.get('/api/oauth/redirect', OAuth.redirect);
  app.get('/api/oauth/token', OAuth.token);

  // User
  app.post('/api/user/authenticate', Users.authenticate);

  // Brute
  app.get('/api/brute/list', Brutes.list);
  app.get('/api/brute/:name', Brutes.get);
  app.get('/api/brute/:name/available', Brutes.isNameAvailable);
  app.post('/api/brute/create', Brutes.create);
  app.get('/api/brute/:name/start-level-up', Brutes.startLevelUp);
  app.post('/api/brute/:name/save-destiny-choices', Brutes.saveDestinyChoices);
  app.post('/api/brute/:name/level-up', Brutes.levelUp);
  app.get('/api/brute/:name/get-opponents/:level', Brutes.getOpponents);

  // Log
  app.get('/api/log/list/:id', Logs.list);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
};

export default initRoutes;