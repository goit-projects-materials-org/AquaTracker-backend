import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMangooseError } from '../helpers/handleMangooseError.js';

const waterSchema = Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    waterDailyNorma: {
      type: Number,
      min: 0.1,
      max: 5000,
      required: true,
    },
    amount: {
      type: Number,
      min: 0.1,
      max: 5000,
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
  date: Joi.date().iso().required().messages({
    'date.format': 'The date shoud be a valid ISO 8601 date format',
    'any.required': 'The date field is required.',
  }),
});
const updateWaterSchema = Joi.object({
  amount: Joi.number().min(0.1).max(5000).messages({
    'number.base': 'The amount must be a number.',
    'number.min': 'The amount must be greater than 0',
    'number.max': 'The amount must be less than 5000',
  }),
  date: Joi.date().iso().required().messages({
    'date.format': 'The date shoud be a valid ISO 8601 date format',
    'any.required': 'The date field is required.',
  }),
});

export const Water = model('water', waterSchema);
export const schemas = { addWaterSchema, updateWaterSchema };
