require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import './database';

import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import fotoRoutes from './routes/foto';
import studentRoutes from './routes/student';
import municipioRoutes from './routes/municipio';
import cursoRoutes from './routes/curso';

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
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/user', userRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use('/post', postRoutes);
    this.app.use('/municipio', municipioRoutes);
    this.app.use('/foto', fotoRoutes);
    this.app.use('/curso', cursoRoutes);
    this.app.use('/student', studentRoutes);
  }
}

export default new App().app;
