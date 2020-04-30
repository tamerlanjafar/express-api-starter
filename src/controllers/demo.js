import DemoService from '../services/DemoService';
import { catchAsync } from '../utils/error';
import { authorizeUser } from '../utils/auth';

export const createDemo = catchAsync(async (req, res, next) => {
    const { user_id } = req.user;

    const demo = await DemoService.createDemo({ ...req.body, user_id });

    res.status(201).json({
        status: 'success',
        data: demo
    });
});

export const getDemo = catchAsync(async (req, res, next) => {
    const { demoId } = req.params;

    const demo = await DemoService.getDemo(demoId);

    res.status(200).json({
        status: 'success',
        data: demo
    });
});

export const getDemos = catchAsync(async (req, res, next) => {
    const { offset, limit, demo_name } = req.query;
    const query = { offset, limit, demo_name };

    const demos = await DemoService.getDemos(query);

    res.status(200).json({
        status: 'success',
        data: demos
    });
});

export const updateDemo = catchAsync(async (req, res, next) => {
    const existingDemo = await DemoService.getDemo(req.params.demoId);

    authorizeUser(req.user, existingDemo.user.user_id);

    const { demo_name } = req.body;
    const demoData = { demo_name };

    const demo = await DemoService.updateDemo({ existingDemo, demoData });

    res.status(200).json({
        status: 'success',
        data: demo
    });
});

export const deleteDemo = catchAsync(async (req, res, next) => {
    const { demoId } = req.params;

    const existingDemo = await DemoService.getDemo(demoId);

    authorizeUser(req.user, existingDemo.user.user_id);

    const demo = await DemoService.deleteDemo(demoId);

    res.status(200).json({
        status: 'success',
        data: demo
    });
});

export const getDemosByUser = catchAsync(async (req, res, next) => {
    const { offset, limit } = req.query;
    const query = { offset, limit };

    const { userId } = req.params;

    const demos = await DemoService.getDemosByUser(query, userId);

    res.status(200).json({
        status: 'success',
        data: demos
    });
});
