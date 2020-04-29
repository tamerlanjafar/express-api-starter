import moment from 'moment';
import { DemoSchema } from './schemas/demo';
import { catchValidationError } from '../utils/error';
import knex from '../db/knex';
import User from './User';

export default class Demo {
    static toJsonObject = function (tableName) {
        return `
            json_build_object(
                'demo_id', ${tableName}.demo_id,
                'demo_name', ${tableName}.demo_name,
                'created_at', ${tableName}.created_at,
                'updated_at', ${tableName}.updated_at,
                'user_id', ${tableName}.user_id
            ) AS demo
        `;
    };

    static validate = async function (demo, context = {}) {
        const opts = {
            abortEarly: false,
            stripUnknown: true,
            context: {}
        };

        const result = await DemoSchema.validate(demo, opts).catch(catchValidationError);

        return result;
    };

    static createOne = function (demo) {
        return knex('inserted_demo AS d')
            .select('d.demo_id', 'd.demo_name', 'd.created_at', 'd.updated_at')
            .select(knex.raw(User.toJsonObject('u')))
            .with('inserted_demo', knex('demos').insert(demo).returning('*'))
            .join('users AS u', 'd.user_id', 'u.user_id');
    };

    static findOne = function (demoId) {
        return knex('demos AS d')
            .select('d.demo_id', 'd.demo_name', 'd.created_at', 'd.updated_at')
            .select(knex.raw(User.toJsonObject('u')))
            .join('users AS u', 'd.user_id', 'u.user_id')
            .where({ demo_id: demoId });
    };

    static findMany = function (query) {
        const { demo_name } = query;

        const demoNameRaw = demo_name ? 'demo_name ILIKE ?' : '';
        const demoNameParameters = demo_name ? [`%${demo_name}%`] : [];

        return knex('demos AS d')
            .select('d.demo_id', 'd.demo_name', 'd.created_at', 'd.updated_at')
            .select(knex.raw(User.toJsonObject('u')))
            .join('users AS u', 'd.user_id', 'u.user_id')
            .whereRaw(demoNameRaw, demoNameParameters)
            .orderBy('d.demo_id');
    };

    static updateOne = function (demoData, demoId) {
        if (!Object.keys(demoData).length) {
            return Demo.findOne(demoId);
        }

        demoData.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

        return knex('updated_demo AS d')
            .select('d.demo_id', 'd.demo_name', 'd.created_at', 'd.updated_at')
            .select(knex.raw(User.toJsonObject('u')))
            .with('updated_demo', knex('demos').update(demoData).where({ demo_id: demoId }).returning('*'))
            .join('users AS u', 'd.user_id', 'u.user_id');
    };

    static deleteOne = function (demoId) {
        return knex('deleted_demo AS d')
            .select('d.demo_id', 'd.demo_name', 'd.created_at', 'd.updated_at')
            .select(knex.raw(User.toJsonObject('u')))
            .with('deleted_demo', knex('demos').delete().where({ demo_id: demoId }).returning('*'))
            .join('users AS u', 'd.user_id', 'u.user_id');
    };

    static getDemosByUser = function (userId) {
        return knex('demos AS d')
            .select('d.demo_id', 'd.demo_name', 'd.created_at', 'd.updated_at')
            .select(knex.raw(User.toJsonObject('u')))
            .join('users AS u', 'd.user_id', 'u.user_id')
            .where('u.user_id', userId)
            .orderBy('d.demo_id');
    };
}
