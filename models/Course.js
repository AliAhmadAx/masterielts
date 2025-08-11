import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  level: String,
  duration: String,
  price: { type: Number, default: 0 },
  thumbnail: String, 
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' },
  tags: [String],
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);