import jwt from 'jsonwebtoken';
import { ApplicationError } from './error';

export type JwtPayload = {
    id: number;
    email: string;
}

const secret = process.env.JWT_SECRET!;

export function signToken(payload: JwtPayload) {

    return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
    let decoded;
    try {
        decoded = jwt.verify(token, secret);
    } catch {
        throw new ApplicationError('Invalid token', 'UNAUTHORIZED', 401);
    }

    if(typeof decoded === 'string' || !decoded){
        throw new ApplicationError('Invalid token', 'UNAUTHORIZED', 401);
    }

    if(!decoded.id || !decoded.email || typeof decoded.id !== 'number' || typeof decoded.email !== 'string'){
        throw new ApplicationError('Invalid token payload', 'UNAUTHORIZED', 401);
    }

    const { id, email } = decoded;

    return { id, email };
}