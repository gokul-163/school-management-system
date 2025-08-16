import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    subjects: [{ type: String }]
  },
  { timestamps: true }
);

export const Teacher = mongoose.model('Teacher', teacherSchema);
