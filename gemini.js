const { GoogleGenerativeAI } = require('@google/generative-ai'); // Ensure this is the correct library and version

// Replace with your API key securely (not hardcoded in production code)
const apiKey = 'AIzaSyCuay9sbFC5KmdxKuWNLeVQX7AM_SOOEC4'; // Securely load API key from environment variables or a secure vault

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.0-pro',
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
  responseMimeType: 'text/plain',
};

async function run() {
  const prompts = [
    {
      "disease": "Diabetes",
      "recommended_foods": "Leafy greens, nuts, whole grains, jackfruit (moderate)",
      "avoided_foods": "Sugary drinks, white bread, fried foods",
      "additional_notes": "Focus on low glycemic index foods."
    },
    {
      "disease": "Cholesterol",
      "recommended_foods": "Oily fish, nuts, whole grains",
      "avoided_foods": "Saturated fats, trans fats, processed meats",
      "additional_notes": "Focus on healthy fats and fiber-rich foods."
    },
    "What should I eat if I have both diabetes and cholesterol?",  "For a person with both diabetes and hypertension, what are some recommended foods and foods to avoid? Include any additional notes on managing both conditions.",
    "What dietary changes are advised for someone dealing with both heart disease and obesity? Provide recommendations for foods to include and avoid, along with any additional notes for managing these conditions together.",
    "If someone has both celiac disease and kidney disease, what foods should they eat and avoid? Include specific recommendations for both conditions and any additional dietary considerations.",
    "What should a person with arthritis and anemia include in their diet? List recommended foods, foods to avoid, and any extra notes for managing these conditions.",
    "Provide dietary recommendations for someone with osteoporosis and GERD. Include foods that should be consumed and avoided, along with additional tips for managing these health issues.",
    "For someone with high cholesterol and gout, what are the best foods to eat and what should be avoided? Offer additional dietary advice for managing these two conditions simultaneously.",
    "What dietary recommendations are suggested for someone with IBS and migraines? Include both recommended and avoided foods, along with any additional notes for managing these conditions.",
    "If a person has COPD and liver disease, what should their diet include and what should they avoid? Provide specific food recommendations and additional notes for managing both conditions.",
    "What are the dietary recommendations for managing both thyroid disorders and diabetes? List foods to include and avoid, and provide any additional notes for dietary management.",
    "For someone with hypertension and heart disease, what are the recommended dietary changes? Include foods to eat and avoid, and any additional tips for managing these conditions."
  ];
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
  
    try {
      const result = await chatSession.sendMessage({
        prompt: `Here are some dietary recommendations based on specific diseases:
          Diabetes: Recommended Foods - ${prompts[0].recommended_foods}; Avoided Foods - ${prompts[0].avoided_foods}. Additional Notes - ${prompts[0].additional_notes}.
          Cholesterol: Recommended Foods - ${prompts[1].recommended_foods}; Avoided Foods - ${prompts[1].avoided_foods}. Additional Notes - ${prompts[1].additional_notes}.
          ${prompts[2]}`
      });
      console.log(`Response: ${result.response.text()}`);
    } catch (error) {
      console.error(`Error:`, error);
    }
  }
  
  run();
  


  // Process prompts sequentially
  for (const prompt of prompts) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    try {
      const result = await chatSession.sendMessage(prompt);
      console.log(`Prompt: ${prompt}`);
      console.log(`Response: ${result.response.text()}`);
    } catch (error) {
      console.error(`Error with prompt "${prompt}":`, error);
    }
  }
}

run();
