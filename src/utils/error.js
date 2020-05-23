import { validationMessages } from '../constants/validation';
import knex from '../db/knex';

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

export const catchTransaction = async fn => {
    const transaction = await knex.transaction();

    try {
        const result = await fn(transaction);
        await transaction.commit();
        return result;
    } catch (error) {
        await transaction.rollback();
        throw new Error(error);
    }
};

export const throwValidationError = messageKey => {
    throw generateAppError(messageKey, 400);
};
