// /routes/codeExecutionRoutes.js
import express from 'express';
import { runCode } from '../controllers/codeExecutionController.js';
const router = express.Router();

// POST /api/code-execution/run
router.post('/run', runCode);

export default router;
