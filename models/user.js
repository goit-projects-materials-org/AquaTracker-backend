import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMangooseError } from '../helpers/handleMangooseError.js';
import { emailRegexp } from '../constants/regex.js';

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name'],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    avatarURL: {
      type: String || null,
      default: null,
    },
    gender: {
      type: String || null,
      enum: ['male', 'female', null],
      default: null,
    },
    weight: {
      type: Number || null,
      validate: {
        validator: function (value) {
          return value === null || (value <= 300 && value >= 30);
        },
        message: 'Weight must be greater that 30 or equal to 30 and less than or equal to 300',
      },
      default: null,
    },
    activeTime: {
      type: Number || null,
      validate: {
        validator: function (value) {
          return value === null || value >= 0;
        },
        message: 'ActiveTime must be greater that 0',
      },
      default: null,
    },
    waterDailyNorma: {
      type: Number,
      min: 0.1,
      max: 5000,
      default: 2000,
    },
    password: {
      type: String,
      minlength: 7,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleMangooseError);

const signupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().min(7).required().empty(false).messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.empty': 'The password must not be empty.',
    'string.min': 'The password must be not less 7 symbols.',
  }),
});
const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    'string.base': 'The email must be a string.',
    'any.required': 'The email field is required.',
    'string.empty': 'The email must not be empty.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  password: Joi.string().min(7).required().empty(false).messages({
    'string.base': 'The password must be a string.',
    'any.required': 'The password field is required.',
    'string.empty': 'The password must not be empty.',
    'string.min': 'The password must be not less 7 symbols.',
  }),
});
const updateUserSchema = Joi.object({
  name: Joi.string().messages({
    'string.base': 'The name must be a string.',
  }),
  email: Joi.string().pattern(emailRegexp).messages({
    'string.base': 'The email must be a string.',
    'string.pattern.base': 'The email must be in format test@gmail.com.',
  }),
  gender: Joi.string().valid('male', 'female').messages({
    'string.base': 'The gender field must be a string',
    'any.only': "Invalid gender. Allowed values are 'male', 'female'",
  }),
  weight: Joi.number().min(30).max(300).messages({
    'number.base': 'The weight must be a number.',
    'number.min': 'The weight must be greater than or equal to 30',
    'number.max': 'The weight must be less than or equal to 300',
  }),
  activeTime: Joi.number().min(0.1).max(24).messages({
    'number.base': 'The activeTime must be a number.',
    'number.min': 'The activeTime must be greater than 0',
    'number.max': 'The activeTime must be less than 24',
  }),
  waterDailyNorma: Joi.number().min(0.1).max(5000).messages({
    'number.base': 'The waterDailyNorma must be a number.',
    'number.min': 'The waterDailyNorma must be greater than 0',
    'number.max': 'The waterDailyNorma must be less than 5000',
  }),
  date: Joi.date().iso().required().messages({
    'date.format': 'The date shoud be a valid ISO 8601 date format',
    'any.required': 'The date field is required.',
  }),
});

export const User = model('user', userSchema);
export const schemas = { signupSchema, signinSchema, updateUserSchema };
