import { generateAppError } from './error';

export const authorizeUser = (currentUserId, foundUserId) => {
    if (Number(currentUserId) !== Number(foundUserId)) {
        throw generateAppError('notAuthorized', 403);
    }
};
