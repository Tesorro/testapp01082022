import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import mongoose from 'mongoose';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';

import { registerValidation, loginValidation } from './validations/auth.js';
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', loginValidation, UserController.login);
app.post('/account/change', checkAuth, UserController.changeInfo);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server listening on port ' + process.env.PORT);
});
