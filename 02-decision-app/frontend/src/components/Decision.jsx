import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Decision = () => {
  const [message, setMessage] = useState('');
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api');
        if (Array.isArray(response.data)) {
          setDecisions(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setDecisions([]);
        }
      } catch (error) {
        console.log('Error fetching history:', error);
        setDecisions([]);
      }
    };

    fetchHistory();
  }, []);

  const analyzeDecision = async () => {
    if (!message.trim()) return;

    setDecisions((prev) => [...prev, { user: 'You', text: message }]);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api', { message });
      setDecisions((prev) => [...prev, { user: 'Bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setDecisions((prev) => [...prev, { user: 'Bot', text: 'Error analyzing decision' }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-roboto font-light flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center mb-6">🧠 Decision Insight</h2>


        <div className="bg-gray-800 rounded-lg p-4 mb-6 space-y-2 max-h-80 overflow-y-auto shadow-inner">
          {decisions
            .filter(d => d.user && d.text && d.text.trim() !== '')
            .map((d, i) => {
              const isUser = d.user.toLowerCase() === 'you'; // або 'user'
              return (
                <div
                  key={i}
                  className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-sm px-3 py-2 rounded-md shadow ${isUser
                        ? 'bg-gray-700 text-gray-100 self-start'
                        : 'bg-gray-600 text-gray-100 self-end'
                      }`}
                    style={{ lineHeight: '1.2', fontSize: '0.85rem' }}
                  >
                    <span className="block font-semibold mb-1 text-xs opacity-80">
                      {isUser ? 'You' : d.user}
                    </span>
                    <span>{d.text}</span>
                  </div>
                </div>
              );
            })}
        </div>


        {/* 
        <div className="bg-gray-800 rounded-lg p-4 mb-6 space-y-3 max-h-80 overflow-y-auto shadow-inner">
          {decisions
            .filter(d => d.text && d.text.trim() !== '') 
            .map((d, i) => (
              <div key={i} className="text-sm">
                <span className="font-medium text-blue-400">{d.user}:</span>{' '}
                <span className="text-gray-200">{d.text}</span>
              </div>
            ))}
        </div> */}


        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your decision to analyze..."
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={analyzeDecision}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition"
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
};

export default Decision;
