import express from 'express';
import { authenticate } from '../middlewares/auth';
import { checkParamId, methodNotAllowed } from '../middlewares/route';
import { createUser, getUser, getUsers, updateUser, deleteUser, loginUser, getMe } from '../controllers/users';
import { getDemosByUserId } from '../controllers/demos';

const users = express.Router();

users.route('/').get(authenticate, getUsers).post(createUser).all(methodNotAllowed);
users.route('/login').post(loginUser).all(methodNotAllowed);
users.route('/getMe').get(authenticate, getMe).all(methodNotAllowed);
users
    .route('/:userId')
    .all(checkParamId('userId'))
    .get(authenticate, getUser)
    .put(authenticate, updateUser)
    .delete(authenticate, deleteUser)
    .all(methodNotAllowed);
users.route('/:userId/demos').all(checkParamId('userId')).get(authenticate, getDemosByUserId).all(methodNotAllowed);

export default users;
