const { handleMangooseError} = require('../helpers');
const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { timeUTCRegexp } = require('../constants/regex');

const waterSchema = Schema(
  {
    date: {
      type: Date,
      required: true,
      match: timeUTCRegexp,
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
          time: {
            type: Date,
            required: true,
            match: timeUTCRegexp,
          },
        },
      ],
      default: [],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

waterSchema.post('save', handleMangooseError);

const addWaterSchema = Joi.object({
  amount: Joi.number().min(0.1).max(5000).messages({
    'number.base': 'The amount must be a number.',
    'number.min': 'The amount must be greater than 0',
    'number.max': 'The amount must be less than 5000',
  }),
  time: Joi.string().required().regex(timeUTCRegexp, { invert: false }).messages({
    'string.base': 'The time must be a string.',
    'any.required': 'The time field is required.',
    'string.pattern.base': 'The time must be in UTC format.',
  }),
});
const updateWaterSchema = Joi.object({
  amount: Joi.number().min(0.1).max(5000).messages({
    'number.base': 'The amount must be a number.',
    'number.min': 'The amount must be greater than 0',
    'number.max': 'The amount must be less than 5000',
  }),
  time: Joi.string().required().regex(timeUTCRegexp, { invert: false }).messages({
    'string.base': 'The time must be a string.',
    'any.required': 'The time field is required.',
    'string.pattern.base': 'The time must be in UTC format.',
  }),
});

const Water = model('water', waterSchema);
const schemas = { addWaterSchema, updateWaterSchema };

module.exports = { Water, schemas };
