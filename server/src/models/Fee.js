import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    invoiceNo: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['unpaid', 'paid', 'partial'], default: 'unpaid' },
    notes: String
  },
  { timestamps: true }
);

export const Fee = mongoose.model('Fee', feeSchema);
