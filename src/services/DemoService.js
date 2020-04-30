import Demo from '../models/Demo';
import { generateAppError } from '../utils/error';

export default class DemoService {
    static async createDemo(demoData) {
        const demo = await Demo.validate(demoData);
        const [newDemo] = await Demo.createOne(demo);

        return newDemo;
    }

    static async getDemo(demoId) {
        const [demo] = await Demo.findOne(demoId);

        if (!demo) {
            throw generateAppError('demoNotFound', 404);
        }

        return demo;
    }

    static async getDemos(query) {
        const demos = await Demo.findMany(query);

        return demos;
    }

    static async updateDemo({ existingDemo, demoData }) {
        Object.keys(demoData).forEach(key => {
            if (demoData[key] === existingDemo[key]) delete demoData[key];
        });

        await Demo.validate({ ...existingDemo, ...demoData });

        const [demo] = await Demo.updateOne(demoData, existingDemo.demo_id);

        return demo;
    }

    static async deleteDemo(demoId) {
        const [demo] = await Demo.deleteOne(demoId);

        if (!demo) {
            throw generateAppError('demoNotFound', 404);
        }

        return demo;
    }

    static async getDemosByUser(userId) {
        const demos = await Demo.getDemosByUser(userId);

        return demos;
    }
}
