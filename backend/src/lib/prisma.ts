import { PrismaPg } from '@prisma/adapter-pg';
import {PrismaClient as BasePrismaClient} from '@prisma/client'; 

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });


export const prisma = new BasePrismaClient({ adapter });