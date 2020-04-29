import jwt from 'jsonwebtoken';

export const signJwtToken = payload =>
    jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
