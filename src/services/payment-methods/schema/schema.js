import Joi from 'joi';

export const paymenMethodPayloadSchema = Joi.object({
  name: Joi.string().required().max(50),
});

export const paymenMethodQuerySchema = Joi.object({
  name: Joi.string().empty(),
});