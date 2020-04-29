const makeErrorResponse = error => {
    console.error('ERROR 💥', error);

    const { message, messageKey } = error;

    if (process.env.NODE_ENV === 'development') {
        return {
            success: false,
            error: {
                message,
                messageKey
            }
        };
    }

    if (error.isOperational) {
        return {
            success: false,
            error: {
                message,
                messageKey
            }
        };
    }

    return {
        success: false,
        error: {
            message: 'Internal Server Error',
            messageKey: 'internalServerError'
        }
    };
};

const errorHandler = (error, req, res, next) => {
    const response = makeErrorResponse(error);

    res.status(error.statusCode || 500).json(response);
};

export default errorHandler;
