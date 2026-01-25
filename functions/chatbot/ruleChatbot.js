// Enhanced rule-based response system
const getRuleBasedReply = (message) => {
  const text = message.toLowerCase().trim();
  
  // Define intent patterns with better matching
  const intents = {
    // Silos intent
    silos: {
      keywords: ['silo', 'silos', 'storage', 'container', 'tank', 'capacity'],
      patterns: [
        /what.*silos?/i,
        /types? of silos?/i,
        /silo.*capacity/i,
        /storage.*solution/i
      ],
      responses: [
        "We manufacture various types of industrial silos:\n• Cement Silos (50-500 tons)\n• Grain Silos (100-1000 tons)\n• Fly Ash Silos\n• Custom Silos\n\nAll feature corrosion-resistant materials and automated monitoring.",
        "Our silo capacities range from 50 to 1000 tons with features like:\n✓ Corrosion-resistant coatings\n✓ Automated level monitoring\n✓ Safety valves\n✓ Customizable discharge\n✓ ISO-certified manufacturing"
      ]
    },
    
    // Cement intent
    cement: {
      keywords: ['cement', 'concrete', 'powder', 'bulk cement'],
      patterns: [
        /cement.*silo/i,
        /store.*cement/i,
        /cement.*storage/i
      ],
      responses: [
        "For cement storage, we recommend:\n• Steel Cement Silos with moisture protection\n• Aeration pads for easy discharge\n• Dust collection systems\n• Standard capacities: 50T, 100T, 200T, 500T",
        "Our cement silos feature:\n• 5-8mm thick steel plates\n• Epoxy internal coating\n• Rotary discharge systems\n• Safety manholes and ladders"
      ]
    },
    
    // Services intent
    services: {
      keywords: ['service', 'maintenance', 'install', 'repair', 'amc'],
      patterns: [
        /what.*services?/i,
        /maintenance.*service/i,
        /annual maintenance/i
      ],
      responses: [
        "We offer comprehensive services:\n\n1. Manufacturing & Fabrication\n2. Installation & Commissioning\n3. Maintenance Services\n4. Annual Maintenance Contracts (AMC)\n\n24/7 emergency support available.",
        "Our services include:\n✓ Custom silo design\n✓ Site preparation & erection\n✓ Preventive maintenance\n✓ Spare parts supply\n✓ Technical consultations"
      ]
    },
    
    // Quotation intent
    quotation: {
      keywords: ['quote', 'price', 'cost', 'quotation', 'how much'],
      patterns: [
        /get.*quote/i,
        /how much.*cost/i,
        /price.*silo/i,
        /send.*quotation/i
      ],
      responses: [
        "For accurate pricing, we need:\n1. Product type\n2. Required capacity\n3. Delivery location\n4. Special requirements\n\nContact sales@srbuilders.com",
        "Quotations within 24 hours. Options:\n• Online form on website\n• Email: quotes@srbuilders.com\n• Phone: +91-XXXXXXXXXX\n\nIncludes: Itemized pricing, timeline, terms."
      ]
    },
    
    // Contact intent
    contact: {
      keywords: ['contact', 'address', 'phone', 'email', 'location'],
      patterns: [
        /how.*contact/i,
        /your.*contact/i,
        /phone.*number/i,
        /email.*address/i
      ],
      responses: [
        "**Contact Information:**\n📍 Head Office: Industrial Area, Plot No. 45\n📞 Sales: +91-9876543210 (9AM-6PM)\n📧 Email: info@srbuilders.com\n🌐 Website: www.srbuilders.com",
        "Reach us at:\n• Sales: sales@srbuilders.com\n• Service: service@srbuilders.com\n• Technical: technical@srbuilders.com\n\nBusiness: Mon-Fri 9AM-6PM, Sat 9AM-2PM"
      ]
    },
    
    // Greeting intent
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
      patterns: [/^(hello|hi|hey)/i],
      responses: [
        "Hello! Welcome to SR Builders. How can I help you today?",
        "Hi! I specialize in industrial products. What would you like to know?"
      ]
    },
    
    // Thanks intent
    thanks: {
      keywords: ['thank', 'thanks', 'appreciate'],
      patterns: [/(thank you|thanks|thx)/i],
      responses: [
        "You're welcome! Is there anything else I can help with?",
        "Happy to assist! Let me know if you have more questions."
      ]
    }
  };

  // Calculate intent scores
  let bestIntent = null;
  let highestScore = 0;

  for (const [intentName, intent] of Object.entries(intents)) {
    let score = 0;
    
    // Check keywords
    intent.keywords.forEach(keyword => {
      if (text.includes(keyword)) score += 2;
    });
    
    // Check patterns
    intent.patterns.forEach(pattern => {
      if (pattern.test(message)) score += 3;
    });
    
    if (score > highestScore) {
      highestScore = score;
      bestIntent = intentName;
    }
  }

  // Return response from best matching intent
  if (bestIntent && highestScore >= 2) {
    const responses = intents[bestIntent].responses;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  // Fallback response
  const fallbacks = [
    "I understand you're asking about our industrial products. Could you provide more specific details?",
    "That's an interesting question. Could you clarify what specific information you need?",
    "I can help you with:\n• Silos and storage solutions\n• Cement products\n• Our services\n• Getting a quotation\n• Contact information\n\nWhat would you like to know more about?"
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

module.exports = { getRuleBasedReply };