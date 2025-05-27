import express from 'express';
import axios from 'axios'; // нова бібліотека для HTTP запитів
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

// Перевірка наявності ключа
if (!process.env.GROQ_API_KEY) {
  throw new Error('❌ GROQ_API_KEY is missing in .env');
}


// GET-запит (наприклад, для перевірки статусу API)
router.get('/', (req, res) => {

  res.json({ message: 'API is working. Use POST to analyze decisions.' });
});

// POST маршрут для аналізу рішень
router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
  
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for analyzing decisions.' },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Groq error:', error.response?.data || error.message);
    res.status(500).json({
      error: "Groq error",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
