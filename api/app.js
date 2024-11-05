const express = require("express");
const app = express();

// Middleware to parse JSON data from the request body
app.use(express.json());

// Middleware to parse URL-encoded data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Define your POST route to handle the /questions endpoint
app.post("/questions", (req, res) => {
    // Access the posted data in req.body
    const { subject } = req.body;

    if (!subject) {
        return res
            .status(400)
            .json({ error: "Subject is required to create a question" });
    }

    // You could save this data to a database or perform other actions here

    res.status(201).json({
        message: "Question created successfully",
        data: {
            subject,
        },
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
