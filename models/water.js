const { handleMangooseError } = require('../helpers');
const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { dateRegexp } = require('../constants/regex');

const waterSchema = Schema(
  {
    date: {
      type: String,
      match: dateRegexp,
      required: true,
    },
    consumedAmountWater: {
      type: Number,
      required: true,
    },
    waterDailyNorma: {
      type: Number,
      min: 0.1,
      max: 5000,
      required: true,
    },
    consumedWaterDoses: {
      type: [
        {
          amount: {
            type: Number,
            min: 0.1,
            max: 5000,
            required: true,
          },
          time: Date,
        },
      ],
      default: [],
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

waterSchema.post('save', handleMangooseError);

const addWaterSchema = Joi.object({
  date: Joi.string().pattern(dateRegexp).required().empty(false).messages({
    'string.base': 'The date must be a string.',
    'any.required': 'The date field is required.',
    'string.empty': 'The date must not be empty.',
    'string.pattern.base': 'The date must be in format YYYY-MM-DD.',
  }),
  amount: Joi.number().min(0.1).max(5000).messages({
    'number.base': 'The amount must be a number.',
    'number.min': 'The amount must be greater than 0',
    'number.max': 'The amount must be less than 5000',
  }),
  time: Joi.date().iso().required().messages({
    'date.base': 'The time must be a date.',
    'any.required': 'The time field is required.',
    'date.iso': 'The time must be in ISO 8601 format.',
  }),
});
const updateWaterSchema = Joi.object({
  amount: Joi.number().min(0.1).max(5000).messages({
    'number.base': 'The amount must be a number.',
    'number.min': 'The amount must be greater than 0',
    'number.max': 'The amount must be less than 5000',
  }),
  time: Joi.date().iso().required().messages({
    'date.base': 'The time must be a date.',
    'any.required': 'The time field is required.',
    'date.iso': 'The time must be in ISO 8601 format.',
  }),
});

const Water = model('water', waterSchema);
const schemas = { addWaterSchema, updateWaterSchema };

module.exports = { Water, schemas };
