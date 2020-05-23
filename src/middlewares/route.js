import { generateAppError } from '../utils/error';

export const methodNotAllowed = (req, res, next) => {
    next(generateAppError('methodNotAllowed', 405));
};

// Check if parameter id is valid number
export const checkParamId = paramName => (req, res, next) => {
    const param = req.params[paramName];

    if (!Number(param)) {
        return next(generateAppError(`${paramName}NotValid`, 404));
    }

    next();
};
