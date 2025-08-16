import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    section: { type: String, default: 'A' },
    subjects: [{ type: String }],
    teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export const ClassModel = mongoose.model('Class', classSchema);
