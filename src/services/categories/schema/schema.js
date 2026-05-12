import Joi from 'joi';

export const categoryPayloadSchema = Joi.object({
  name: Joi.string().required().max(50),
});

export const categoryQuerySchema = Joi.object({
  name: Joi.string().empty(),
});