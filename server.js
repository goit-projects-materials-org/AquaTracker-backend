import mongoose from 'mongoose';
// require('dotenv').config();
import app from './app.js';

mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGO_DB)
  .then(app.listen(process.env.PORT, () => console.log('Server running')))
  .catch((err) => {
    console.log(err.message);
    process.exit();
  });
