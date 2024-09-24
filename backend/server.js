import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import competitionRoutes  from './routes/competitionRoutes.js';
import feedbackRoutes  from './routes/feedbackRoutes.js';
import adminRoutes  from './routes/adminRoutes.js';
import chatbotRoutes  from './routes/chatbotRoutes.js';
import codeExecutionRoutes from './routes/codeExecutionRoutes.js';
// import leaderboardRoutes from './routes/leaderboardRoutes.js';
// import weeklyChallengeRoutes from './routes/weeklyChallengeRoutes.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware for JSON body parsing

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/code-execution', codeExecutionRoutes);

// app.use('/api/leaderboard', leaderboardRoutes);
// app.use('/api/challenges', weeklyChallengeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
