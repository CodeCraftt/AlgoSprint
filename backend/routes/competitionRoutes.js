import express from 'express';
import { getProblemOfTheWeek, submitProblemOfTheWeek, getUserStreak,updateUserStreak  } from '../controllers/competitionController.js';
import { authenticateUser } from '../middlewares/auth.js';


const router = express.Router();

router.get('/problem-of-the-week', getProblemOfTheWeek);
router.post('/problem-of-the-week/:problemId/submit', authenticateUser, submitProblemOfTheWeek);
router.get('/users/:id/streak', getUserStreak);
router.patch('/users/:id/update-streak', authenticateUser, updateUserStreak);


export default  router;
