import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { login, registerAdmin, me, logout } from '../controllers/auth.controller.js';

const r = Router();

// First-time setup — only works if no admin exists
r.post('/register-admin', registerAdmin);
r.post('/login', login);
r.get('/me', auth(true), me);
r.post('/logout', auth(true), logout);

export default r;
