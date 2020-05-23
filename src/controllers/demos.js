import DemosService from '../services/DemosService';
import { catchAsync } from '../utils/error';
import { authorizeUser } from '../utils/auth';

export const createDemo = catchAsync(async (req, res, next) => {
    const { user_id } = req.user;

    const demo = await DemosService.createDemo({ ...req.body, user_id });

    res.status(201).json({
        status: 'success',
        data: demo
    });
});

export const getDemo = catchAsync(async (req, res, next) => {
    const { demoId } = req.params;

    const demo = await DemosService.getDemo(demoId);

    res.status(200).json({
        status: 'success',
        data: demo
    });
});

export const getDemos = catchAsync(async (req, res, next) => {
    const demos = await DemosService.getDemos(req.query);

    res.status(200).json({
        status: 'success',
        data: demos
    });
});

export const updateDemo = catchAsync(async (req, res, next) => {
    const existingDemo = await DemosService.getDemo(req.params.demoId);

    authorizeUser(req.user.user_id, existingDemo.user.user_id);

    const demo = await DemosService.updateDemo({ existingDemo, data: req.body });

    res.status(200).json({
        status: 'success',
        data: demo
    });
});

export const deleteDemo = catchAsync(async (req, res, next) => {
    const { demoId } = req.params;

    const existingDemo = await DemosService.getDemo(demoId);

    authorizeUser(req.user.user_id, existingDemo.user.user_id);

    const demo = await DemosService.deleteDemo(demoId);

    res.status(200).json({
        status: 'success',
        data: demo
    });
});

export const getDemosByUserId = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const demos = await DemosService.getDemosByUserId(req.query, userId);

    res.status(200).json({
        status: 'success',
        data: demos
    });
});
