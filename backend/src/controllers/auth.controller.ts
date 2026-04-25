import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export async function registerController(req: Request, res: Response) {

    const { email, password, userName } = req.body;
    const user = await authService.registerUser(email, password, userName);

    res.status(200).json(user);

}

export async function loginController(req: Request, res: Response) {

    const { identifier, password } = req.body;
    const { token, user } = await authService.login(identifier, password);
    
    res.status(200).json({ token, user });
}