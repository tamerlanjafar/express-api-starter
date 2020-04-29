import { generateAppError } from '../utils/error';

export const methodNotAllowed = (req, res, next) => {
    next(generateAppError('methodNotAllowed', 405));
};

// Check if :userId is number
export const checkUserId = (req, res, next) => {
    const { userId } = req.params;

    if (!Number(userId)) {
        return next(generateAppError('userNotFound', 404));
    }

    next();
};

// Check if :demoId is number
export const checkDemoId = (req, res, next) => {
    const { demoId } = req.params;

    if (!Number(demoId)) {
        return next(generateAppError('demoNotFound', 404));
    }

    next();
};
