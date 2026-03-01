import React, { useState, useRef, useEffect } from 'react';

export default function ChatBar() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: input,
          context: 'code-generation'
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: 'ai',
          code: data.code,
          language: data.language,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>💬 Ask Anything, Say Anything</h2>
        <p>Powered by GitHub Copilot</p>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h3>👋 Welcome to Poppy Play AI</h3>
            <p>Try asking me to:</p>
            <ul>
              <li>"Create a React todo app"</li>
              <li>"Build a REST API with Node.js"</li>
              <li>"Generate a Python machine learning script"</li>
              <li>"Fix this code: [paste your code]"</li>
            </ul>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}> 
              <div className="message-avatar">
                {message.sender === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <p>{message.text}</p>
                {message.code && (
                  <div className="code-block">
                    <span className="code-language">{message.language || 'code'}</span>
                    <pre><code>{message.code}</code></pre>
                    <button className="copy-btn" onClick={() => {
                      navigator.clipboard.writeText(message.code);
                      alert('Copied to clipboard!');
                    }}>
                      📋 Copy Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="message ai loading">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything... 'Build a project', 'Fix this code', 'Create a function'..."
          disabled={loading}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="send-btn"
        >
          {loading ? '⏳' : '➤'}
        </button>
      </form>

      <style jsx>{`\n        .chat-container {\n          display: flex;\n          flex-direction: column;\n          height: 100%;\n          background: white;\n          border-radius: 12px;\n          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n          overflow: hidden;\n        }\n\n        .chat-header {\n          padding: 20px;\n          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n          color: white;\n          border-bottom: 2px solid rgba(0, 0, 0, 0.1);\n        }\n\n        .chat-header h2 {\n          margin: 0;\n          font-size: 18px;\n        }\n\n        .chat-header p {\n          margin: 5px 0 0 0;\n          font-size: 13px;\n          opacity: 0.9;\n        }\n\n        .messages-container {\n          flex: 1;\n          overflow-y: auto;\n          padding: 20px;\n          display: flex;\n          flex-direction: column;\n          gap: 15px;\n        }\n\n        .empty-state {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          justify-content: center;\n          height: 100%;\n          color: #999;\n          text-align: center;\n        }\n\n        .empty-state h3 {\n          font-size: 20px;\n          margin-bottom: 10px;\n          color: #333;\n        }\n\n        .empty-state ul {\n          list-style: none;\n          padding: 0;\n          margin: 15px 0 0 0;\n          text-align: left;\n        }\n\n        .empty-state li {\n          padding: 8px 0;\n          border-left: 3px solid #667eea;\n          padding-left: 10px;\n        }\n\n        .message {\n          display: flex;\n          gap: 10px;\n          animation: slideIn 0.3s ease-out;\n        }\n\n        @keyframes slideIn {\n          from {\n            opacity: 0;\n            transform: translateY(10px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n\n        .message.user {\n          justify-content: flex-end;\n        }\n\n        .message-avatar {\n          font-size: 24px;\n          min-width: 30px;\n          text-align: center;\n        }\n\n        .message-content {\n          max-width: 70%;\n          padding: 12px 15px;\n          border-radius: 10px;\n          word-wrap: break-word;\n        }\n\n        .message.user .message-content {\n          background: #667eea;\n          color: white;\n          border-radius: 10px 2px 10px 10px;\n        }\n\n        .message.ai .message-content {\n          background: #f0f0f0;\n          color: #333;\n          border-radius: 2px 10px 10px 10px;\n        }\n\n        .message-content p {\n          margin: 0;\n        }\n\n        .code-block {\n          margin-top: 10px;\n          background: #1e1e1e;\n          color: #d4d4d4;\n          padding: 10px;\n          border-radius: 6px;\n          font-family: 'Courier New', monospace;\n          font-size: 12px;\n          overflow-x: auto;\n          position: relative;\n        }\n\n        .code-language {\n          display: inline-block;\n          background: #333;\n          padding: 4px 8px;\n          border-radius: 4px;\n          font-size: 10px;\n          margin-bottom: 8px;\n          text-transform: uppercase;\n        }\n\n        .code-block pre {\n          margin: 0;\n          max-height: 200px;\n          overflow-y: auto;\n        }\n\n        .copy-btn {\n          margin-top: 8px;\n          padding: 6px 12px;\n          background: #667eea;\n          color: white;\n          border: none;\n          border-radius: 4px;\n          cursor: pointer;\n          font-size: 12px;\n          font-weight: 600;\n        }\n\n        .copy-btn:hover {\n          background: #764ba2;\n        }\n\n        .typing-indicator {\n          display: flex;\n          gap: 4px;\n        }\n\n        .typing-indicator span {\n          width: 8px;\n          height: 8px;\n          background: #999;\n          border-radius: 50%;\n          animation: bounce 1.4s infinite;\n        }\n\n        .typing-indicator span:nth-child(2) {\n          animation-delay: 0.2s;\n        }\n\n        .typing-indicator span:nth-child(3) {\n          animation-delay: 0.4s;\n        }\n\n        @keyframes bounce {\n          0%, 60%, 100% { transform: translateY(0); }\n          30% { transform: translateY(-10px); }\n        }\n\n        .chat-input-form {\n          display: flex;\n          gap: 10px;\n          padding: 15px 20px;\n          background: white;\n          border-top: 1px solid #e0e0e0;\n        }\n\n        .chat-input {\n          flex: 1;\n          padding: 12px 15px;\n          border: 1px solid #ddd;\n          border-radius: 25px;\n          font-size: 14px;\n          outline: none;\n          transition: border-color 0.3s;\n        }\n\n        .chat-input:focus {\n          border-color: #667eea;\n        }\n\n        .send-btn {\n          padding: 12px 20px;\n          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n          color: white;\n          border: none;\n          border-radius: 25px;\n          cursor: pointer;\n          font-weight: 600;\n          transition: transform 0.2s;\n        }\n\n        .send-btn:hover:not(:disabled) {\n          transform: scale(1.05);\n        }\n\n        .send-btn:disabled {\n          opacity: 0.6;\n          cursor: not-allowed;\n        }\n\n        @media (max-width: 768px) {\n          .message-content {\n            max-width: 90%;\n          }\n        }\n      `}\n      </style>\n    </div>\n  );\n}