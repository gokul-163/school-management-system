import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    examName: { type: String, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    marks: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        score: { type: Number, required: true, min: 0 },
        max: { type: Number, required: true, min: 1 }
      }
    ]
  },
  { timestamps: true }
);

export const Exam = mongoose.model('Exam', examSchema);
