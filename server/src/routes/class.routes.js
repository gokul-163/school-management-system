import { Router } from 'express';
import { auth, hasRole } from '../middlewares/auth.js';
import { createClass, listClasses, updateClass, deleteClass } from '../controllers/class.controller.js';

const r = Router();
r.use(auth(true));
r.get('/', listClasses);
r.post('/', hasRole('admin'), createClass);
r.put('/:id', hasRole('admin'), updateClass);
r.delete('/:id', hasRole('admin'), deleteClass);
export default r;
