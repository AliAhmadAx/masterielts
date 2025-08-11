import express from 'express';
import {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic
} from '../controllers/topicController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Create a topic under a course
router
  .route('/:courseId')
  .get(getAllTopics)
  .post(protect, authorizeRoles('admin', 'superadmin'), createTopic);

// Operate on individual topics
router
  .route('/:id')
  .get(getTopicById)
  .put(protect, authorizeRoles('admin', 'superadmin'), updateTopic)
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteTopic);

export default router;
