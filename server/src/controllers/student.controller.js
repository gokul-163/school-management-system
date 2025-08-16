import { Student } from '../models/Student.js';

export async function createStudent(req, res) {
  const student = await Student.create(req.body);
  res.json({ success: true, data: student });
}

export async function listStudents(req, res) {
  const { q, classId } = req.query;
  const filter = {};
  if (q) filter.$or = [ { name: new RegExp(q, 'i') }, { rollNo: new RegExp(q, 'i') } ];
  if (classId) filter.classId = classId;
  const students = await Student.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: students });
}

export async function getStudent(req, res) {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: student });
}

export async function updateStudent(req, res) {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: student });
}

export async function deleteStudent(req, res) {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Deleted' });
}
