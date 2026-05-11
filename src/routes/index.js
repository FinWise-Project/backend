import { Router } from 'express';
import auth from '../services/auth/routes/index.js';

const router = Router();

router.use('/', auth);

export default router;