import Joi from 'joi';

export const transactionPayloadSchema = Joi.object({
  date: Joi.date().required(),
  amount: Joi.number().required(),
  type: Joi.string().valid('income', 'expense').required(),
  subCategoryId: Joi.string().required(),
  paymentMethodId: Joi.string().required(),
  description: Joi.string().required(),
});

export const transactionUpdateSchema = Joi.object({
  date: Joi.date().optional(),
  amount: Joi.number().optional(),
  type: Joi.string().valid('income', 'expense').optional(),
  subCategoryId: Joi.string().optional(),
  paymentMethodId: Joi.string().optional(),
  description: Joi.string().optional(),
});

export const transactionQuerySchema = Joi.object({
  type: Joi.string().allow('').optional(),
  categoryId: Joi.string().allow('').optional(),
  categoryName: Joi.string().allow('').optional(),
});