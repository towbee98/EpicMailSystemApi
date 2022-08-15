import mongoose from 'mongoose';
import config from '../config/env';

// eslint-disable-next-line @typescript-eslint/ban-types
const ConnectToDB = async (cb: Function) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await mongoose.connect(`${config.MONGO_URI}`);
    console.log('Database connected succesfully');
    cb(config.PORT);
  } catch (err) {
    throw err;
  }
};

export default ConnectToDB;
