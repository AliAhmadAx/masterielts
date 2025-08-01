// models/Quiz.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
});

const quizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  title: String,
  questions: [questionSchema],
  timer: Number, // seconds
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);