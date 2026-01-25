const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { getRuleBasedReply } = require("./chatbot/ruleChatbot.js");

admin.initializeApp();

exports.chatbot = onRequest((req, res) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  
  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }
  
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ 
      reply: "Method not allowed. Please use POST." 
    });
  }

  try {
    const { message } = req.body;
    
    if (!message || typeof message !== "string") {
      return res.status(400).json({ 
        reply: "Please provide a valid question." 
      });
    }
    
    // Get reply from rule-based system
    const reply = getRuleBasedReply(message);
    
    console.log(`Chatbot: "${message.substring(0, 50)}..." -> Response sent`);
    
    return res.status(200).json({ reply });
    
  } catch (error) {
    console.error("Chatbot error:", error);
    return res.status(500).json({ 
      reply: "Service temporarily unavailable. Please contact support@srbuilders.com" 
    });
  }
});