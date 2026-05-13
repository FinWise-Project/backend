import express from 'express';
import {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  getSubCategoryByCategory,
  editSubCategory,
  deleteSubCategory,
} from '../controller/sub-category-controller.js';
import validate from '../../../middlewares/validate.js';
import { validateQuery } from '../../../middlewares/validate.js';
import { subCategoryQuerySchema, subCategoryPayloadSchema } from '../schema/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.get('/sub-categories', validateQuery(subCategoryQuerySchema), getSubCategories);
router.get('/sub-categories/:id', getSubCategoryById);
router.get('/categories/:categoryId/sub-categories', getSubCategoryByCategory);
router.post('/sub-categories', authenticateToken, validate(subCategoryPayloadSchema), createSubCategory);
router.put('/sub-categories/:id', authenticateToken, validate(subCategoryPayloadSchema), editSubCategory);
router.delete('/sub-categories/:id', authenticateToken, deleteSubCategory);

export default router;