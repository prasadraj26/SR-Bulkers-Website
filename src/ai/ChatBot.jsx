import { useState, useEffect, useRef } from "react";
import "./ChatBot.css";
import { sendMessageToAI, clearConversation } from "./chatService";

const SUGGESTED_QUESTIONS = [
  "What types of bulkers do you manufacture?",
  "Tell me about silo storage solutions",
  "What after-sales services do you offer?",
  "How do I get a quotation?",
  "What are your contact details?",
];

// Renders text with **bold** and newlines
const renderText = (text) => {
  if (!text) return null;
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const rendered = parts.map((part, j) =>
      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
    );
    return <span key={i}>{rendered}<br /></span>;
  });
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your SR Bulkers assistant. How may I help you today? 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const sendMessage = async (overrideText) => {
    const userText = (overrideText ?? input).trim();
    if (!userText || isTyping) return;

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await sendMessageToAI(userText);
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
        setIsTyping(false);
      }, 400);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm having trouble connecting right now. Please try again later.\n\nFor immediate help:\n📞 +91-98423 98756\n📧 info@srbulkers.com",
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = () => {
    clearConversation();
    setMessages([
      {
        sender: "bot",
        text: "Hello! I'm your SR Bulkers assistant. How may I help you today? 👋",
      },
    ]);
    setInput("");
  };

  // Current time string
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const showSuggestions = messages.length === 1;

  return (
    <>
      {/* Floating Toggle */}
      <div
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
        title="Chat with us"
      >
        <span className="toggle-icon">{open ? "✖" : "🤖"}</span>
      </div>

      {open && (
        <div className="chatbot-container">

          {/* HEADER */}
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
                onClick={handleReset}
                title="New chat"
                aria-label="Reset chat"
              >
                ↺
              </button>
              <button
                className="icon-btn"
                onClick={() => setOpen(false)}
                title="Close"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === "bot" ? "🤖" : "👤"}
                </div>
                <div className="message-bubble">
                  <div className="message-text">{renderText(msg.text)}</div>
                  <div className="message-time">{now}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-bubble typing-bubble">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* SUGGESTED QUESTIONS — only on first message */}
          {showSuggestions && (
            <div className="suggested-questions">
              <p className="suggestions-label">Quick questions</p>
              <div className="suggestions-list">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    className="suggestion-chip"
                    onClick={() => sendMessage(q)}
                    disabled={isTyping}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* INPUT */}
          <div className="chatbot-input-area">
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about our products or services..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                maxLength={500}
              />
              <button
                className="send-button"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                aria-label="Send"
              >
                ➤
              </button>
            </div>
            <div className="input-footer">
              <span>Press Enter to send</span>
              <a href="tel:6384153370" className="quick-call">📞 Quick Call</a>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default ChatBot;