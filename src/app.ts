import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import cors from 'cors';
import fs from 'fs';
import compression from 'compression';

import httpRouter from './router';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(compression());

app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
//doing console.log
app.use(logger('dev'));

const corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);

httpRouter(app);

const myApp: express.Application = app;

export default myApp;