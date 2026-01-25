// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Use local emulator URL in development, production URL in production
const API_URL = isDevelopment 
  ? "http://127.0.0.1:5001/srbulkers-03/us-central1/chatbot"  // Note: 127.0.0.1 instead of localhost
  : "https://us-central1-srbulkers-03.cloudfunctions.net/chatbot";

export const sendMessageToAI = async (message) => {
  // Local fallback responses if Firebase is not available
  const fallbackResponses = {
    'silo': "We manufacture various types of industrial silos including cement silos (50-500 tons) and grain silos (100-1000 tons) with customizable capacities.",
    'cement': "Our cement silos are designed for durability and high-volume storage with corrosion-resistant materials.",
    'service': "We provide manufacturing, installation, maintenance, and AMC services with 24/7 support.",
    'quote': "For quotations, please provide product type, capacity, and delivery location. Contact sales@srbuilders.com",
    'contact': "Contact us at:\n📍 Industrial Area, Plot No. 45\n📞 +91-9876543210\n📧 info@srbuilders.com",
    'hello': "Hello! How can I assist you with our industrial products today?",
    'hi': "Hi there! I can help with silos, cement storage, services, quotations, and contact information."
  };

  try {
    console.log(`Sending to: ${API_URL}`);
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        message: message.trim(),
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data.reply;
    
  } catch (error) {
    console.warn("Chat service error, using fallback:", error.message);
    
    // Use fallback responses based on keywords
    const lowerMessage = message.toLowerCase();
    
    for (const [keyword, response] of Object.entries(fallbackResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Default fallback
    return "I'm currently offline. Please contact our team directly at info@srbuilders.com or call +91-9876543210.";
  }
};