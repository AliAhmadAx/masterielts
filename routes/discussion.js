import express from 'express';
import {
  getCommentsForLessons,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/discussionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Comments for a specific topic
// GET and POST => /api/discussions/:courseId/:lessonId/:topicId
router
  .route('/:courseId/:topicId/:lessonId')
  .get(getCommentsForLessons)
  .post(protect, createComment);

// Individual comment routes (by comment ID)
// GET, PUT, DELETE => /api/discussions/comment/:id
router
  .route('/comment/:id')
  .get(getComment)
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
