import { Router } from 'express';
import { auth, hasRole } from '../middlewares/auth.js';
import { createExam, listExams, addMarks } from '../controllers/exam.controller.js';

const r = Router();
r.use(auth(true));
r.get('/', listExams);
r.post('/', hasRole('admin', 'teacher'), createExam);
r.put('/:id/marks', hasRole('admin', 'teacher'), addMarks);
export default r;
