import { Router } from 'express';
import auth from '../services/auth/routes/index.js';
import category from '../services/categories/routes/index.js';
import subCategories from '../services/sub-categories/routes/index.js';
import paymentMethods from '../services/payment-methods/routes/index.js';

const router = Router();

router.use('/', auth);
router.use('/', category);
router.use('/', subCategories);
router.use('/', paymentMethods);

export default router;