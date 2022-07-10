import mongoose from 'mongoose';
import config from '../config/env';
//console.log(config.MONGO_URI)
const ConnectToDB = async (cb: Function) => {
  try {
    await mongoose.connect(`${config.MONGO_URI}`);
    console.log('Database connected succesfully');
    cb(config.PORT);
  } catch (err) {
    throw err;
  }
};

export default ConnectToDB;
