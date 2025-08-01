// models/Course.js
import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  resources: [String], // PDFs, links, etc.
  content: String
}, { _id: false }); // disable _id for nested subdocs if not needed

const lessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  topics: [topicSchema]
}, { _id: false }); // embedded in course, so no need for separate _id

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  level: String,
  duration: String,
  price: { type: Number, default: 0 },
  thumbnail: String, 
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' },
  tags: [String],
  lessons: [lessonSchema], // embedded lessons with topics
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
