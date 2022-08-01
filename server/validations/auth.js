import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть не короче 8 символов').isLength({ min: 8 }),
  body('name', 'Укажите имя').isLength({ min: 1 }),
  body('birthday').optional(),
  body('gender').optional(),
  body('photoUrl').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть не короче 8 символов').isLength({ min: 8 }),
];
