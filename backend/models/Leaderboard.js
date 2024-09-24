import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
  },
  streak: {
    type: Number,
  },
  lastSubmissionDate: {
    type: Date,
  },
});

export default mongoose.model('Leaderboard', leaderboardSchema);
