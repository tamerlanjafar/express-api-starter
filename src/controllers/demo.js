import DemoService from '../services/DemoService';
import { catchAsync, generateAppError } from '../utils/error';
import { authorizeUser } from '../utils/auth';

// @desc        Create new demos
// @route       POST /api/v1/demos
// @access      Private
export const createDemo = catchAsync(async (req, res, next) => {
    const { user_id } = req.user;

    const demo = await DemoService.createDemo({ ...req.body, user_id });

    res.status(200).json({
        status: 'success',
        data: demo
    });
});

// @desc        Get demo
// @route       GET /api/v1/demos/:id
// @access      Private
export const getDemo = catchAsync(async (req, res, next) => {
    const { demoId } = req.params;

    const demo = await DemoService.getDemo(demoId);

    res.status(200).json({
        status: 'success',
        data: demo
    });
});

// @desc        Get demos
// @route       GET /api/v1/demos
// @access      Private
export const getDemos = catchAsync(async (req, res, next) => {
    const { demo_name } = req.query;
    const query = { demo_name };

    const demos = await DemoService.getDemos(query);

    res.status(200).json({
        status: 'success',
        data: demos
    });
});

// @desc        Update demo
// @route       PUT /api/v1/demos/:id
// @access      Private
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

// @desc        Delete demo
// @route       DELETE /api/v1/demos/:id
// @access      Private
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

// @desc        Get demos by user id
// @route       GET /api/v1/demos/byUser/:userId
// @access      Private
export const getDemosByUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;

    const demos = await DemoService.getDemosByUser(userId);

    res.status(200).json({
        status: 'success',
        data: demos
    });
});
