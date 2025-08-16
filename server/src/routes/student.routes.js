import { Router } from 'express';
import { auth, hasRole } from '../middlewares/auth.js';
import { createStudent, listStudents, getStudent, updateStudent, deleteStudent } from '../controllers/student.controller.js';

const r = Router();
r.use(auth(true));
r.get('/', listStudents);
r.post('/', hasRole('admin', 'teacher'), createStudent);
r.get('/:id', getStudent);
r.put('/:id', hasRole('admin', 'teacher'), updateStudent);
r.delete('/:id', hasRole('admin'), deleteStudent);
export default r;
