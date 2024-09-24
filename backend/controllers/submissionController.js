// controllers/submissionController.js
import { submitCodeForExecution, getExecutionResult } from '../utils/judge0.js';
import Submission from '../models/Submission.js';
import Problem from '../models/Problem.js';

// POST /api/submissions
export const createSubmission = async (req, res) => {
    const { userId, problemId, submittedCode, isCorrect, timeTaken, attempts } = req.body;

    try {
        const submission = new Submission({
            userId,
            problemId,
            submittedCode,
            isCorrect,
            submittedOn: new Date(),
            timeTaken,
            attempts,
        });

        await submission.save();
        res.status(201).json(submission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/submissions/user/:userId
// export const getSubmissionsByUser = async (req, res) => {
//     try {

//         const submissions = await Submission.find({ userId: req.params.userId });
        
//         res.status(200).json(submissions);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



export const getSubmissionsByUser = async (req, res) => {
  try {
      const submissions = await Submission.find({ userId: req.params.userId })
          .populate({
              path: 'problemId',
              select: 'title', // Only select the title field from the Problem
          });

      // Optionally, you can format the response to include problem titles
      const submissionsWithTitles = submissions.map(submission => ({
          ...submission.toObject(),
          problemTitle: submission.problemId ? submission.problemId.title : null,
      }));

      res.status(200).json(submissionsWithTitles);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// GET /api/submissions/problem/:problemId
export const getSubmissionsByProblem = async (req, res) => {
    try {
        const submissions = await Submission.find({ problemId: req.params.problemId });
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/submissions/:id
export const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/submissions/:id
export const updateSubmission = async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/submissions/:id
export const deleteSubmission = async (req, res) => {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.id);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Utility function to wait for a specific duration (in milliseconds)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Poll Judge0 for the result, retrying until it completes
const getExecutionResultWithRetry = async (token, retries = 10, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    const result = await getExecutionResult(token);

    if (result.status === 'In Queue' || result.status === 'Processing') {
      console.log('Result not ready, waiting...');
      await wait(delay); // Wait before retrying
    } else {
      return result; // Return the result when ready
    }
  }
  throw new Error('Execution result not ready after max retries');
};

// Submit Code and Get Verdict
export const submitCode = async (req, res) => {
  try {
    const { sourceCode, languageId } = req.body;
    const { id } = req.params; // Problem ID

    // Fetch the problem details (including test cases)
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const testCases = problem.testCases; // Array of test cases with input and expected output
    let correctCount = 0;
    let totalTestCases = testCases.length;

    // Loop through all test cases
    for (let testCase of testCases) {
      const { input, output: expectedOutput } = testCase;

      // Submit the code for execution
      const token = await submitCodeForExecution(sourceCode, languageId, input);

      // Get execution result with retries
      const executionResult = await getExecutionResultWithRetry(token);

      // Check if the execution succeeded and compare output with expected output
      const userOutput = executionResult.stdout.trim();
      const expectedTrimmedOutput = expectedOutput.trim();

      if (userOutput === expectedTrimmedOutput) {
        correctCount++; // Test case passed
      }
    }

    // Calculate score based on correct test cases
    const score = Math.round((correctCount / totalTestCases) * 100);

    // Save submission (optional)
    // console.log(correctCount);
    
    const submission = new Submission({
      userId: req.body.userId,  // Assuming user is authenticated
      problemId: id,
      submittedCode: sourceCode,
      isCorrect: correctCount === totalTestCases,
      attempts: 1, // Increment appropriately in production
      score: score,
      submittedOn: new Date(),
    });
    await submission.save();

    // Return the verdict and score
    return res.status(200).json({
      verdict: correctCount === totalTestCases ? 'All test cases passed successfully bravo !!' : 'Partially Correct !! try again',
      score: score,
      correctTestCases: correctCount,
      totalTestCases: totalTestCases,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Error submitting code' });
  }
};
