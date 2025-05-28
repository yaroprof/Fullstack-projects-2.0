import express from 'express';
import Decision from '../models/Decision.js';
import authMiddleware from '../authMiddleware/authMiddleware.js';

const router = express.Router();

// GET /api/decisions/history — персональна історія
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('req.user:', req.user); // 👈 ДОДАЙ ЦЕ
    // Тепер звертаємось до req.user.id
    const decisions = await Decision.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(decisions);
  } catch (error) {
    console.error('❌ Error fetching history:', error); // 👈 І ЦЕ
    res.status(500).json({ error: 'Failed to fetch decision history' });
  }
});

export default router;
