import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createSession, endSession, getUserSessions } from '../services/session.service';
import { validateRequest } from '../middlewares/validation.middleware';
import { createSessionSchema, endSessionSchema } from '../lib/zodSchema';

const router = Router();

router.post('/createSession', authMiddleware, validateRequest(createSessionSchema), async (req, res) => {
  const userId = req.user.id;
  const { topic, description } = req.body;
  const session = await createSession(userId, topic, description);
  res.status(200).json(session);
});

router.post('/endSession', authMiddleware, validateRequest(endSessionSchema), async (req, res) => {
    const { sessionId } = req.body;
    await endSession(sessionId);
    res.status(200).json({ message: 'Session ended successfully' });
});

router.get('/getUserSessions', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const sessions = await getUserSessions(userId);
    res.status(200).json(sessions);
});

export { router as sessionRouter };