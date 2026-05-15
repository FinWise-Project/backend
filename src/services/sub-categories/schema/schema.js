import Joi from 'joi';

export const subCategoryPayloadSchema = Joi.object({
  categoryId: Joi.string().required(),
  name: Joi.string().required().max(50),
});

export const subCategoryQuerySchema = Joi.object({
  categoryId: Joi.string().allow('').optional(),
  categoryName: Joi.string().allow('').optional(),
  subCategoryName: Joi.string().allow('').optional(),
});