import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import decisionRoutes from './routes/decisionRoutes.js';
// import authRoutes from './routes/authRoutes.js';
import historyRoutes from './routes/historyRoutes.js';



dotenv.config();

const app = express();

// DB Connection & Server start
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api', decisionRoutes);
app.use('/api/history', historyRoutes);


mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useunifiedTopology: true,

}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});


// Uncomment the following lines if you have authentication routes
// app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Decision Insight API is running...');
  });
