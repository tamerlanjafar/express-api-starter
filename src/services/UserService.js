import User from '../models/User';
import { signJwtToken } from '../utils/jwt';
import { generateAppError } from '../utils/error';

export default class UserService {
    static async createUser(userData) {
        const user = User.validate(userData, { validatePassword: true });

        const [foundUser] = await User.findByEmail(user.email);

        if (foundUser) {
            throw generateAppError('emailAlreadyRegistered', 400);
        }

        const [newUser] = await User.createOne(user);
        const token = signJwtToken({
            id: newUser.user_id,
            email: newUser.email
        });

        return {
            user: newUser,
            token
        };
    }

    static async getUser(userId) {
        const [user] = await User.findById(userId);

        if (!user) {
            throw generateAppError('userNotFound', 404);
        }

        return user;
    }

    static async getUsers(query) {
        const users = await User.findMany(query);

        return users;
    }

    static async updateUser({ existingUser, userData }) {
        Object.keys(userData).forEach(key => {
            if (userData[key] === existingUser[key]) delete userData[key];
        });

        const validatePassword = typeof userData.password !== 'undefined';
        User.validate({ ...existingUser, ...userData }, { validatePassword });

        const [user] = await User.updateOne(userData, existingUser.user_id);

        return user;
    }

    static async deleteUser(userId) {
        const [user] = await User.deleteOne(userId);

        if (!user) {
            throw generateAppError('userNotFound', 404);
        }

        return user;
    }

    static async loginUser(user) {
        const { email, password } = user;

        if (!email) {
            throw generateAppError('emailIsRequired', 400);
        }

        if (!password) {
            throw generateAppError('passwordIsRequired', 400);
        }

        const [foundUser] = await User.findOne('email', email).select('password');

        if (!foundUser) {
            throw generateAppError('invalidCredentials', 401);
        }

        const isMatch = await User.comparePassword(password, foundUser.password);

        if (!isMatch) {
            throw generateAppError('invalidCredentials', 401);
        }

        delete foundUser.password;
        const token = signJwtToken({
            id: foundUser.user_id,
            email: foundUser.email
        });

        return {
            user: foundUser,
            token
        };
    }
}

module.exports = UserService;
