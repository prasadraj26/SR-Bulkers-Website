// chatService.js

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Use local emulator URL in development, production URL in production
const API_URL = isDevelopment 
  ? "http://127.0.0.1:5001/srbulkers-03/us-central1/chatbot"
  : "https://us-central1-srbulkers-03.cloudfunctions.net/chatbot";

// Helper function to create formatted table responses
const createTableResponse = (title, headers, rows) => {
  let table = `${title}\n\n`;
  
  // Create header row with separators
  table += `${headers[0]} | ${headers[1]}\n`;
  table += `${'-'.repeat(headers[0].length)} | ${'-'.repeat(headers[1].length)}\n`;
  
  // Add data rows
  rows.forEach(row => {
    table += `${row[0]} | ${row[1]}\n`;
  });
  
  return table;
};

// Rule-based response system
const responseRules = [
  // Bulker Range Queries
  {
    keywords: ['bulker', 'bulkers', 'bulker range', 'bulker capacity', 'bulker sizes'],
    response: () => {
      return createTableResponse(
        "🚛 Our Premium Bulker Range:",
        ["Capacity (Cu. Mtr.)", "Application"],
        [
          ["25 - 35 Cu. Mtr.", "Cement, Fly Ash and GGBS"],
          ["36 - 38 Cu. Mtr.", "Cement, Fly Ash and GGBS - Heavy Duty"],
          ["38 - 40 Cu. Mtr.", "Cement, Fly Ash and GGBS - Industrial Grade"],
          ["40 - 42 Cu. Mtr.", "Cement, Fly Ash and GGBS - High Capacity"],
          ["42 - 45 Cu. Mtr.", "Custom Applications - Bulk Transport"]
        ]
      );
    }
  },
  
  // Specific Bulker Capacity Queries
  {
    keywords: ['25-35', '25 to 35', '25 cu', '35 cu'],
    response: () => {
      return createTableResponse(
        "📊 25-35 Cu. Mtr. Bulker Details:",
        ["Specification", "Details"],
        [
          ["Capacity Range", "25 to 35 Cubic Meters"],
          ["Primary Use", "Cement, Fly Ash and GGBS"],
          ["Chassis Type", "Standard Duty"],
          ["Unloading System", "Pneumatic/Hydraulic"],
          ["Typical Application", "Short to Medium Distance Transport"]
        ]
      );
    }
  },
  
  {
    keywords: ['36-38', '36 to 38', '36 cu', '38 cu'],
    response: () => {
      return createTableResponse(
        "📊 36-38 Cu. Mtr. Bulker Details:",
        ["Specification", "Details"],
        [
          ["Capacity Range", "36 to 38 Cubic Meters"],
          ["Primary Use", "Cement, Fly Ash and GGBS - Heavy Duty"],
          ["Chassis Type", "Heavy Duty"],
          ["Unloading System", "Advanced Pneumatic with Booster"],
          ["Typical Application", "Medium to Long Distance Transport"],
          ["Special Feature", "Reinforced Construction for Durability"]
        ]
      );
    }
  },
  
  {
    keywords: ['38-40', '38 to 40', '38 cu', '40 cu'],
    response: () => {
      return createTableResponse(
        "📊 38-40 Cu. Mtr. Bulker Details:",
        ["Specification", "Details"],
        [
          ["Capacity Range", "38 to 40 Cubic Meters"],
          ["Primary Use", "Cement, Fly Ash and GGBS - Industrial Grade"],
          ["Chassis Type", "Extra Heavy Duty"],
          ["Unloading System", "High-Efficiency Pneumatic System"],
          ["Typical Application", "Long Distance Transport"],
          ["Special Feature", "Optimized Aerodynamics for Fuel Efficiency"]
        ]
      );
    }
  },
  
  {
    keywords: ['40-42', '40 to 42', '40 cu', '42 cu'],
    response: () => {
      return createTableResponse(
        "📊 40-42 Cu. Mtr. Bulker Details:",
        ["Specification", "Details"],
        [
          ["Capacity Range", "40 to 42 Cubic Meters"],
          ["Primary Use", "Cement, Fly Ash and GGBS - High Capacity"],
          ["Chassis Type", "Premium Heavy Duty"],
          ["Unloading System", "Advanced Multi-Stage Pneumatic"],
          ["Typical Application", "Interstate Bulk Transport"],
          ["Special Feature", "Maximum Payload Capacity with Stability"]
        ]
      );
    }
  },
  
  {
    keywords: ['42-45', '42 to 45', '42 cu', '45 cu'],
    response: () => {
      return createTableResponse(
        "📊 42-45 Cu. Mtr. Bulker Details:",
        ["Specification", "Details"],
        [
          ["Capacity Range", "42 to 45 Cubic Meters"],
          ["Primary Use", "Custom Applications - Bulk Transport"],
          ["Chassis Type", "Custom Engineered"],
          ["Unloading System", "Customized Pneumatic/Hydraulic"],
          ["Typical Application", "Specialized Bulk Material Transport"],
          ["Special Feature", "Tailor-made Solutions for Specific Requirements"]
        ]
      );
    }
  },
  
  // Silo Queries (existing)
  {
    keywords: ['silo', 'silos', 'storage silo'],
    response: () => {
      return createTableResponse(
        "🏭 Our Industrial Silo Range:",
        ["Type", "Capacity"],
        [
          ["Cement Silo", "50 - 500 Tons"],
          ["Fly Ash Silo", "50 - 500 Tons"],
          ["Industrial Storage Silo", "100 - 1000 Tons"],
          ["Custom Silos", "As per requirement"]
        ]
      );
    }
  },
  
  // Cement-related queries
  {
    keywords: ['cement', 'cement silo', 'cement storage'],
    response: () => {
      return createTableResponse(
        "🏗️ Cement Storage Solutions:",
        ["Product", "Details"],
        [
          ["Cement Silos", "50-500 tons capacity with corrosion-resistant materials"],
          ["Cement Bulkers", "25-45 Cu. Mtr. for cement transport"],
          ["Installation", "On-site assembly and commissioning"],
          ["Maintenance", "Regular maintenance packages available"]
        ]
      );
    }
  },
  
  // Fly Ash queries
  {
    keywords: ['fly ash', 'ash'],
    response: () => {
      return createTableResponse(
        "🌫️ Fly Ash Handling Solutions:",
        ["Product", "Details"],
        [
          ["Fly Ash Silos", "50-500 tons with aeration system"],
          ["Fly Ash Bulkers", "25-45 Cu. Mtr. specialized for fly ash"],
          ["Unloading System", "Fluidized aeration for smooth flow"],
          ["Features", "Dust-free operation, moisture protection"]
        ]
      );
    }
  },
  
  // GGBS queries
  {
    keywords: ['ggbs', 'slag'],
    response: () => {
      return tableResponse(
        "⚙️ GGBS Handling Solutions:",
        ["Product", "Details"],
        [
          ["GGBS Silos", "50-500 tons with specialized liners"],
          ["GGBS Bulkers", "25-45 Cu. Mtr. abrasion-resistant"],
          ["Unloading System", "Enhanced pneumatic for GGBS"],
          ["Features", "Wear-resistant, moisture-controlled"]
        ]
      );
    }
  },
  
  // Service queries
  {
    keywords: ['service', 'services', 'maintenance', 'amc'],
    response: () => {
      return createTableResponse(
        "🔧 Our Service Offerings:",
        ["Service Type", "Details"],
        [
          ["Manufacturing", "Custom fabrication as per specifications"],
          ["Installation", "On-site installation and commissioning"],
          ["Maintenance", "Regular maintenance packages"],
          ["AMC", "Annual Maintenance Contracts with 24/7 support"],
          ["Repairs", "Quick response repair services"],
          ["Spare Parts", "Genuine spare parts availability"]
        ]
      );
    }
  },
  
  // Quote/Price queries
  {
    keywords: ['quote', 'quotation', 'price', 'cost', 'pricing'],
    response: () => {
      return createTableResponse(
        "💰 For Quotations:",
        ["Requirement", "Contact Information"],
        [
          ["Product Type", "Please specify (Bulker/Silo/Other)"],
          ["Capacity", "Required capacity in Cu. Mtr. or Tons"],
          ["Delivery Location", "Destination for delivery"],
          ["Timeline", "Expected delivery timeframe"],
          ["Contact", "sales@srbuilders.com or +91-9876543210"]
        ]
      );
    }
  },
  
  // Contact information
  {
    keywords: ['contact', 'address', 'phone', 'email', 'location', 'reach'],
    response: () => {
      return createTableResponse(
        "📞 Contact Information:",
        ["Method", "Details"],
        [
          ["📍 Address", "Industrial Area, Plot No. 45, Manufacturing Zone"],
          ["📞 Phone", "+91-9876543210 (Sales)"],
          ["📞 Phone", "+91-9876543211 (Service)"],
          ["📧 Email", "info@srbuilders.com (General)"],
          ["📧 Email", "sales@srbuilders.com (Sales)"],
          ["📧 Email", "service@srbuilders.com (Service)"],
          ["🕒 Hours", "Monday-Saturday: 9:00 AM - 6:00 PM"]
        ]
      );
    }
  },
  
  // Basic greetings
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    response: () => {
      return "👋 Hello! Welcome to SR Builders. I'm your virtual assistant for industrial product information.\n\n" +
             "I can help you with:\n" +
             "• Bulker ranges (25-45 Cu. Mtr.)\n" +
             "• Silo capacities (50-1000 Tons)\n" +
             "• Cement, Fly Ash & GGBS handling\n" +
             "• Services & AMC\n" +
             "• Quotations & Contact details\n\n" +
             "How may I assist you today?";
    }
  }
];

// Default fallback response
const defaultResponse = () => {
  return createTableResponse(
    "🤖 How Can I Help You?",
    ["Category", "Try Asking About"],
    [
      ["Bulkers", "bulker range, 36-38 capacity, 40-42 Cu. Mtr."],
      ["Silos", "silo types, cement silo, fly ash silo"],
      ["Materials", "cement, fly ash, GGBS handling"],
      ["Services", "service, maintenance, AMC"],
      ["Contact", "contact, address, phone, email"],
      ["Quotes", "quote, price, quotation"]
    ]
  );
};

// Main function to find matching response
const findMatchingResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Check for exact capacity matches first
  if (lowerMessage.includes('36') && (lowerMessage.includes('38') || lowerMessage.includes('to'))) {
    return responseRules.find(rule => rule.keywords.includes('36-38'));
  }
  if (lowerMessage.includes('38') && (lowerMessage.includes('40') || lowerMessage.includes('to'))) {
    return responseRules.find(rule => rule.keywords.includes('38-40'));
  }
  if (lowerMessage.includes('40') && (lowerMessage.includes('42') || lowerMessage.includes('to'))) {
    return responseRules.find(rule => rule.keywords.includes('40-42'));
  }
  if (lowerMessage.includes('42') && (lowerMessage.includes('45') || lowerMessage.includes('to'))) {
    return responseRules.find(rule => rule.keywords.includes('42-45'));
  }
  if (lowerMessage.includes('25') && (lowerMessage.includes('35') || lowerMessage.includes('to'))) {
    return responseRules.find(rule => rule.keywords.includes('25-35'));
  }
  
  // General keyword matching
  for (const rule of responseRules) {
    if (rule.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return rule;
    }
  }
  
  return null;
};

export const sendMessageToAI = async (message) => {
  // First try Firebase Cloud Function
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
    console.warn("Chat service error, using rule-based fallback:", error.message);
    
    // Use rule-based responses as fallback
    const matchedRule = findMatchingResponse(message);
    
    if (matchedRule) {
      return matchedRule.response();
    }
    
    // Return default response with helpful suggestions
    return defaultResponse();
  }
};

// Export for testing/development
export const testRules = (message) => {
  const matchedRule = findMatchingResponse(message);
  return matchedRule ? matchedRule.response() : defaultResponse();
};