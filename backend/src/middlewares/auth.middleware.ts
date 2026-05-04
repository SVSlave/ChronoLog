import type{ Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';
import { ApplicationError } from '../lib/error';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ') || !authHeader) throw new ApplicationError('Unauthorized', 'UNAUTHORIZED', 401);

    const token = authHeader.split(' ')[1];
    if(!token){ throw new ApplicationError('Unauthorized', 'UNAUTHORIZED', 401); }
    
    const user = verifyToken(token);

    req.user = user;
    return next();
}