require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { resolve } from 'path';
import './database';

import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import fotoRoutes from './routes/foto';

const whiteList = ['http://localhost:8080', 'http://localhost:3333'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not alowwed by cors'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
      })
    );
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/user', userRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use('/post', postRoutes);
    this.app.use('/foto', fotoRoutes);
  }
}

export default new App().app;
// module.exports = new App().app;
