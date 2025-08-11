import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  type: { type: String, default: 'video' },
  title: { type: String, required: true },
  videoUrl: String,
  resources: [String], // PDFs, links, etc.
  content: String
}, { timestamps: true });

export default mongoose.model('Lesson', lessonSchema);