import cors from 'cors';
import express  from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { authRouter } from './routes/auth.route';
import { sessionRouter } from './routes/session.route';

export const app = express();

app.use(cors());    
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.use('/auth', authRouter);
app.use('/session', sessionRouter);
app.use(errorMiddleware);