import { Router } from 'express';
import { auth, hasRole } from '../middlewares/auth.js';
import { createInvoice, listInvoices, updateInvoice } from '../controllers/fee.controller.js';

const r = Router();
r.use(auth(true));
r.get('/', listInvoices);
r.post('/', hasRole('admin'), createInvoice);
r.put('/:id', hasRole('admin'), updateInvoice);
export default r;
