import express from 'express';
import {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  approveProblem,
  deleteProblem,
  upvoteProblem,
  downvoteProblem
} from '../controllers/problemController.js';
import { authenticateUser } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/admin.js';


const router = express.Router();

router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.post('/', authenticateUser, createProblem); // Admin-only access
router.patch('/:id', authenticateUser, isAdmin, updateProblem); // Admin 
router.patch('/:id/approve', authenticateUser, isAdmin, approveProblem); // Admin only
router.delete('/:id', authenticateUser,isAdmin, deleteProblem); // Admin only
router.post('/:id/upvote', authenticateUser, upvoteProblem);
router.post('/:id/downvote', authenticateUser, downvoteProblem);

export default router;
