import React from 'react';

export default function Logo() {
  return (
    <div className="logo-container">
      <svg className="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Poppy Logo Design */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2"/>
        
        {/* Poppy Flower */}
        <circle cx="50" cy="35" r="12" fill="#FF6B9D"/>
        <circle cx="65" cy="45" r="12" fill="#FF6B9D"/>
        <circle cx="60" cy="60" r="12" fill="#FF6B9D"/>
        <circle cx="40" cy="60" r="12" fill="#FF6B9D"/>
        <circle cx="35" cy="45" r="12" fill="#FF6B9D"/>
        <circle cx="50" cy="50" r="8" fill="#FFD700"/>
        
        {/* AI Spark */}
        <circle cx="75" cy="25" r="4" fill="#00D9FF"/>
        <path d="M 75 21 L 75 29 M 71 25 L 79 25" stroke="#00D9FF" strokeWidth="1" fill="none"/>
      </svg>
      
      <div className="logo-text">
        <h1>Poppy Play</h1>
        <span className="ai-badge">AI</span>
      </div>

      <style jsx>{`\n        .logo-container {\n          display: flex;\n          align-items: center;\n          gap: 15px;\n          cursor: pointer;\n        }\n
        .logo {\n          width: 50px;\n          height: 50px;\n          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));\n          animation: float 3s ease-in-out infinite;\n        }\n
        @keyframes float {\n          0%, 100% { transform: translateY(0px); }\n          50% { transform: translateY(-10px); }\n        }\n
        .logo-text {\n          display: flex;\n          align-items: center;\n          gap: 8px;\n        }\n
        .logo-text h1 {\n          color: white;\n          font-size: 24px;\n          margin: 0;\n          font-weight: 700;\n          letter-spacing: -0.5px;\n        }\n
        .ai-badge {\n          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n          color: white;\n          padding: 4px 12px;\n          border-radius: 20px;\n          font-size: 12px;\n          font-weight: 700;\n          letter-spacing: 0.5px;\n        }\n
        @media (max-width: 768px) {\n          .logo-text h1 {\n            font-size: 18px;\n          }\n          .logo {\n            width: 40px;\n            height: 40px;\n          }\n        }\n      `}\n      </style>
    </div>
  );
}