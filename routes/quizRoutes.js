// routes/quizRoutes.js
import express from 'express';
import { createQuiz, getQuizzes, updateQuiz, deleteQuiz } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('admin', 'superadmin'), createQuiz)
  .get(getQuizzes);

router.route('/:id')
  .put(protect, authorizeRoles('admin', 'superadmin'), updateQuiz)
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteQuiz);

export default router;