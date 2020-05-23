import UsersService from '../services/UsersService';
import { authorizeUser } from '../utils/auth';
import { catchAsync } from '../utils/error';

export const createUser = catchAsync(async (req, res, next) => {
    const user = await UsersService.createUser(req.body);

    res.status(201).json({
        status: 'success',
        data: user
    });
});

export const getUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const user = await UsersService.getUser(userId);

    res.status(200).json({
        status: 'success',
        data: user
    });
});

export const getUsers = catchAsync(async (req, res, next) => {
    const users = await UsersService.getUsers(req.query);

    res.status(200).json({
        status: 'success',
        data: users
    });
});

export const updateUser = catchAsync(async (req, res, next) => {
    const existingUser = await UsersService.getUser(req.params.userId);

    authorizeUser(req.user.user_id, existingUser.user_id);

    const user = await UsersService.updateUser({ existingUser, data: req.body });

    res.status(200).json({
        status: 'success',
        data: user
    });
});

export const deleteUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    authorizeUser(req.user.user_id, userId);

    const user = await UsersService.deleteUser(userId);

    res.status(200).json({
        status: 'success',
        data: user
    });
});

export const loginUser = catchAsync(async (req, res, next) => {
    const user = await UsersService.loginUser(req.body);

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
