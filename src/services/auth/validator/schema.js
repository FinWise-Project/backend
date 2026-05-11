import Joi from 'joi';

export const registerPayloadSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
});

export const registerQuerySchema = Joi.object({
  name: Joi.string().allow('').optional(),
  email: Joi.string().allow('').optional(),
});

export const loginPayloadSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const logoutSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

