import Problem  from '../models/Problem.js';
import Submission  from '../models/Submission.js';
import User  from '../models/User.js';

export const getProblemOfTheWeek = async (req, res) => {
    try {
        const problemOfTheWeek = await Problem.findOne({ isProblemOfTheWeek: true });
        if (!problemOfTheWeek) {
            return res.status(404).json({ message: 'No problem of the week found.' });
        }
        res.status(200).json(problemOfTheWeek);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const submitProblemOfTheWeek = async (req, res) => {
    const { submittedCode } = req.body;
    try {
        const submission = new Submission({
            userId: req.user.id,
            problemId: req.params.problemId,
            submittedCode,
            // Additional data like timeTaken, attempts, etc.
        });
        await submission.save();
        res.status(201).json(submission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserStreak = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            currentStreak: user.streak.current,
            bestStreak: user.streak.best,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserStreak = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Increment the current streak
        user.streak.current += 1;

        // Update the best streak if the current streak is greater
        if (user.streak.current > user.streak.best) {
            user.streak.best = user.streak.current;
        }

        // Update the last streak date
        user.streak.lastStreakDate = new Date();

        // Save the user
        await user.save();

        res.status(200).json(user.streak);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

