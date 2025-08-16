import { Teacher } from '../models/Teacher.js';

export async function createTeacher(req, res) {
  const teacher = await Teacher.create(req.body);
  res.json({ success: true, data: teacher });
}

export async function listTeachers(req, res) {
  const { q } = req.query;
  const filter = q ? { name: new RegExp(q, 'i') } : {};
  const teachers = await Teacher.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: teachers });
}

export async function updateTeacher(req, res) {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: teacher });
}

export async function deleteTeacher(req, res) {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Deleted' });
}
