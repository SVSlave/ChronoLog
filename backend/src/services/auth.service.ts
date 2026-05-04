import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "../lib/jwt";
import { ApplicationError } from "../lib/error";

export async function registerUser(
  email: string,
  password: string,
  userName: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
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

export async function login(identifier: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { userName: identifier }],
    },
  });

  if (!user) {
    throw new ApplicationError("User not found", "INVALID_CREDENTIALS", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApplicationError(
      "Invalid credentials",
      "INVALID_CREDENTIALS",
      401,
    );
  }

  const token = signToken({ id: user.id, email: user.email });

  return { token };
}
