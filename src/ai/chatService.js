// chatService.js — SR Bulkers AI Chat Service

const SYSTEM_PROMPT = `You are a helpful and friendly assistant for SR Bulkers, a company that manufactures industrial bulk handling equipment including bulker tankers and storage silos.

COMPANY OVERVIEW:
- Company: SR Bulkers
- Location: Mettur, Navapatti, Salem, Tamil Nadu, India
- Speciality: Bulker tankers and industrial silos for cement, fly ash, and GGBS transport/storage
- Website: https://sr-bulkers.vercel.app
- Working Hours: Monday–Saturday, 9 AM – 6 PM IST

PRODUCTS:
1. Bulker Tankers (pneumatic bulk transport):
   - 25–35 Cu. Mtr. — Cement, Fly Ash, GGBS — Standard Duty
   - 36–38 Cu. Mtr. — Cement, Fly Ash, GGBS — Heavy Duty
   - 38–40 Cu. Mtr. — Cement, Fly Ash, GGBS — Industrial Grade
   - 40–42 Cu. Mtr. — Cement, Fly Ash, GGBS — High Capacity
   - 42–45 Cu. Mtr. — Custom Applications — Bulk Transport

2. Industrial Silos (storage):
   - Cement Silos: 50–500 Tons with dust collection
   - Fly Ash Silos: 50–500 Tons with aeration system
   - Industrial Storage Silos: 100–1000 Tons
   - Mobile Silos: 20–100 Tons
   - Custom Silos: as per requirement

SERVICES:
- Manufacturing & custom fabrication
- On-site installation and commissioning
- Preventive maintenance & AMC (Annual Maintenance Contracts)
- Spare parts supply (genuine)
- Operator training & technical support
- Emergency breakdown support (24/7)

CONTACT:
- Sales & Service: +91-98423 98756
- Email: info@srbulkers.com
- Website: https://sr-bulkers.vercel.app

RESPONSE RULES:
1. Be concise, warm, and professional. Keep responses under 120 words unless detailed specs are needed.
2. Use bullet points or short paragraphs for clarity.
3. If you don't have specific data (exact pricing, stock, custom specs), say so honestly and direct them to call +91-98423 98756 or email info@srbulkers.com.
4. Never fabricate prices or delivery timelines.
5. If a question is unrelated to SR Bulkers, politely say it is outside your scope.
6. End uncertain answers with: "For accurate details, please call us at +91-98423 98756."`;

// In-memory conversation history
const conversationHistory = [];

export const sendMessageToAI = async (userMessage) => {
  conversationHistory.push({
    role: "user",
    content: userMessage.trim(),
  });

  const recentHistory = conversationHistory.slice(-20);

  // Get API key from environment (Vite or CRA)
  const apiKey =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_ANTHROPIC_API_KEY) ||
    (typeof process !== "undefined" && process.env?.REACT_APP_ANTHROPIC_API_KEY) ||
    "";

  if (!apiKey) {
    console.warn("No API key found. Using rule-based fallback.");
    const reply = getFallbackResponse(userMessage);
    conversationHistory.push({ role: "assistant", content: reply });
    return reply;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: recentHistory,
      }),
    });

    if (!response.ok) {
      throw new Error(`API ${response.status}`);
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || "Sorry, I could not generate a response.";
    conversationHistory.push({ role: "assistant", content: reply });
    return reply;

  } catch (error) {
    console.error("Chat API error:", error.message);
    const reply = getFallbackResponse(userMessage);
    conversationHistory.push({ role: "assistant", content: reply });
    return reply;
  }
};

// ── Rule-based fallback (works without API key) ──────────────────────────────
const getFallbackResponse = (message) => {
  const msg = message.toLowerCase();

  if (/hello|hi\b|hey|namaste|good morning|good afternoon|good evening/i.test(msg)) {
    return "👋 Hello! Welcome to SR Bulkers. I can help you with bulker tankers, silos, services, and more. What would you like to know?";
  }
  if (/bulker|tanker|capacity|cubic|cu\.?\s*mtr/i.test(msg)) {
    return "🚛 Our bulker range:\n• 25–35 Cu. Mtr. — Standard Duty\n• 36–38 Cu. Mtr. — Heavy Duty\n• 38–40 Cu. Mtr. — Industrial Grade\n• 40–42 Cu. Mtr. — High Capacity\n• 42–45 Cu. Mtr. — Custom\n\nAll handle Cement, Fly Ash & GGBS.\nFor pricing, call 📞 +91-98423 98756.";
  }
  if (/silo|storage|store/i.test(msg)) {
    return "🏭 Our silo range:\n• Cement Silos: 50–500 Tons\n• Fly Ash Silos: 50–500 Tons\n• Industrial Silos: 100–1000 Tons\n• Mobile Silos: 20–100 Tons\n• Custom silos available\n\nCall 📞 +91-98423 98756 for details.";
  }
  if (/price|cost|quot|rate|budget|how much/i.test(msg)) {
    return "💰 Pricing depends on capacity, spec, and delivery location. Contact our sales team for a precise quote:\n📞 +91-98423 98756\n📧 info@srbulkers.com";
  }
  if (/service|maintenance|amc|repair|support|after.?sale/i.test(msg)) {
    return "🔧 Our services:\n• Installation & commissioning\n• Annual Maintenance Contracts (AMC)\n• Genuine spare parts\n• 24/7 emergency support\n• Operator training\n\nCall 📞 +91-98423 98756 to schedule.";
  }
  if (/contact|phone|call|email|address|location|where|reach/i.test(msg)) {
    return "📞 SR Bulkers Contact:\n• Phone: +91-98423 98756\n• Email: info@srbulkers.com\n• Location: Mettur, Navapatti, Salem, Tamil Nadu\n• Hours: Mon–Sat, 9 AM – 6 PM\n• Web: sr-bulkers.vercel.app";
  }
  if (/cement|fly.?ash|ggbs|slag/i.test(msg)) {
    return "✅ Our equipment handles:\n• Cement\n• Fly Ash\n• GGBS (Ground Granulated Blast Furnace Slag)\n\nAvailable in bulker and silo configurations.\nCall 📞 +91-98423 98756 for specifics.";
  }
  if (/deliver|ship|lead.?time|how long/i.test(msg)) {
    return "🚚 Delivery timelines vary by product and location. For accurate lead times:\n📞 +91-98423 98756\n📧 info@srbulkers.com";
  }
  if (/warrant|guarant/i.test(msg)) {
    return "✅ All our products come with a manufacturer warranty. For full details based on your model:\n📞 +91-98423 98756";
  }
  if (/custom|special|bespoke/i.test(msg)) {
    return "🎯 Yes, we offer custom-built bulkers and silos to your exact specifications. Share your requirements with our team:\n📞 +91-98423 98756\n📧 info@srbulkers.com";
  }
  if (/about|company|who are|experience/i.test(msg)) {
    return "🏢 SR Bulkers is a manufacturer of industrial bulk handling equipment based in Salem, Tamil Nadu. We specialize in pneumatic bulker tankers and storage silos for cement, fly ash, and GGBS.\n\n🌐 sr-bulkers.vercel.app";
  }

  return "I'm not sure about that specific query. For accurate information, please reach out:\n📞 +91-98423 98756\n📧 info@srbulkers.com\n🕒 Mon–Sat, 9 AM – 6 PM\n\nWe're happy to help with bulkers, silos, and related services!";
};

export const clearConversation = () => {
  conversationHistory.length = 0;
};