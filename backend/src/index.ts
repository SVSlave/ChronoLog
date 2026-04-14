import express, { type Request, type Response } from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello, from backend!');
});

const port = 5000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));