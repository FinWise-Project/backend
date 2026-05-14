import Joi from 'joi';

export const categoryPayloadSchema = Joi.object({
  name: Joi.string().required().max(50),
});

export const categoryQuerySchema = Joi.object({
  categoryId: Joi.string().empty(),
  categoryName: Joi.string().empty(),
});