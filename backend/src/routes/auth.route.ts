import { Router } from 'express';
import { registerUser, login} from '../services/auth.service';
import { validateRequest } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema } from '../lib/zodSchema';

const router = Router();
    
router.post('/register', validateRequest(registerSchema), async (req, res) => {
	const { email, password, userName } = req.body;
	const user = await registerUser(email, password, userName);

	res.status(200).json(user);
});

router.post('/login', validateRequest(loginSchema), async (req, res) => {
	const { identifier, password } = req.body;
	const { token } = await login(identifier, password);

	res.status(200).json({ token });
});


export { router as authRouter };
