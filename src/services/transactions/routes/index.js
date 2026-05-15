import express from 'express';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  editTransaction,
  deleteTransaction
} from '../controller/transaction-controller.js';
import validate from '../../../middlewares/validate.js';
import { validateQuery } from '../../../middlewares/validate.js';
import { transactionPayloadSchema, transactionQuerySchema, transactionUpdateSchema } from '../schema/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.get('/transactions', validateQuery(transactionQuerySchema), getTransactions);
router.get('/transactions/:id', getTransactionById);
router.post('/transactions', authenticateToken, validate(transactionPayloadSchema), createTransaction);
router.put('/transactions/:id', authenticateToken, validate(transactionUpdateSchema), editTransaction);
router.delete('/transactions/:id', authenticateToken, deleteTransaction);

export default router;