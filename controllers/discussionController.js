import Discussion from "../models/Discussion.js";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import Topic from "../models/Topic.js";

// @desc    Get all comments for a topic
// @route   GET /api/discussions/:courseId/:lessonId/:topicId
// @access  Public
export const getCommentsForLessons = async (req, res) => {
  const { courseId, lessonId, topicId } = req.params;

  try {
    const topLevelComments = await Discussion.find({
      course: courseId,
      topic: topicId,
      lesson: lessonId,
    })
      .populate("user", "name")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: topLevelComments.length,
      data: topLevelComments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get a single comment
// @route   GET /api/discussions/comment/:id
// @access  Public
export const getComment = async (req, res, next) => {
  try {
    const comment = await Discussion.findById(req.params.id).populate(
      "user",
      "name"
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Create a comment on a topic
// @route   POST /api/discussions/:courseId/:lessonId/:topicId
// @access  Private
export const createComment = async (req, res) => {
  const { courseId, topicId, lessonId } = req.params;
  const { comment } = req.body;

  try {
    const course = await Course.findById(courseId);
    const topic = await Topic.findById(topicId);
    const lesson = await Lesson.findById(lessonId);

    if (!course || !lesson || !topic) {
      return res
        .status(404)
        .json({ message: `Invalid course, lesson, or topic ID` });
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
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update a comment
// @route   PUT /api/discussions/comment/:id
// @access  Private
export const updateComment = async (req, res) => {
  try {
    let comment = await Discussion.findById(req.params.id);

    if (!comment) {
       return res.status(404).json({ message:`Comment not found with ID: ${req.params.id}`});
    }

    if (comment.user.toString() !== req.user.id) {
       return res.status(404).json({ message:`Not authorized to update this comment`});
    }

    comment.comment = req.body.comment || comment.comment;
    await comment.save();

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/discussions/comment/:id
// @access  Private
export const deleteComment = async (req, res) => {
  try {
    const comment = await Discussion.findById(req.params.id);

    if (!comment) {
       return res.status(404).json({ message:`Comment not found with ID: ${req.params.id}`});
    }

    if (comment.user.toString() !== req.user.id) {
       return res.status(404).json({ message:`Not authorized to delete this comment`});
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
