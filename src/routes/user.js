import express from 'express';
import { authenticate } from '../middlewares/auth';
import { checkUserId, methodNotAllowed } from '../middlewares/route';
import { createUser, getUser, getUsers, updateUser, deleteUser, loginUser, getMe } from '../controllers/user';

const users = express.Router();

users.route('/').get(authenticate, getUsers).post(createUser).all(methodNotAllowed);
users.route('/login').post(loginUser).all(methodNotAllowed);
users.route('/getMe').get(authenticate, getMe).all(methodNotAllowed);
users
    .route('/:userId')
    .all(checkUserId)
    .get(authenticate, getUser)
    .put(authenticate, updateUser)
    .delete(authenticate, deleteUser)
    .all(methodNotAllowed);

export default users;
