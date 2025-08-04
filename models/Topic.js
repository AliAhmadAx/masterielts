import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  title: { type: String, required: true },
  videoUrl: String,
  resources: [String], // PDFs, links, etc.
  content: String
}, { timestamps: true });

export default mongoose.model('Topic', topicSchema);