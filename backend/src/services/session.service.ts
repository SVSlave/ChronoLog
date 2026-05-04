import { prisma } from "../lib/prisma";
import { ApplicationError } from "../lib/error";

export async function createSession(
  userId: number,
  topic: string,
  description: string,
) {
  const session = await prisma.session.create({
    data: {
      userId,
      topic,
      description,
    },
    select: {
      topic: true,
      description: true,
    },
  });
  return session;
}

export async function endSession(sessionId: number) {
  try {
    await prisma.session.update({
      where: { id: sessionId },
      data: { endDate: new Date() },
    });
  } catch (err) {
    throw new ApplicationError("Session not found", "NOT_FOUND", 404);
  }
}

export async function getUserSessions(userId: number) {
  const sessions = await prisma.session.findMany({
    where: { userId: userId },
    select: {
      id: true,
      topic: true,
      description: true,
    },
  });

  if (!sessions.length) {
    throw new ApplicationError("No sessions found for this user", "NOT_FOUND", 404);
  }
  
  return sessions;
}
