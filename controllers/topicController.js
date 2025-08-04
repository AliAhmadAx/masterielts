import Topic from '../models/Topic.js';
import Lesson from '../models/Lesson.js';

export const createTopic = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const topic = await Topic.create({ ...req.body, lesson: lessonId });

    await Lesson.findByIdAndUpdate(lessonId, { $push: { topics: topic._id } });

    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });

    await Lesson.findByIdAndUpdate(topic.lesson, { $pull: { topics: topic._id } });

    res.json({ message: 'Topic deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
