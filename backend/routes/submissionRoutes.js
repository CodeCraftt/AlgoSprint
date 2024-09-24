import express from 'express';
const router = express.Router();
import {createSubmission, submitCode, getSubmissionsByUser, getSubmissionsByProblem, getSubmissionById, updateSubmission, deleteSubmission} from '../controllers/submissionController.js'
import { authenticateUser} from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/admin.js';


// Route to submit code for a problem

router.post('/',authenticateUser,  createSubmission);
router.get('/user/:userId',authenticateUser,  getSubmissionsByUser);

router.get('/problem/:problemId',authenticateUser,  getSubmissionsByProblem);
router.get('/:id' ,authenticateUser,  getSubmissionById);
router.patch('/:id',authenticateUser,  updateSubmission);
router.delete('/:id',authenticateUser,  deleteSubmission);

router.post('/:id/submit', authenticateUser, submitCode);



export default router;
