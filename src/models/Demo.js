import moment from 'moment';
import { throwValidationError } from '../utils/error';
import knex from '../db/knex';
import User from './User';
import { defaultRecordLimit } from '../constants/api';

export default class Demo {
    static validate(data, context = {}) {
        const { demo_name, user_id } = data;

        if (!demo_name) throwValidationError('demoNameIsRequired');

        const demo = {
            demo_name,
            user_id
        };

        return demo;
    }

    static create(demo) {
        return knex('demos')
            .select('demos.demo_id', 'demos.demo_name', 'demos.created_at', 'demos.updated_at')
            .select(
                knex.raw(`
                    json_build_object(
                        'user_id', users.user_id,
                        'email', users.email,
                        'first_name', users.first_name,
                        'last_name', users.last_name,
                        'created_at', users.created_at,
                        'updated_at', users.updated_at
                    ) AS user
                `)
            )
            .with('demos', knex('demos').insert(demo).returning('*'))
            .join('users', 'demos.user_id', 'users.user_id');
    }

    static findOne(demoId) {
        return knex('demos')
            .select('demos.demo_id', 'demos.demo_name', 'demos.created_at', 'demos.updated_at')
            .select(
                knex.raw(`
                    json_build_object(
                        'user_id', users.user_id,
                        'email', users.email,
                        'first_name', users.first_name,
                        'last_name', users.last_name,
                        'created_at', users.created_at,
                        'updated_at', users.updated_at
                    ) AS user
                `)
            )
            .join('users', 'demos.user_id', 'users.user_id')
            .where({ demo_id: demoId });
    }

    static findMany(query) {
        let { offset, limit } = query;
        const { demo_name } = query;

        offset = Number(offset) || 0;
        limit = Number(limit) || defaultRecordLimit;

        const demoNameRaw = demo_name ? 'demo_name ILIKE ?' : '';
        const demoNameParameters = demo_name ? [`%${demo_name}%`] : [];

        return knex('demos')
            .select('demos.demo_id', 'demos.demo_name', 'demos.created_at', 'demos.updated_at')
            .select(
                knex.raw(`
                    json_build_object(
                        'user_id', users.user_id,
                        'email', users.email,
                        'first_name', users.first_name,
                        'last_name', users.last_name,
                        'created_at', users.created_at,
                        'updated_at', users.updated_at
                    ) AS user
                `)
            )
            .join('users', 'demos.user_id', 'users.user_id')
            .whereRaw(demoNameRaw, demoNameParameters)
            .orderBy('demos.demo_id')
            .offset(offset)
            .limit(limit);
    }

    static updateOne(demoData, demoId) {
        if (!Object.keys(demoData).length) {
            return Demo.findOne(demoId);
        }

        demoData.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

        return knex('demos')
            .select('demos.demo_id', 'demos.demo_name', 'demos.created_at', 'demos.updated_at')
            .select(
                knex.raw(`
                    json_build_object(
                        'user_id', users.user_id,
                        'email', users.email,
                        'first_name', users.first_name,
                        'last_name', users.last_name,
                        'created_at', users.created_at,
                        'updated_at', users.updated_at
                    ) AS user
                `)
            )
            .with('demos', knex('demos').update(demoData).where({ demo_id: demoId }).returning('*'))
            .join('users', 'demos.user_id', 'users.user_id');
    }

    static deleteOne(demoId) {
        return knex('demos')
            .select('demos.demo_id', 'demos.demo_name', 'demos.created_at', 'demos.updated_at')
            .select(
                knex.raw(`
                    json_build_object(
                        'user_id', users.user_id,
                        'email', users.email,
                        'first_name', users.first_name,
                        'last_name', users.last_name,
                        'created_at', users.created_at,
                        'updated_at', users.updated_at
                    ) AS user
                `)
            )
            .with('demos', knex('demos').delete().where({ demo_id: demoId }).returning('*'))
            .join('users', 'demos.user_id', 'users.user_id');
    }

    static getDemosByUserId(query, userId) {
        let { offset, limit } = query;

        offset = Number(offset) || 0;
        limit = Number(limit) || defaultRecordLimit;

        return knex('demos')
            .select('demos.demo_id', 'demos.demo_name', 'demos.created_at', 'demos.updated_at')
            .select(
                knex.raw(`
                    json_build_object(
                        'user_id', users.user_id,
                        'email', users.email,
                        'first_name', users.first_name,
                        'last_name', users.last_name,
                        'created_at', users.created_at,
                        'updated_at', users.updated_at
                    ) AS user
                `)
            )
            .join('users', 'demos.user_id', 'users.user_id')
            .where('users.user_id', userId)
            .orderBy('demos.demo_id')
            .offset(offset)
            .limit(limit);
    }
}
