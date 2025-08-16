import { ClassModel } from '../models/Class.js';

export async function createClass(req, res) {
  const item = await ClassModel.create(req.body);
  res.json({ success: true, data: item });
}

export async function listClasses(req, res) {
  const items = await ClassModel.find().sort({ createdAt: -1 });
  res.json({ success: true, data: items });
}

export async function updateClass(req, res) {
  const item = await ClassModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: item });
}

export async function deleteClass(req, res) {
  await ClassModel.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Deleted' });
}
