import express from 'express';
import { authenticate } from '../middlewares/auth';
import { checkDemoId, methodNotAllowed } from '../middlewares/route';
import { createDemo, deleteDemo, getDemo, getDemos, getDemosByUser, updateDemo } from '../controllers/demo';

const demos = express.Router();

demos.use(authenticate);

demos.route('/').get(getDemos).post(createDemo).all(methodNotAllowed);
demos.route('/:demoId').all(checkDemoId).get(getDemo).put(updateDemo).delete(deleteDemo).all(methodNotAllowed);
demos.route('/byUser/:userId').get(getDemosByUser).all(methodNotAllowed);

export default demos;
