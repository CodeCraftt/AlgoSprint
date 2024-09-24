import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'mentor'],
    default: 'student',
  },
  profilePic: {
    type: String, // URL to profile picture
  },
  signupDate: {
    type: Date,
    default: Date.now,
  },
  points: {
    type: Number,
    default: 0,
  },
  streak: {
    current: {
      type: Number,
      default: 0,
    },
    best: {
      type: Number,
      default: 0,
    },
    lastStreakDate: {
      type: Date,
    },
  },
  solvedProblems: [{
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
    },
    solvedOn: {
      type: Date,
      default: Date.now,
    },
    attempts: {
      type: Number,
      default: 1,
    },
  }],
  learningPath: {
    track: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    currentProblemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
    },
  },
  achievements: [{
    type: String,
  }],
});

export default mongoose.model('User', userSchema);
