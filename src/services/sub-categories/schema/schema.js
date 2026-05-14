import Joi from 'joi';

export const subCategoryPayloadSchema = Joi.object({
  categoryId: Joi.string().required(),
  name: Joi.string().required().max(50),
});

export const subCategoryQuerySchema = Joi.object({
  categoryId: Joi.string().empty(),
  categoryName: Joi.string().empty(),
  subCategoryName: Joi.string().empty(),
});