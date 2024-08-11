import Groq from "groq-sdk";
import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const apiKey = "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";
// const apiKey = "AIzaSyCuay9sbFC5KmdxKuWNLeVQX7AM_SOOEC4";

const groq = new Groq({ apiKey: apiKey });
// "What should I eat if I have both diabetes and cholesterol?",
//   "For a person with both diabetes and hypertension, what are some recommended foods and foods to avoid? Include any additional notes on managing both conditions.",
//   "What dietary changes are advised for someone dealing with both heart disease and obesity? Provide recommendations for foods to include and avoid, along with any additional notes for managing these conditions together.",
//   "If someone has both celiac disease and kidney disease, what foods should they eat and avoid? Include specific recommendations for both conditions and any additional dietary considerations.",
//   "What should a person with arthritis and anemia include in their diet? List recommended foods, foods to avoid, and any extra notes for managing these conditions.",
//   "Provide dietary recommendations for someone with osteoporosis and GERD. Include foods that should be consumed and avoided, along with additional tips for managing these health issues.",
//   "For someone with high cholesterol and gout, what are the best foods to eat and what should be avoided? Offer additional dietary advice for managing these two conditions simultaneously.",
//   "What dietary recommendations are suggested for someone with IBS and migraines? Include both recommended and avoided foods, along with any additional notes for managing these conditions.",
//   "If a person has COPD and liver disease, what should their diet include and what should they avoid? Provide specific food recommendations and additional notes for managing both conditions.",
//   "What are the dietary recommendations for managing both thyroid disorders and diabetes? List foods to include and avoid, and provide any additional notes for dietary management.",
//   "For someone with hypertension and heart disease, what are the recommended dietary changes? Include foods to eat and avoid, and any additional tips for managing these conditions.",
const prompts = [
    {
      disease: "Diabetes",
      recommended_foods: "Leafy greens, nuts, whole grains, jackfruit (moderate)",
      avoided_foods: "Sugary drinks, white bread, fried foods",
      additional_notes: "Focus on low glycemic index foods.",
    },
    {
      disease: "Cholesterol",
      recommended_foods: "Oily fish, nuts, whole grains",
      avoided_foods: "Saturated fats, trans fats, processed meats",
      additional_notes: "Focus on healthy fats and fiber-rich foods.",
    },
  ];
  
app.post("/", async (req, res) => {
    const data = req.body
    console.log(data);
    try{
        const chatCompletion = await getGroqChatCompletion(data);
        res.json({data : chatCompletion})
    }
    catch(e){
        console.log(e);
    }
});
export async function getGroqChatCompletion(data) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Here are some details about diet based on multiple diseases: ${JSON.stringify(prompts)}. Based on the information provided, generate a dietary plan that includes what to eat and what to avoid if a person has the following diseases: ${data}. The dietary plan should be tailored to manage all mentioned diseases effectively.`,
        },
      ],
      model: "llama3-8b-8192",
    });
}

app.listen("3000",() => {
    console.log("connected");
})
