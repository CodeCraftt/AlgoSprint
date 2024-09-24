import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
  },
  submittedCode: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  submittedOn: {
    type: Date,
    default: Date.now,
  },
  timeTaken: {
    type: Number, // in seconds
  },
  attempts: {
    type: Number,
    default: 1,
  },
  score: {
    type: Number, // based on difficulty and attempts
  },
});

export default mongoose.model('Submission', submissionSchema);
