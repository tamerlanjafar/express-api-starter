import { generateAppError } from './error';

export const authorizeUser = ({ user_id }, foundUserId) => {
    if (Number(user_id) !== Number(foundUserId)) {
        throw generateAppError('notAuthorized', 403);
    }
};
