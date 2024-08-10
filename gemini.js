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
    "hi i have diabetes.what food should i eat",
    "Can you suggest a low-carb recipe?",
    "What are some healthy snacks for diabetics?",
    "Switching topics: What is the latest news in technology?",
    "Can you recommend a good sci-fi book?"
  ];

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
