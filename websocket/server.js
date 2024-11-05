
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log(process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

const generate = async () => {
    const result = await model.generateContent(prompt);
console.log(result.response.text());
}

generate();
