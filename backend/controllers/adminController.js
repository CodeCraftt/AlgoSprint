import Problem  from '../models/Problem.js';
import User  from '../models/User.js';

export const getUnapprovedProblems = async (req, res) => {
    try {
        const problems = await Problem.find({ isApproved: false });
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
