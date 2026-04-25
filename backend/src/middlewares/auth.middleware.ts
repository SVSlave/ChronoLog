import type{ Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith('Bearer ')){ return res.status(401); }

    const token = authHeader.split(' ')[1];

    if(!token){ return res.status(401); }

    const user = verifyToken(token);

    req.user = user;

    next();
}