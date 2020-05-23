import express from 'express';
import { authenticate } from '../middlewares/auth';
import { checkParamId, methodNotAllowed } from '../middlewares/route';
import { createDemo, deleteDemo, getDemo, getDemos, updateDemo } from '../controllers/demos';

const demos = express.Router();

demos.use(authenticate);

demos.route('/').get(getDemos).post(createDemo).all(methodNotAllowed);
demos
    .route('/:demoId')
    .all(checkParamId('demoId'))
    .get(getDemo)
    .put(updateDemo)
    .delete(deleteDemo)
    .all(methodNotAllowed);

export default demos;
