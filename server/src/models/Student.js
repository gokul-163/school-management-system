import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    rollNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    parentName: String,
    parentContact: String,
    address: String
  },
  { timestamps: true }
);

export const Student = mongoose.model('Student', studentSchema);
