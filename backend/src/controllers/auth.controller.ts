import type {  NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export async function registerController(req: Request, res: Response, next: NextFunction) {
    const { email, password, userName } = req.body;

    const user = await authService.registerUser(email, password, userName);

    res.status(200).json(user);

}