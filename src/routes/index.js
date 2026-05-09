import { Router } from 'express';

const router = Router();

router.use('/', (req, res) => res.json({ message: 'Hello World!' }))

export default router