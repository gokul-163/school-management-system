import { Router } from 'express';
import { auth, hasRole } from '../middlewares/auth.js';
import { createTeacher, listTeachers, updateTeacher, deleteTeacher } from '../controllers/teacher.controller.js';

const r = Router();
r.use(auth(true));
r.get('/', listTeachers);
r.post('/', hasRole('admin'), createTeacher);
r.put('/:id', hasRole('admin'), updateTeacher);
r.delete('/:id', hasRole('admin'), deleteTeacher);
export default r;
