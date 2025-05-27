// src/components/Decision.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Decision = () => {
  const [message, setMessage] = useState('');
  const [decisions, setDecisions] = useState([]);

  const analyzeDecision = async () => {
    if (message.trim()) {
      // Додаємо повідомлення користувача до історії
      setDecisions((prevDecisions) => [
        ...prevDecisions,
        { user: 'You', text: message },
      ]);
      setMessage('');

      try {
        const response = await axios.post('http://localhost:5000/api', { message });
        // Додаємо відповідь бота до історії
        setDecisions((prevDecisions) => [
          ...prevDecisions,
          { user: 'Bot', text: response.data.reply },
        ]);
      } catch (error) {
        console.error('Error:', error);
        setDecisions((prevDecisions) => [
          ...prevDecisions,
          { user: 'Bot', text: 'Error analyzing decision' },
        ]);
      }
    }
  };

  return (
    <div>
      <h2>Decision Insight</h2>
      <div>
        {decisions.map((decision, index) => (
          <p key={index}>
            <strong>{decision.user}: </strong>
            {decision.text}
          </p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        //   onKeyPress={(e) => e.key === 'Enter' && analyzeDecision()}
          placeholder="Enter your decision to analyze..."
        />
        <button onClick={analyzeDecision}>Analyze</button>
      </div>
    </div>
  );
};

export default Decision;