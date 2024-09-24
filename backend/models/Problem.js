import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  companyNames: {
    type: [String],
  },
  hints: {
    type: [String],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  solution: {
    type: String,
  },
  testCases: [{
    input: {
      type: String,
    },
    output: {
      type: String,
    },
  }],
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  approvedOn: {
    type: Date,
  },
});

export default mongoose.model('Problem', problemSchema);
