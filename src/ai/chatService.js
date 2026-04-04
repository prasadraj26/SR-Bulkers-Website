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

// Helper function for simple text responses
const createTextResponse = (title, content) => {
  return `${title}\n\n${content}`;
};

// Rule-based response system - Enhanced with 30+ rules
const responseRules = [
  // 1. Bulker Range Queries
  {
    keywords: ['bulker', 'bulkers', 'bulker range', 'bulker capacity', 'bulker sizes', 'types of bulker', 'bulker models'],
    response: () => {
      return createTableResponse(
        "🚛 Our Premium Bulker Range:",
        ["Capacity (Cu. Mtr.)", "Application"],
        [
          ["25 - 35 Cu. Mtr.", "Cement, Fly Ash and GGBS - Standard Duty"],
          ["36 - 38 Cu. Mtr.", "Cement, Fly Ash and GGBS - Heavy Duty"],
          ["38 - 40 Cu. Mtr.", "Cement, Fly Ash and GGBS - Industrial Grade"],
          ["40 - 42 Cu. Mtr.", "Cement, Fly Ash and GGBS - High Capacity"],
          ["42 - 45 Cu. Mtr.", "Custom Applications - Bulk Transport"]
        ]
      );
    }
  },
  
  // 2. Bulker Features
  {
    keywords: ['bulker features', 'bulker specifications', 'bulker technical', 'bulker details', 'bulker material'],
    response: () => {
      return createTableResponse(
        "🔧 Bulker Technical Specifications:",
        ["Feature", "Details"],
        [
          ["Material", "High-grade steel with anti-corrosion coating"],
          ["Unloading System", "Pneumatic/Hydraulic with 1.5-2.5 tons/min rate"],
          ["Pressure Rating", "2.0-2.5 Bar working pressure"],
          ["Compressor", "Screw type with 600-1200 CFM capacity"],
          ["Safety Features", "Pressure relief valves, emergency stops, anti-roll bars"],
          ["Warranty", "3 years on structure, 1 year on components"]
        ]
      );
    }
  },
  
  // 3. Specific Bulker Capacity Queries - 25-35
  {
    keywords: ['25-35', '25 to 35', '25 cu', '35 cu', '25 cubic meter', '35 cubic meter'],
    response: () => {
      return createTableResponse(
        "📊 25-35 Cu. Mtr. Bulker Details:",
        ["Specification", "Details"],
        [
          ["Capacity Range", "25 to 35 Cubic Meters"],
          ["Primary Use", "Cement, Fly Ash and GGBS"],
          ["Chassis Type", "Standard Duty"],
          ["Unloading System", "Pneumatic/Hydraulic"],
          ["Typical Application", "Short to Medium Distance Transport"],
          ["Best For", "Small to medium construction projects"],
          ["Price Range", "₹12-18 Lakhs (ex-showroom)"]
        ]
      );
    }
  },
  
  // 4. Specific Bulker Capacity Queries - 36-38
  {
    keywords: ['36-38', '36 to 38', '36 cu', '38 cu', '36 cubic meter', '38 cubic meter'],
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
          ["Special Feature", "Reinforced Construction for Durability"],
          ["Price Range", "₹18-22 Lakhs (ex-showroom)"]
        ]
      );
    }
  },
  
  // 5. Specific Bulker Capacity Queries - 38-40
  {
    keywords: ['38-40', '38 to 40', '38 cu', '40 cu', '38 cubic meter', '40 cubic meter'],
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
          ["Special Feature", "Optimized Aerodynamics for Fuel Efficiency"],
          ["Price Range", "₹22-26 Lakhs (ex-showroom)"]
        ]
      );
    }
  },
  
  // 6. Specific Bulker Capacity Queries - 40-42
  {
    keywords: ['40-42', '40 to 42', '40 cu', '42 cu', '40 cubic meter', '42 cubic meter'],
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
          ["Special Feature", "Maximum Payload Capacity with Stability"],
          ["Price Range", "₹26-30 Lakhs (ex-showroom)"]
        ]
      );
    }
  },
  
  // 7. Specific Bulker Capacity Queries - 42-45
  {
    keywords: ['42-45', '42 to 45', '42 cu', '45 cu', '42 cubic meter', '45 cubic meter'],
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
          ["Special Feature", "Tailor-made Solutions for Specific Requirements"],
          ["Price Range", "Custom quotation required"]
        ]
      );
    }
  },
  
  // 8. Silo Queries
  {
    keywords: ['silo', 'silos', 'storage silo', 'cement silo', 'fly ash silo', 'silo capacity'],
    response: () => {
      return createTableResponse(
        "🏭 Our Industrial Silo Range:",
        ["Type", "Capacity & Features"],
        [
          ["Cement Silo", "50 - 500 Tons with dust collection system"],
          ["Fly Ash Silo", "50 - 500 Tons with aeration system"],
          ["Industrial Storage Silo", "100 - 1000 Tons with level indicators"],
          ["Mobile Silo", "20 - 100 Tons for temporary storage"],
          ["Custom Silos", "As per requirement with tailored specifications"]
        ]
      );
    }
  },
  
  // 9. Silo Features
  {
    keywords: ['silo features', 'silo specifications', 'silo technical', 'silo details', 'silo material'],
    response: () => {
      return createTableResponse(
        "🏗️ Silo Technical Specifications:",
        ["Feature", "Details"],
        [
          ["Construction", "Bolted/Welded design with epoxy coating"],
          ["Material", "High-grade steel with corrosion resistance"],
          ["Aeration System", "Fluidized aeration pads for smooth flow"],
          ["Discharge", "Screw conveyor/pneumatic system"],
          ["Safety", "Pressure relief valves, level sensors, dust filters"],
          ["Foundation", "Reinforced concrete foundation required"],
          ["Warranty", "5 years on structure, 2 years on components"]
        ]
      );
    }
  },
  
  // 10. Cement-related queries
  {
    keywords: ['cement', 'cement handling', 'cement storage', 'cement transport'],
    response: () => {
      return createTableResponse(
        "🏗️ Cement Storage & Transport Solutions:",
        ["Product", "Details"],
        [
          ["Cement Silos", "50-500 tons capacity with corrosion-resistant materials"],
          ["Cement Bulkers", "25-45 Cu. Mtr. for cement transport"],
          ["Unloading Rate", "150-200 tons per hour"],
          ["Moisture Control", "Advanced moisture-proof systems"],
          ["Installation", "On-site assembly and commissioning"],
          ["Maintenance", "Regular maintenance packages available"]
        ]
      );
    }
  },
  
  // 11. Fly Ash queries
  {
    keywords: ['fly ash', 'ash', 'fly ash handling', 'fly ash transport'],
    response: () => {
      return createTableResponse(
        "🌫️ Fly Ash Handling Solutions:",
        ["Product", "Details"],
        [
          ["Fly Ash Silos", "50-500 tons with aeration system"],
          ["Fly Ash Bulkers", "25-45 Cu. Mtr. specialized for fly ash"],
          ["Unloading System", "Fluidized aeration for smooth flow"],
          ["Dust Control", "Advanced dust collection systems"],
          ["Features", "Dust-free operation, moisture protection"],
          ["Application", "Power plants, cement plants, construction"]
        ]
      );
    }
  },
  
  // 12. GGBS queries
  {
    keywords: ['ggbs', 'slag', 'ggbs handling', 'ground granulated blast furnace slag'],
    response: () => {
      return createTableResponse(
        "⚙️ GGBS Handling Solutions:",
        ["Product", "Details"],
        [
          ["GGBS Silos", "50-500 tons with specialized liners"],
          ["GGBS Bulkers", "25-45 Cu. Mtr. abrasion-resistant"],
          ["Unloading System", "Enhanced pneumatic for GGBS"],
          ["Features", "Wear-resistant, moisture-controlled"],
          ["Application", "Concrete manufacturing, construction"],
          ["Special Consideration", "Abrasion-resistant interior coating"]
        ]
      );
    }
  },
  
  // 13. Service queries
  {
    keywords: ['service', 'services', 'maintenance', 'amc', 'repair', 'support'],
    response: () => {
      return createTableResponse(
        "🔧 Our Service Offerings:",
        ["Service Type", "Details"],
        [
          ["Manufacturing", "Custom fabrication as per specifications"],
          ["Installation", "On-site installation and commissioning"],
          ["Preventive Maintenance", "Regular maintenance packages"],
          ["AMC", "Annual Maintenance Contracts with 24/7 support"],
          ["Repairs", "Quick response repair services within 24 hours"],
          ["Spare Parts", "Genuine spare parts availability"],
          ["Training", "Operator training and technical support"]
        ]
      );
    }
  },
  
  // 14. AMC Details
  {
    keywords: ['amc details', 'amc cost', 'annual maintenance contract', 'maintenance contract'],
    response: () => {
      return createTableResponse(
        "📋 Annual Maintenance Contract (AMC) Details:",
        ["Package", "Inclusions & Cost"],
        [
          ["Basic AMC", "Quarterly inspection, emergency support - ₹50,000/year"],
          ["Standard AMC", "Monthly inspection, priority support, spare parts discount - ₹1,00,000/year"],
          ["Premium AMC", "Weekly inspection, 24/7 support, free spare parts - ₹2,00,000/year"],
          ["Custom AMC", "Tailored to specific requirements - Custom pricing"]
        ]
      );
    }
  },
  
  // 15. Spare Parts
  {
    keywords: ['spare parts', 'spares', 'replacement parts', 'components'],
    response: () => {
      return createTableResponse(
        "🔩 Available Spare Parts:",
        ["Part Type", "Availability"],
        [
          ["Compressor Parts", "All models - 24-48 hours delivery"],
          ["Valves & Fittings", "Pneumatic and hydraulic - In stock"],
          ["Aeration System", "Fluidization pads, nozzles - In stock"],
          ["Seals & Gaskets", "All sizes - 24 hours delivery"],
          ["Control Systems", "PLC, sensors, switches - 48-72 hours"],
          ["Structural Parts", "Custom fabrication - 1-2 weeks"]
        ]
      );
    }
  },
  
  // 16. Quote/Price queries
  {
    keywords: ['quote', 'quotation', 'price', 'cost', 'pricing', 'estimate', 'budget'],
    response: () => {
      return createTableResponse(
        "💰 For Quotations:",
        ["Requirement", "Contact Information"],
        [
          ["Product Type", "Please specify (Bulker/Silo/Other)"],
          ["Capacity", "Required capacity in Cu. Mtr. or Tons"],
          ["Material Type", "Cement/Fly Ash/GGBS/Other"],
          ["Delivery Location", "Destination for delivery"],
          ["Timeline", "Expected delivery timeframe"],
          ["Contact Sales", "sales@srbuilders.com or +91-9876543210"],
          ["Contact Service", "service@srbuilders.com or +91-9876543211"]
        ]
      );
    }
  },
  
  // 17. Delivery Information
  {
    keywords: ['delivery', 'shipping', 'transport', 'logistics', 'lead time'],
    response: () => {
      return createTableResponse(
        "🚚 Delivery & Logistics:",
        ["Aspect", "Details"],
        [
          ["Standard Delivery", "15-20 working days after order confirmation"],
          ["Express Delivery", "7-10 working days (additional 15% charge)"],
          ["Installation Time", "3-5 days for bulker, 5-7 days for silo"],
          ["Pan India Coverage", "All major cities and industrial areas"],
          ["Export Services", "Available to neighboring countries"],
          ["Documentation", "Complete invoice, warranty, and manuals included"]
        ]
      );
    }
  },
  
  // 18. Warranty Information
  {
    keywords: ['warranty', 'guarantee', 'after sales', 'aftersales'],
    response: () => {
      return createTableResponse(
        "✅ Warranty Coverage:",
        ["Component", "Warranty Period"],
        [
          ["Structure (Bulker/Silo)", "3-5 years against manufacturing defects"],
          ["Compressor System", "2 years or 2000 operating hours"],
          ["Pneumatic System", "2 years"],
          ["Electrical Components", "1 year"],
          ["Paint & Coating", "3 years against corrosion"],
          ["Extended Warranty", "Available at additional cost"]
        ]
      );
    }
  },
  
  // 19. Technical Support
  {
    keywords: ['technical support', 'help', 'assistance', 'troubleshoot', 'problem'],
    response: () => {
      return createTextResponse(
        "🛠️ Technical Support Available:",
        "Our technical support team is available to assist you with:\n\n" +
        "• Installation guidance\n" +
        "• Operational troubleshooting\n" +
        "• Performance optimization\n" +
        "• Emergency repairs\n\n" +
        "📞 Technical Support: +91-9876543212\n" +
        "📧 Email: techsupport@srbuilders.com\n" +
        "🕒 Available: 24/7 for emergency support"
      );
    }
  },
  
  // 20. Contact information
  {
    keywords: ['contact', 'address', 'phone', 'email', 'location', 'reach', 'office', 'head office'],
    response: () => {
      return createTableResponse(
        "📞 Contact Information:",
        ["Method", "Details"],
        [
          ["📍 Head Office", "SR Builders, Industrial Area, Plot No. 45, Manufacturing Zone, Mumbai - 400001"],
          ["📍 Branch Office", "Delhi NCR, Bangalore, Chennai, Kolkata"],
          ["📞 Sales", "+91-9876543210 (9 AM - 7 PM)"],
          ["📞 Service", "+91-9876543211 (24/7)"],
          ["📞 Technical Support", "+91-9876543212 (24/7)"],
          ["📧 General", "info@srbuilders.com"],
          ["📧 Sales", "sales@srbuilders.com"],
          ["📧 Service", "service@srbuilders.com"],
          ["🕒 Hours", "Monday-Saturday: 9:00 AM - 6:00 PM"]
        ]
      );
    }
  },
  
  // 21. Company Information
  {
    keywords: ['company', 'about', 'background', 'experience', 'established'],
    response: () => {
      return createTableResponse(
        "🏢 About SR Bulkers:",
        ["Aspect", "Details"],
        [
          ["Established", "2005"],
          ["Experience", "19+ years in industrial equipment"],
          ["Clients", "500+ satisfied customers"],
          ["Projects", "1000+ successful installations"],
          ["Team", "100+ skilled professionals"],
          ["Certifications", "ISO 9001:2015 certified"],
          ["Vision", "Leading manufacturer of bulk handling solutions"]
        ]
      );
    }
  },
  
  // 22. Industries Served
  {
    keywords: ['industries', 'sectors', 'applications', 'clients', 'customers'],
    response: () => {
      return createTableResponse(
        "🏭 Industries We Serve:",
        ["Industry", "Applications"],
        [
          ["Cement Manufacturing", "Storage silos, transport bulkers"],
          ["Power Plants", "Fly ash handling systems"],
          ["Construction", "Material storage and transport"],
          ["Steel Industry", "GGBS handling equipment"],
          ["Mining", "Bulk material transport"],
          ["Infrastructure", "Large-scale project support"]
        ]
      );
    }
  },
  
  // 23. Custom Solutions
  {
    keywords: ['custom', 'customized', 'bespoke', 'tailor made', 'special requirement'],
    response: () => {
      return createTableResponse(
        "🎯 Custom Solutions Available:",
        ["Customization Type", "Description"],
        [
          ["Special Capacity", "Non-standard capacities as per requirement"],
          ["Special Materials", "Different grades of steel for specific needs"],
          ["Special Coatings", "Food-grade, chemical-resistant coatings"],
          ["Automation", "Fully automated systems with PLC control"],
          ["Special Applications", "Unique material handling requirements"],
          ["Process", "Consultation → Design → Approval → Manufacturing"]
        ]
      );
    }
  },
  
  // 24. Payment Terms
  {
    keywords: ['payment', 'payment terms', 'payment options', 'finance', 'emi'],
    response: () => {
      return createTableResponse(
        "💳 Payment Terms:",
        ["Term", "Details"],
        [
          ["Advance Payment", "30% with purchase order"],
          ["During Manufacturing", "40% before dispatch"],
          ["Balance", "30% before installation"],
          ["Bank Finance", "Available through partner banks"],
          ["EMI Options", "Available for eligible customers"],
          ["Tax", "GST 18% extra as applicable"],
          ["Mode", "NEFT/RTGS/Cheque/Demand Draft"]
        ]
      );
    }
  },
  
  
  // 25. Export Information
  {
    keywords: ['export', 'international', 'overseas', 'foreign', 'country'],
    response: () => {
      return createTableResponse(
        "🌍 Export Services:",
        ["Aspect", "Details"],
        [
          ["Countries Served", "Nepal, Bangladesh, Sri Lanka, UAE, Kenya"],
          ["Export Documentation", "Complete export documentation support"],
          ["Shipping", "FOB/CIF terms available"],
          ["Payment", "Letter of Credit (LC) accepted"],
          ["Compliance", "International quality standards"],
          ["Lead Time", "30-45 days for export orders"]
        ]
      );
    }
  },
  
  // 26. Training Programs
  {
    keywords: ['training', 'operator training', 'training program', 'learn'],
    response: () => {
      return createTableResponse(
        "🎓 Training Programs:",
        ["Program", "Details"],
        [
          ["Operator Training", "2-day hands-on training at your site"],
          ["Maintenance Training", "3-day technical training program"],
          ["Safety Training", "1-day safety and compliance training"],
          ["Online Training", "Remote training via video conference"],
          ["Cost", "Included with new equipment purchase"],
          ["Certification", "Certificate of completion provided"]
        ]
      );
    }
  },
  
  // 27. Safety Features
  {
    keywords: ['safety', 'safe', 'security', 'protection', 'hazard'],
    response: () => {
      return createTableResponse(
        "⚠️ Safety Features:",
        ["Safety Feature", "Description"],
        [
          ["Pressure Relief Valves", "Automatic pressure release"],
          ["Emergency Stops", "Multiple emergency stop points"],
          ["Anti-Roll Bars", "Enhanced vehicle stability"],
          ["Dust Collection", "Environmentally friendly operation"],
          ["Safety Training", "Comprehensive safety protocols"],
          ["Compliance", "All applicable safety standards met"]
        ]
      );
    }
  },
  
  // 28. Environmental Compliance
  {
    keywords: ['environment', 'eco-friendly', 'green', 'pollution', 'emission'],
    response: () => {
      return createTableResponse(
        "🌱 Environmental Compliance:",
        ["Aspect", "Details"],
        [
          ["Dust Control", "Advanced dust collection systems"],
          ["Noise Reduction", "Sound-proofed compressors"],
          ["Energy Efficiency", "Optimized for fuel efficiency"],
          ["Emissions", "Compliant with BS6/EPA standards"],
          ["Waste Management", "Proper waste disposal protocols"],
          ["Certifications", "ISO 14001 Environmental Management"]
        ]
      );
    }
  },
  
  // 29. Comparison Help
  {
    keywords: ['compare', 'difference', 'which one', 'best for', 'recommend'],
    response: () => {
      return createTextResponse(
        "🔍 Need Help Choosing?",
        "To recommend the best product for your needs, please provide:\n\n" +
        "1. Material to be handled (Cement/Fly Ash/GGBS/Other)\n" +
        "2. Daily/Weekly volume requirement\n" +
        "3. Transport distance (for bulkers)\n" +
        "4. Storage duration (for silos)\n" +
        "5. Budget range\n\n" +
        "I'll help you find the most suitable solution based on these parameters."
      );
    }
  },
  
  // 30. Brochure/Catalog
  {
    keywords: ['brochure', 'catalog', 'product catalog', 'pdf', 'download'],
    response: () => {
      return createTextResponse(
        "📚 Product Catalog Available:",
        "Our comprehensive product catalog includes:\n\n" +
        "• Complete product specifications\n" +
        "• Technical drawings\n" +
        "• Application case studies\n" +
        "• Installation references\n\n" +
        "Please provide your email address to receive the digital catalog, or visit our website to download it directly."
      );
    }
  },
  
  // 31. Site Visit/Inspection
  {
    keywords: ['site visit', 'inspection', 'visit', 'demonstration', 'demo'],
    response: () => {
      return createTextResponse(
        "🏗️ Site Visit & Demo Available:",
        "We offer:\n\n" +
        "• Free site inspection and consultation\n" +
        "• Live demonstration of equipment\n" +
        "• Visit to our manufacturing facility\n" +
        "• Reference site visits\n\n" +
        "To schedule a visit, please contact:\n" +
        "📞 +91-9876543210\n" +
        "📧 sales@srbuilders.com"
      );
    }
  },
  
  // 32. After Hours/Emergency
  {
    keywords: ['emergency', 'urgent', 'after hours', '24/7', 'night', 'weekend'],
    response: () => {
      return createTextResponse(
        "🚨 Emergency Support:",
        "For emergency support outside business hours:\n\n" +
        "📞 Emergency Hotline: +91-9876543213\n" +
        "📧 emergency@srbuilders.com\n\n" +
        "Our emergency team is available 24/7 for:\n" +
        "• Equipment breakdowns\n" +
        "• Safety incidents\n" +
        "• Critical spare parts\n" +
        "• On-site emergencies\n\n" +
        "Average response time: 2-4 hours"
      );
    }
  },
  
  // 33. Basic greetings
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'namaste', 'yo', 'hola'],
    response: () => {
      const responses = [
        "👋 Hi there! Welcome to SR Bulkers. How can I assist you today?",
        "😊 Hello! Need help with bulkers, silos, or pricing?",
        "🚛 Hey! I'm here to help with all your industrial equipment needs.",
        "🙏 Namaste! How can I help you today?",
        "✨ Welcome! Ask me anything about our products or services."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  },
  
  // 34. Website information
  {
    keywords: ['website', 'site', 'web', 'link', 'url', 'official site'],
    response: () => {
      return createTextResponse(
        "🌐 Our Website:",
        "Visit our official website for complete details:\n\n" +
        "👉 https://sr-bulkers.vercel.app\n\n" +
        "You can explore products, gallery, and contact us directly."
      );
    }
  },
  
  // 35. Location information
  {
    keywords: ['location', 'where are you', 'office location', 'map', 'where is your company'],
    response: () => {
      return createTextResponse(
        "📍 Our Locations:",
        "🏢 Mettur,navapatti,Salem\n" +
        "We serve customers across India and internationally."
      );
    }
  },
  
  // 36. Contact information
  {
    keywords: ['contact', 'call', 'phone number', 'email id', 'reach you'],
    response: () => {
      return createTextResponse(
        "📞 Contact Us:",
        "📱 Sales: +91-9876543210\n" +
        "🛠 Service: +91-9876543211\n" +
        "📧 Email: info@srbuilders.com\n\n" +
        "We're available Monday to Saturday (9 AM – 6 PM)."
      );
    }
  }
];

// Default fallback response with enhanced options
const defaultResponse = () => {
  return "😔 Sorry, I cannot help with that.\n\n" +
         "🤖 Here are some quick questions you can ask me:\n\n" +
         "🚛 **Bulker Questions:**\n" +
         "• 'bulker range' or 'bulker sizes'\n" +
         "• 'bulker features' or 'bulker specifications'\n" +
         "• '25-35 capacity' or '36-38 capacity'\n\n" +
         "🏭 **Silo Questions:**\n" +
         "• 'silo types' or 'silo capacity'\n" +
         "• 'silo features' or 'silo specifications'\n\n" +
         "📦 **Material Handling:**\n" +
         "• 'cement handling' or 'fly ash transport'\n" +
         "• 'GGBS handling'\n\n" +
         "🔧 **Services:**\n" +
         "• 'maintenance' or 'AMC details'\n" +
         "• 'spare parts' or 'technical support'\n\n" +
         "💰 **Pricing & Quotes:**\n" +
         "• 'get quote' or 'pricing'\n" +
         "• 'delivery' or 'warranty'\n\n" +
         "📞 **Contact & Company:**\n" +
         "• 'contact details' or 'location'\n" +
         "• 'about company' or 'website'\n\n" +
         "Just type any of these questions! 😊";
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
  
  // General keyword matching with priority scoring
  let bestMatch = null;
  let maxScore = 0;
  
  for (const rule of responseRules) {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (lowerMessage.includes(keyword)) {
        // Give higher score for longer keywords (more specific)
        score += keyword.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = rule;
    }
  }
  
  // Only return match if score is significant (at least 2 characters matched)
  if (bestMatch && maxScore >= 2) {
    return bestMatch;
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