import jwt from 'jsonwebtoken';

export type JwtPayload = {
    id: number;
    email: string;
}

const secret = process.env.JWT_SECRET!;

export function signToken(payload: JwtPayload) {

    return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyToken(token: string) {

    const decoded = jwt.verify(token, secret);

    if(typeof decoded === 'string' || !decoded){
        throw new Error('Invalid token');
    }

    if(!decoded.id || !decoded.email || typeof decoded.id !== 'number' || typeof decoded.email !== 'string'){
        throw new Error('Invalid token payload');
    }

    const { id, email } = decoded;

    return { id, email };
}