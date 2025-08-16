import { Attendance } from '../models/Attendance.js';

export async function markAttendance(req, res) {
  const { date, classId, entries } = req.body; // entries: [{ studentId, status }]
  const docs = await Promise.all(entries.map(e => Attendance.findOneAndUpdate(
    { date, classId, studentId: e.studentId },
    { $set: { status: e.status } },
    { upsert: true, new: true }
  )));
  res.json({ success: true, data: docs });
}

export async function getAttendance(req, res) {
  const { date, classId } = req.query;
  const filter = {};
  if (date) filter.date = new Date(date);
  if (classId) filter.classId = classId;
  const rows = await Attendance.find(filter);
  res.json({ success: true, data: rows });
}
