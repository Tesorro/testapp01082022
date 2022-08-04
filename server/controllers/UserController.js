import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { validationResult } from 'express-validator';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = UserModel({
      name: req.body.name,
      email: req.body.email,
      passwordHash: hash,
      photoUrl: req.body.photoUrl,
      birthday: req.body.birthday,
      gender: req.body.gender,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const user = await UserModel.findOne({ email: req.body.email });


    if (!user) {
      return res.status(404).json({
        message: 'Неверный логин или пароль',
      });
    }
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось авторизоваться',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};

export const updateInfo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const userInfo = req.body;

    const password = userInfo.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await UserModel.findOneAndUpdate({
      _id: userInfo.id,
    }, {
      name: userInfo.name,
      photoUrl: userInfo.photoUrl,
      passwordHash: hash,
    })

    const user = await UserModel.findById(userInfo.id)

    res.json(user)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.userId } });
    const usersList = users.map((user) => {
      const { _id, name, photoUrl, birthday } = user;
      return { _id, name, photoUrl, birthday };
    });
    res.status(200).json({ usersList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};
