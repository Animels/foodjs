import { check, login, logout, refresh, register } from '@controllers';
import { authGuard } from '@utils';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/refresh', authGuard, refresh);
authRouter.get('/check', check);
authRouter.get('/logout', logout);

export { authRouter };
