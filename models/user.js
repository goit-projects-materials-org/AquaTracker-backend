const { handleMangooseError, HttpError } = require('../helpers');
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

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
      default: null
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: false,
    },
    waterDailyNorma: {
      type: Number,
      default: 2000
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
    'string.min': 'The password must be not less 7 symbols.'
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
    'string.min': 'The password must be not less 7 symbols.'
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
  waterDailyNorma: Joi.number().messages({
    'string.base': 'The waterDailyNorma must be a number.',
  }),
});


const User = model('user', userSchema);
const schemas = { signupSchema, signinSchema, updateUserSchema };

module.exports = { User, schemas };
