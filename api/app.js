require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const express = require("express");
const app = express();

// Middleware to parse JSON data from the request body
app.use(express.json());

// Middleware to parse URL-encoded data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Define your POST route to handle the /questions endpoint
app.post("/questions", async (req, res) => {
    // Access the posted data in req.body
    const { subject } = req.body;

    if (!subject) {
        return res
            .status(400)
            .json({ error: "Subject is required to create a question" });
    }

    // Requesting the trivia questions in the desired JSON format
    const prompt = `Give me 10 trivia questions in strictly/only the following JSON format: "[ { "question": "Who was the first President of the United States?", "options": [ "George Washington", "Thomas Jefferson", "John Adams", "Benjamin Franklin" ], "correct": "George Washington" }, { "question": "What is the capital of France?", "options": ["London", "Paris", "Berlin", "Madrid"], "correct": "Paris" }, { "question": "What is the largest ocean on Earth?", "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], "correct": "Pacific Ocean" } ]". Please keep this format and ONLY return the JSON data; no other confirmation text or anything else. The trivia questions should be about the following topic: "${subject}"`;

    const result = await model.generateContent(prompt);

    // Assuming result.response.text() returns the JSON string, you can parse it directly.
    try {
        const jsonResponse = JSON.parse(result.response.text());
        return res.status(200).json(jsonResponse);
    } catch (error) {
        return res.status(500).json({ error: "Failed to parse response as JSON" });
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
