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
      {"Disease": "Diabetes", "Recommended_Foods": "Leafy greens, nuts, whole grains, jackfruit (moderate)", "Avoided_Foods": "Sugary drinks, white bread, fried foods", "Additional_Notes": "Focus on low glycemic index foods."},    {"Disease": "Hypertension", "Recommended_Foods": "Leafy greens, berries, oatmeal", "Avoided_Foods": "Salt, processed meats, canned foods", "Additional_Notes": "Reduce sodium intake."},
      {"Disease": "Heart Disease", "Recommended_Foods": "Oily fish, nuts, olive oil, jackfruit", "Avoided_Foods": "Red meat, trans fats, high sodium foods", "Additional_Notes": "Include omega-3 fatty acids. Jackfruit is beneficial."},    {"Disease": "Obesity", "Recommended_Foods": "Vegetables, fruits, lean protein", "Avoided_Foods": "Sugary drinks, fast food, high-calorie snacks", "Additional_Notes": "Emphasize portion control and calorie deficit."},
      {"Disease": "Celiac Disease", "Recommended_Foods": "Gluten-free grains, fruits, vegetables", "Avoided_Foods": "Wheat, barley, rye", "Additional_Notes": "Strictly avoid gluten."},    {"Disease": "Kidney Disease", "Recommended_Foods": "Apples, cabbage, red bell peppers", "Avoided_Foods": "Bananas, oranges, potatoes", "Additional_Notes": "Monitor potassium and phosphorus intake."},
      {"Disease": "Arthritis", "Recommended_Foods": "Fish, nuts, green tea", "Avoided_Foods": "Red meat, refined carbohydrates, sugar", "Additional_Notes": "Include anti-inflammatory foods."},    {"Disease": "Anemia", "Recommended_Foods": "Leafy greens, beans, lean red meat", "Avoided_Foods": "Tea, coffee, dairy (during meals)", "Additional_Notes": "Enhance iron absorption with vitamin C."},
      {"Disease": "Osteoporosis", "Recommended_Foods": "Dairy products, leafy greens, soy products", "Avoided_Foods": "Alcohol, high-sodium foods", "Additional_Notes": "Ensure adequate calcium and vitamin D intake."},    {"Disease": "GERD", "Recommended_Foods": "Oatmeal, ginger, non-citrus fruits", "Avoided_Foods": "Citrus, tomato, spicy foods", "Additional_Notes": "Avoid trigger foods to reduce acid reflux."},
      {"Disease": "High Cholesterol", "Recommended_Foods": "Oily fish, nuts, whole grains", "Avoided_Foods": "Saturated fats, trans fats, processed meats", "Additional_Notes": "Focus on healthy fats and fiber-rich foods."},    {"Disease": "Gout", "Recommended_Foods": "Cherries, low-fat dairy, whole grains", "Avoided_Foods": "Red meat, shellfish, sugary foods", "Additional_Notes": "Limit purine-rich foods to reduce uric acid levels."},
      {"Disease": "IBS", "Recommended_Foods": "Bananas, rice, cooked vegetables", "Avoided_Foods": "Dairy products, high-fat foods, caffeine", "Additional_Notes": "Include soluble fiber and avoid trigger foods."},    {"Disease": "Migraines", "Recommended_Foods": "Almonds, spinach, fatty fish", "Avoided_Foods": "Aged cheese, processed meats, caffeine", "Additional_Notes": "Maintain a balanced diet and avoid common migraine triggers."},
      {"Disease": "Jackfruit", "Recommended_Foods": "Good for heart patients, moderate for diabetes patients", "Avoided_Foods": "Avoid if blood sugar is not well controlled", "Additional_Notes": "High in nutrients and fiber but can affect blood sugar levels."},    {"Disease": "COPD", "Recommended_Foods": "Apples, carrots, lean meats", "Avoided_Foods": "High-sodium foods, sugary snacks", "Additional_Notes": "Focus on foods that support lung health and avoid inflammation."},
      {"Disease": "Liver Disease", "Recommended_Foods": "Leafy greens, berries, lean proteins", "Avoided_Foods": "Alcohol, high-fat foods, processed foods", "Additional_Notes": "Emphasize liver-friendly foods and avoid liver strainers."},    {"Disease": "Thyroid Disorders", "Recommended_Foods": "Seaweed, eggs, nuts, seeds", "Avoided_Foods": "Soy products, cruciferous vegetables in large amounts", "Additional_Notes": "Ensure adequate iodine and avoid foods that may interfere with thyroid function."},
    "What should I eat if I have both diabetes and cholesterol?"
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
