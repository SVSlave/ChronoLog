import {prisma} from '../lib/prisma';

export class AuthService {

    async registerUser(email: string, password: string, userName: string) {
        const user = await prisma.users.create({
            data: { email, password, userName },
            select: {
                id: true,
                email: true,
                userName: true,
                createdAt: true,
            },
        });

        return user;
    }
}