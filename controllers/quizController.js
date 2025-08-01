// controllers/quizController.js
import Quiz from "../models/Quiz.js";
import Course from "../models/Course.js";

// CREATE Quiz
export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);

    if (req.body.courseId) {
      await Course.findByIdAndUpdate(req.body.courseId, {
        $addToSet: { quizzes: quiz._id },
      });
    }

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET Quizzes
export const getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};

// UPDATE Quiz
export const updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const existingQuiz = await Quiz.findById(quizId);

    if (!existingQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, {
      new: true,
    });

    // If course changed, update course reference
    if (req.body.courseId && req.body.courseId !== existingQuiz.courseId.toString()) {
      await Course.findByIdAndUpdate(existingQuiz.courseId, {
        $pull: { quizzes: quizId },
      });

      await Course.findByIdAndUpdate(req.body.courseId, {
        $addToSet: { quizzes: quizId },
      });
    }

    res.json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (quiz && quiz.courseId) {
      await Course.findByIdAndUpdate(quiz.courseId, {
        $pull: { quizzes: quiz._id },
      });
    }

    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// controllers/quizController.js
// import Quiz from '../models/Quiz.js';

// export const createQuiz = async (req, res) => {
//   try {
//     const quiz = await Quiz.create(req.body);
//     res.status(201).json(quiz);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const getQuizzes = async (req, res) => {
//   const quizzes = await Quiz.find();
//   res.json(quizzes);
// };

// export const updateQuiz = async (req, res) => {
//   try {
//     const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(quiz);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const deleteQuiz = async (req, res) => {
//   try {
//     await Quiz.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Quiz deleted' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
