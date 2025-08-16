import { Router } from 'express';
import { auth, hasRole } from '../middlewares/auth.js';
import { markAttendance, getAttendance } from '../controllers/attendance.controller.js';

const r = Router();
r.use(auth(true));
r.get('/', getAttendance);
r.post('/', hasRole('admin', 'teacher'), markAttendance);
export default r;
