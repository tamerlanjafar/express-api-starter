import UserService from '../services/UserService';
import { authorizeUser } from '../utils/auth';
import { catchAsync } from '../utils/error';

export const createUser = catchAsync(async (req, res, next) => {
    const user = await UserService.createUser(req.body);

    res.status(201).json({
        status: 'success',
        data: user
    });
});

export const getUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = await UserService.getUser(userId);

    res.status(200).json({
        status: 'success',
        data: user
    });
});

export const getUsers = catchAsync(async (req, res, next) => {
    const { offset, limit } = req.query;
    const query = { offset, limit };

    const users = await UserService.getUsers(query);

    res.status(200).json({
        status: 'success',
        data: users
    });
});

export const updateUser = catchAsync(async (req, res, next) => {
    const existingUser = await UserService.getUser(req.params.userId);

    authorizeUser(req.user, existingUser.user_id);

    const { first_name, last_name, password } = req.body;
    const userData = { first_name, last_name, password };

    const user = await UserService.updateUser({ existingUser, userData });

    res.status(200).json({
        status: 'success',
        data: user
    });
});

export const deleteUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    authorizeUser(req.user, userId);

    const user = await UserService.deleteUser(userId);

    res.status(200).json({
        status: 'success',
        data: user
    });
});

export const loginUser = catchAsync(async (req, res, next) => {
    const user = await UserService.loginUser(req.body);

    res.status(200).json({
        status: 'success',
        data: user
    });
});

export const getMe = catchAsync(async (req, res, next) => {
    const { user } = req;

    res.status(200).json({
        status: 'success',
        data: user
    });
});
