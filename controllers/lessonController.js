import Lesson from '../models/Lesson.js';
import Course from '../models/Course.js';

export const createLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lesson = await Lesson.create({ ...req.body, course: courseId });

    await Course.findByIdAndUpdate(courseId, { $push: { lessons: lesson._id } });

    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('topics');
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    // Remove from course
    await Course.findByIdAndUpdate(lesson.course, { $pull: { lessons: lesson._id } });

    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
