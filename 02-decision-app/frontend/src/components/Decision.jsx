// src/components/Decision.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Decision = () => {
  const [message, setMessage] = useState('');
  const [decisions, setDecisions] = useState([]);


  // Load history throw component mounting 
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api');
        // Перевіряємо, чи response.data є масивом
        if (Array.isArray(response.data)) {
          setDecisions(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setDecisions([]); // Скидаємо до порожнього масиву
        }

      } catch (error) {
        console.log('Erro fetching history:', error);
        setDecisions([])
      }
    }
    fetchHistory();
  }, [])



  const analyzeDecision = async () => {
    if (message.trim()) {
      setDecisions((prevDecisions) => [...prevDecisions, { user: 'You', text: message }]);
      setMessage('');

      try {
        const response = await axios.post('http://localhost:5000/api', { message });
        setDecisions((prevDecisions) => [...prevDecisions, { user: 'Bot', text: response.data.reply }]);
      } catch (error) {
        console.error('Error:', error);
        setDecisions((prevDecisions) => [...prevDecisions, { user: 'Bot', text: 'Error analyzing decision' }]);
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