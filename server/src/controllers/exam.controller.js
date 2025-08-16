import { Exam } from '../models/Exam.js';

export async function createExam(req, res) {
  const doc = await Exam.create(req.body);
  res.json({ success: true, data: doc });
}

export async function listExams(req, res) {
  const { classId } = req.query;
  const filter = classId ? { classId } : {};
  const rows = await Exam.find(filter).sort({ date: -1 });
  res.json({ success: true, data: rows });
}

export async function addMarks(req, res) {
  const { id } = req.params; // exam id
  const { marks } = req.body; // [{ studentId, score, max }]
  const doc = await Exam.findByIdAndUpdate(id, { $set: { marks } }, { new: true });
  res.json({ success: true, data: doc });
}
