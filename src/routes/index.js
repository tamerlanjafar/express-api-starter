import express from 'express';
import users from './users';
import demos from './demos';

const router = express.Router();

router.use('/users', users);
router.use('/demos', demos);

export default router;
