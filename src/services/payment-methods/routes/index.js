import express from 'express';
import {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  editPaymentMethod,
  deletePaymentMethod,
} from '../controller/payment-controller.js';
import validate from '../../../middlewares/validate.js';
import { validateQuery } from '../../../middlewares/validate.js';
import { paymenMethodQuerySchema, paymenMethodPayloadSchema } from '../schema/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.get('/payment-method', validateQuery(paymenMethodQuerySchema), getPaymentMethods);
router.get('/payment-method/:id', getPaymentMethodById);
router.post('/payment-method', authenticateToken, validate(paymenMethodPayloadSchema), createPaymentMethod);
router.put('/payment-method/:id', authenticateToken, validate(paymenMethodPayloadSchema), editPaymentMethod);
router.delete('/payment-method/:id', authenticateToken, deletePaymentMethod);

export default router;