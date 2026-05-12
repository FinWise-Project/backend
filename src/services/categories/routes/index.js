import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  editCategory,
  deleteCategory,
} from '../controller/category-controller.js';
import validate from '../../../middlewares/validate.js';
import { validateQuery } from '../../../middlewares/validate.js';
import { categoryQuerySchema, categoryPayloadSchema } from '../schema/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.get('/categories', validateQuery(categoryQuerySchema), getCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', authenticateToken, validate(categoryPayloadSchema), createCategory);
router.put('/categories/:id', authenticateToken, validate(categoryPayloadSchema), editCategory);
router.delete('/categories/:id', authenticateToken, deleteCategory);

export default router;