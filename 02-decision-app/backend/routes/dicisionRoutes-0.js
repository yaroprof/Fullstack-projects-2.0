// routes/decisionRoutes.js

import express from 'express';
import { OpenAI } from 'openai'; // ✅ правильний імпорт для openai@4
import dotenv from 'dotenv';

const router = express.Router();
// Завантаження змінних середовища з .env файлу
dotenv.config();

// Перевірка наявності ключа
if (!process.env.OPENAI_API_KEY) {
  throw new Error('❌ OPENAI_API_KEY is missing in .env');
}

// Ініціалізація клієнта
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST маршрут для аналізу рішень
router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // або 'gpt-4', якщо маєш доступ
      messages: [
        { role: 'system', content: 'You are a helpful assistant for analyzing decisions.' },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI error:', error);
    if (error.response?.status === 429) {
      res.status(429).json({
        error: "Quota exceeded",
        details: "You have exceeded your quota. Please upgrade your plan or wait.",
      });
    } else {
      res.status(500).json({
        error: "ChatGPT error",
        details: error.message || error.toString(),
      });
    }
  };
});
export default router;
