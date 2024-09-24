import express  from 'express';
import { getFeedback }  from '../controllers/feedbackController.js';
import { authenticateUser }  from '../middlewares/auth.js';

const router = express.Router();

router.post('/problems/:id/feedback',authenticateUser, getFeedback);

export default  router;
