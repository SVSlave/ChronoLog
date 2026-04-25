import {prisma} from '../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '../lib/jwt';

export class AuthService {

    async registerUser(email: string, password: string, userName: string) {

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: { email, password: hashedPassword, userName },
            select: {
                id: true,
                email: true,
                userName: true,
                createdAt: true,
            },
        });

        return user;
    }

    async login(identifier: string, password: string) {
        const user = await prisma.users.findFirstOrThrow({
            where: { 
                OR: [
                    { email: identifier },
                    { userName: identifier }
                ]
            }
        });

        if(!user){
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); 

        if(!isPasswordValid){
            throw new Error('Invalid credentials');
        }

        const token = signToken({id: user.id, email: user.email});

        return { token, user: { id: user.id, email: user.email,} };
    }
}