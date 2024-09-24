import express  from 'express';
import { getUnapprovedProblems, getAllUsers, deleteUser }  from '../controllers/adminController.js';
import { authenticateUser }  from '../middlewares/auth.js';
import { isAdmin }  from '../middlewares/admin.js';


const router = express.Router();

router.get('/unapproved-problems',authenticateUser, isAdmin, getUnapprovedProblems);
router.get('/users',authenticateUser, isAdmin, getAllUsers);
router.delete('/users/:id',authenticateUser, isAdmin, deleteUser);

export default router;

