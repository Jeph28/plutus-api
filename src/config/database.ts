import mongoose from 'mongoose';
import CONFIGURATION from './config';

export default {
  connect: async () => {
    try {
      mongoose.Promise = global.Promise;
      mongoose.set('strictQuery', false);
      await mongoose.connect(CONFIGURATION.databaseURI!, {
        tls: true,
      });

      // Prints initialization
      console.log('****************************');
      console.log('*    DB started');
      console.log(`*    Database: ${CONFIGURATION.databaseName}`);
      console.log(`*    DB Connection: OK\n****************************\n`);
      return mongoose;
    } catch (error) {
      console.log(`Error connecting to DB: ${error}`);
    }
  },
};
