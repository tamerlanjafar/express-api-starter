import jwt from 'jsonwebtoken';
import UsersService from '../services/UsersService';
import { catchAsync, generateAppError } from '../utils/error';

// Authenticate user for private routes
export const authenticate = catchAsync(async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Get token from Bearer token in header
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return next(generateAppError('notLoggedIn', 401));
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const currentUser = await UsersService.getUser(decoded.id);

            if (!currentUser) {
                return next(generateAppError('invalidToken', 401));
            }

            // Set user to req object
            req.user = currentUser;

            next();
        } catch (error) {
            return next(generateAppError('invalidToken', 401));
        }
    } else {
        next(generateAppError('notLoggedIn', 401));
    }
});
