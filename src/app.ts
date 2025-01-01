import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/routes';
import database from './config/database';
import CONFIGURATION from './config/config';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    process.removeAllListeners('warning');
  }

  private routes(): void {
    this.app.use('/api/v1', routes);
  }

  private mongoSetup(): void {
    database.connect();
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
      database.connect();
    });
    mongoose.connection.once('open', () => {
      console.log('MongoDB connection established successfully');
    });
  }
}

const port = CONFIGURATION.port || 3000;
new App().app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
