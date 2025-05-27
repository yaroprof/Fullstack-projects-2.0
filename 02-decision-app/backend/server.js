import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import decisionRoutes from './routes/dicisionRoutes.js';
// import authRoutes from './routes/authRoutes.js';



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection & Server start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {

}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.use('/api', decisionRoutes);

// Uncomment the following lines if you have authentication routes
// app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Decision Insight API is running...');
  });
