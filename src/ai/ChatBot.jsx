import { useState, useEffect, useRef } from "react";
import "./ChatBot.css";
import { sendMessageToAI } from "./chatService";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your SR Bulkers assistant. How may I help you today? 👋"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText) return;

    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await sendMessageToAI(userText);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: reply }]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      setMessages(prev => [...prev, {
        sender: "bot",
        text: "I'm having trouble connecting right now. Please try again later."
      }]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestion = (question) => {
    setInput(question);
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  const suggestedQuestions = [
    "What types of bulkers do you manufacture?",
    "Tell me about silo storage solutions",
    "What after-sales services do you offer?",
    "How do I get a quotation?",
    "What are your contact details?",
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <div
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
        title="Chat with us"
      >
        {open ? "✖" : "🤖"}
      </div>

      {open && (
        <div className="chatbot-container">

          {/* ── HEADER ── */}
          <div className="chatbot-header">
            <div className="header-left">
              <div className="header-avatar">🤖</div>
              <div className="header-info">
                <h3>SR Bulkers Assistant</h3>
                <span className="status-indicator">
                  <span className="status-dot" />
                  Online — Ready to help
                </span>
              </div>
            </div>
            <div className="header-actions">
              <button
                className="icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* ── MESSAGES ── */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-icon">
                  {msg.sender === "bot" ? "🤖" : "👤"}
                </div>
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot typing">
                <div className="message-icon">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── SUGGESTED QUESTIONS (shown only on first message) ── */}
          {messages.length === 1 && (
            <div className="suggested-questions">
              <p className="suggestions-label">Quick questions</p>
              <div className="suggestions-grid">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="suggestion-chip"
                    onClick={() => handleSuggestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── INPUT ── */}
          <div className="chatbot-input-area">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Ask about our products or services..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="send-button"
              >
                Send
              </button>
            </div>
            <div className="input-hint">Press Enter to send</div>
          </div>

        </div>
      )}
    </>
  );
};

export default ChatBot;
