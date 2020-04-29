import bcrypt from 'bcrypt';
import moment from 'moment';
import knex from '../db/knex';
import { UserSchema } from './schemas/user';
import { catchValidationError } from '../utils/error';

export default class User {
    static selectableColumns = ['user_id', 'email', 'first_name', 'last_name', 'created_at', 'updated_at'];

    static toJsonObject = function (tableName) {
        return `
            json_build_object(
                'user_id', ${tableName}.user_id,
                'email', ${tableName}.email,
                'first_name', ${tableName}.first_name,
                'last_name', ${tableName}.last_name,
                'created_at', ${tableName}.created_at,
                'updated_at', ${tableName}.updated_at
            ) AS user
        `;
    };

    static validate = async function (user, context = {}) {
        const opts = {
            abortEarly: false,
            stripUnknown: true,
            context: { validatePassword: context.validatePassword }
        };

        const result = await UserSchema.validate(user, opts).catch(catchValidationError);

        return result;
    };

    static hashPassword = async function (password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password.toString(), salt);
    };

    static comparePassword = function (inputPassword, userPassword) {
        return bcrypt.compare(inputPassword, userPassword);
    };

    static createOne = async function (user) {
        user.password = await User.hashPassword(user.password);

        return knex('users').insert(user).returning(User.selectableColumns);
    };

    static findOne = function (key, value) {
        return knex('users')
            .select(User.selectableColumns)
            .where({ [key]: value });
    };

    static findById = function (userId) {
        return User.findOne('user_id', userId);
    };

    static findByEmail = function (email) {
        return User.findOne('email', email);
    };

    static findMany = function () {
        return knex('users').select(User.selectableColumns);
    };

    static updateOne = async function (userData, userId) {
        if (!Object.keys(userData).length) {
            return User.findById(userId);
        }

        if (userData.password) {
            userData.password = await User.hashPassword(userData.password);
        }

        userData.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

        return knex('users').update(userData).where({ user_id: userId }).returning(User.selectableColumns);
    };

    static deleteOne = function (userId) {
        return knex('users').delete().where({ user_id: userId }).returning(User.selectableColumns);
    };
}
