import Discussion from '../models/Discussion.js';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import Topic from '../models/Topic.js';

// @desc    Get all comments for a topic
// @route   GET /api/discussions/:courseId/:lessonId/:topicId
// @access  Public
export const getCommentsForLessons = async (req, res, next) => {
  const { courseId, lessonId, topicId } = req.params;

  try {
    const topLevelComments = await Discussion.find({
      course: courseId,
      topic: topicId,
      lesson: lessonId,
    })
      .populate('user', 'name')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: topLevelComments.length,
      data: topLevelComments,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single comment
// @route   GET /api/discussions/comment/:id
// @access  Public
export const getComment = async (req, res, next) => {
  try {
    const comment = await Discussion.findById(req.params.id).populate('user', 'name');

    if (!comment) {
      return next(`Comment not found with ID: ${req.params.id}`, 404);
    }

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a comment on a topic
// @route   POST /api/discussions/:courseId/:lessonId/:topicId
// @access  Private
export const createComment = async (req, res, next) => {
  const { courseId, topicId, lessonId } = req.params;
  const { comment } = req.body;

  try {
    const course = await Course.findById(courseId);
    const topic = await Topic.findById(topicId);
    const lesson = await Lesson.findById(lessonId);

    if (!course || !lesson || !topic) {
      return next(`Invalid course, lesson, or topic ID`, 400);
    }

    const newComment = await Discussion.create({
      course: courseId,
      topic: topicId,
      lesson: lessonId,
      user: req.user.id,
      comment,
    });

    res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a comment
// @route   PUT /api/discussions/comment/:id
// @access  Private
export const updateComment = async (req, res, next) => {
  try {
    let comment = await Discussion.findById(req.params.id);

    if (!comment) {
      return next(`Comment not found with ID: ${req.params.id}`, 404)
    }

    if (comment.user.toString() !== req.user.id) {
      return next(`Not authorized to update this comment`, 403)
    }

    comment.comment = req.body.comment || comment.comment;
    await comment.save();

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/discussions/comment/:id
// @access  Private
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Discussion.findById(req.params.id);

    if (!comment) {
      return next(`Comment not found with ID: ${req.params.id}`, 404);
    }

    if (comment.user.toString() !== req.user.id) {
      return next(`Not authorized to delete this comment`, 403);
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
