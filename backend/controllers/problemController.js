import Problem from '../models/Problem.js';

// Get all problems with optional filters
export const getAllProblems = async (req, res) => {
  const { difficulty, tags, isApproved } = req.query;

  try {
    const filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (isApproved !== undefined) filter.isApproved = isApproved === 'true';

    const problems = await Problem.find(filter);
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get problem by ID
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new problem (admin only)
export const createProblem = async (req, res) => {
  const { title, description, difficulty, tags, hints, solution, testCases } = req.body;

  try {
    const newProblem = new Problem({
      title,
      description,
      difficulty,
      tags,
      hints,
      solution,
      testCases,
      createdBy: req.user.id,
      createdOn: new Date(),
      isApproved: false,
      upvotes: 0,
      downvotes: 0
    });

    await newProblem.save();
    res.status(201).json({ message: 'Problem created successfully', problem: newProblem });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a problem (admin only or normal user before approval)
export const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Only allow updates if the user is an admin or the problem is not yet approved
    if (req.user.role !== 'admin' && problem.isApproved) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    Object.assign(problem, req.body);
    await problem.save();
    res.status(200).json({ message: 'Problem updated successfully', problem });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin approves a problem
export const approveProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    problem.isApproved = true;
    problem.approvedBy = req.user.id;
    problem.approvedOn = new Date();
    await problem.save();

    res.status(200).json({ message: 'Problem approved successfully', problem });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a problem (admin only)
export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await problem.remove();
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Upvote a problem
export const upvoteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    problem.upvotes += 1;
    await problem.save();

    res.status(200).json({ message: 'Problem upvoted successfully', upvotes: problem.upvotes });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Downvote a problem
export const downvoteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    problem.downvotes += 1;
    await problem.save();

    res.status(200).json({ message: 'Problem downvoted successfully', downvotes: problem.downvotes });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
