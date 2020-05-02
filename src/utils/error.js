import { validationMessages } from '../constants/validation';

class AppError extends Error {
    constructor(error, statusCode) {
        const { message, messageKey } = error;

        super(message);

        this.statusCode = statusCode;
        this.messageKey = messageKey;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const generateAppError = (messageKey, statusCode) => {
    return new AppError(
        {
            message: validationMessages[messageKey],
            messageKey
        },
        statusCode
    );
};

export const catchAsync = fn => (req, res, next) => fn(req, res, next).catch(next);

export const throwValidationError = messageKey => {
    throw generateAppError(messageKey, 400);
};

export const catchValidationError = error => {
    const messageKey = error.inner[0].message;
    throw generateAppError(messageKey, 400);
};
