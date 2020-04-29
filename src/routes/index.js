import express from 'express';
import users from './user';
import demos from './demo';

const router = express.Router();

router.use('/users', users);
router.use('/demos', demos);

export default router;
