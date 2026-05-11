import express from 'express';
import {
  register,
  login,
  refreshAccessToken,
  logout,
} from '../controller/auth-controller.js';
import validate from '../../../middlewares/validate.js';
import { validateQuery } from '../../../middlewares/validate.js';
import {
  registerPayloadSchema,
  registerQuerySchema,
  loginPayloadSchema,
  refreshTokenSchema,
  logoutSchema,
} from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.post('/register', validate(registerPayloadSchema), register);
router.post('/login', validate(loginPayloadSchema), login);
router.put('/login', validate(refreshTokenSchema), refreshAccessToken);
router.delete('/logout', authenticateToken, validate(logoutSchema), logout);

export default router;