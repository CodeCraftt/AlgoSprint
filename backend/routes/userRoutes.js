import express from 'express';
import { registerUser, loginUser, getUserProfile, getAllSolvedProblems} from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', authenticateUser, getUserProfile); // Protecting route with middleware
router.get('/solvedproblems/:id',authenticateUser,getAllSolvedProblems);


export default router;
