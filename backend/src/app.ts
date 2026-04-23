import cors from 'cors';
import express  from 'express';
import { authRouter } from './routes/auth.route';

export const app = express();

app.use(cors());    
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.use('/auth', authRouter);