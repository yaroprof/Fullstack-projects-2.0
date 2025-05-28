import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Decision = () => {
  const [message, setMessage] = useState('');
  const [decisions, setDecisions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setDecisions([{ user: 'Bot', text: 'You have been logged out.' }]);
  };

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setDecisions((prev) => [...prev, { user: 'Bot', text: 'Please log in to view history' }]);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/decision-history', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        const formatted = response.data.flatMap((item) => [
          { user: 'You', text: item.userMessage },
          { user: 'Bot', text: item.aiResponse },
        ]);
        setDecisions(formatted);
      } else {
        setDecisions([{ user: 'Bot', text: 'Unexpected response format from server.' }]);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      setDecisions((prev) => [...prev, { user: 'Bot', text: 'Error fetching history' }]);
    }
  };

  const analyzeDecision = async () => {
    if (!message.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setDecisions((prev) => [...prev, { user: 'Bot', text: 'Please log in to analyze decisions' }]);
      return;
    }

    setDecisions((prev) => [...prev, { user: 'You', text: message }]);
    setMessage('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api',
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDecisions((prev) => [...prev, { user: 'Bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setDecisions((prev) => [...prev, { user: 'Bot', text: 'Error analyzing decision' }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans font-light flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-normal text-center mb-6 tracking-wide">Decision Insight</h2>

        <div className="mb-4 flex justify-center gap-2">
          {!isLoggedIn && (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white transition"
              >
                Register
              </button>
            </>
          )}

          {isLoggedIn && (
            <>
              <button
                onClick={fetchHistory}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition"
              >
                Load History
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-6 space-y-3 max-h-[40rem] overflow-y-auto shadow-inner">
          {decisions
            .filter((d) => d.user && d.text && d.text.trim())
            .map((d, i) => {
              const isUser = d.user.toLowerCase() === 'you';
              return (
                <div
                  key={i}
                  className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-sm px-3 py-2 rounded-md shadow text-sm ${
                      isUser ? 'bg-gray-700 text-gray-100' : 'bg-gray-600 text-gray-100'
                    }`}
                    style={{ lineHeight: '1.4' }}
                  >
                    <span className="block font-medium text-xs opacity-70 mb-1">
                      {isUser ? 'You' : 'Bot'}
                    </span>
                    <span>{d.text}</span>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your decision to analyze..."
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={analyzeDecision}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition"
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
};

export default Decision;
