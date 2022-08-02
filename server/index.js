import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';

import { registerValidation, loginValidation, updateValidation } from './validations/auth.js';
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.log(err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.patch('/account', checkAuth, updateValidation, UserController.changeInfo);
app.get('/auth/me', checkAuth, UserController.getMe);
app.get('/people', checkAuth, UserController.getAllUsers);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server listening on port ' + process.env.PORT);
});
