import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    status: { type: String, enum: ['present', 'absent'], required: true }
  },
  { timestamps: true }
);

attendanceSchema.index({ date: 1, classId: 1, studentId: 1 }, { unique: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
