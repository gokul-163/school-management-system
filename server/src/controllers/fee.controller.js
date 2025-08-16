import { Fee } from '../models/Fee.js';

export async function createInvoice(req, res) {
  const invoice = await Fee.create(req.body);
  res.json({ success: true, data: invoice });
}

export async function listInvoices(req, res) {
  const { studentId, status } = req.query;
  const filter = {};
  if (studentId) filter.studentId = studentId;
  if (status) filter.status = status;
  const invoices = await Fee.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: invoices });
}

export async function updateInvoice(req, res) {
  const doc = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: doc });
}
