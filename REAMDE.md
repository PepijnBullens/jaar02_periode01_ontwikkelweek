# TrivAI
### Groepsleden
- Pepijn Bullens
- Noah Kamphuisen

## Logboek

#### Onverwachte uitdagingen (Geschreven door Noah)

Pepijn had een Node.js versie die 1 minor versie te outdated was voor de huidige versie van Next.js. Om het op te lossen hebben we node version manager geinstalleerd en wat policies aangepast. 

Verder had Pepijn nog nooit met Next.js gewerkt en had hij minimale ervaring met Node.js. Ik ben snel even het project doorgegaan en heb laten zien waar je wat aan kan passen. 

Tot slot hadden we wat moeite met het sturen van de JSON data (uit de Gemini API) naar de client. De query uit de API response returnde namelijk een JavaScript object (zonder bijvoorbeeld dubbele quotes rond de properties), in plaats van een plain JSON object.

### Wat je hebt geleerd over AI tijdens het proces (Geschreven door Pepijn)

Tijdens het proces heb ik geleerd dat AI krachtige tools biedt voor het automatiseren van taken en het verbeteren van efficiëntie. We hebben ook ontdekt hoe belangrijk het is om de gevaren van AI in overweging te nemen, zoals de mogelijkheid dat AI banen van programmeurs kan overnemen en de ethische implicaties die daarmee gepaard gaan. Het is cruciaal om een balans te vinden tussen het benutten van de voordelen van AI en het waarborgen van werkgelegenheid en verantwoordelijk gebruik.

### Belangrijke momenten waarop je belangrijke creatieve beslissingen hebt genomen (Geschreven door Pepijn)

Tijdens het project hebben we enkele belangrijke creatieve beslissingen genomen. We besloten om Next.js in combinatie met Node.js te gebruiken vanwege de krachtige functionaliteiten en de goede ondersteuning voor server-side rendering. Aanvankelijk overwegen we om met websockets te werken voor real-time communicatie, maar na zorgvuldige overweging hebben we besloten dit niet te doen. We kwamen tot de conclusie dat het huidige project geen onmiddellijke noodzaak voor real-time functionaliteit had, wat ons in staat stelde om onze focus en middelen efficiënter te gebruiken.

### Prompt die je hebt gebruikt en binnen welke AI-tool je die hebt gebruikt (Geschreven door Pepijn en Noah)

---

main prompt for calling Gemini AI containing the trivia question topic

```
Give me 10 trivia questions in strictly/only the following JSON format: "[
    {
        "question": "Who was the first President of the United States?",
        "options": [
            "George Washington",
            "Thomas Jefferson",
            "John Adams",
            "Benjamin Franklin"
        ],
        "correct": "George Washington"
    },
    {
        "question": "What is the capital of France?",
        "options": ["London", "Paris", "Berlin", "Madrid"],
        "correct": "Paris"
    },
    {
        "question": "What is the largest ocean on Earth?",
        "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        "correct": "Pacific Ocean"
    }
]
". Please keep this format and ONLY return the JSON data; no other confirmation text or anything else. The trivia questions should be about the following topic: "watermelons"
```

---

prompts while coding (Pepijn)

#### asking to explain some of the code Noah made

```
explain this: "use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";
import { useRouter } from "next/navigation"; // If using Next.js
import Link from "next/link";

export function SubjectForm() {
    // State for input field
    const [inputValue, setInputValue] = React.useState("");

    const router = useRouter(); // Router for navigation

    // Handle form submission to redirect
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to /<inputValue>
        if (inputValue) {
            router.push(/${inputValue});
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Enter a Path to Redirect</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col space-y-4"
                    >
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="input-url">
                                Enter Path (e.g., 'questions')
                            </Label>
                            <input
                                id="input-url"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter path here"
                            />
                        </div>
                        <CardFooter className="flex justify-center">
                            {/* Styled Link to look like a button */}
                            <Link
                                href={inputValue ? /${inputValue} : "#"}
                                
                                className="inline-block px-6 py-2 mt-4 text-center text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-gray-500"
                            >
                                Go to the quiz
                            </Link>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
```

---

#### asking for the data to be returned as JSON

```
this returns the data as text. can i return it as json?: require("dotenv").config();

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

    const result = await model.generateContent(Give me 10 trivia questions in strictly/only the following JSON format: "[ { "question": "Who was the first President of the United States?", "options": [ "George Washington", "Thomas Jefferson", "John Adams", "Benjamin Franklin" ], "correct": "George Washington" }, { "question": "What is the capital of France?", "options": ["London", "Paris", "Berlin", "Madrid"], "correct": "Paris" }, { "question": "What is the largest ocean on Earth?", "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], "correct": "Pacific Ocean" } ]". Please keep this format and ONLY return the JSON data; no other confirmation text or anything else. The trivia questions should be about the following topic: "${subject}");

    res.status(200).json({
        data: {
            result: result.response.text(),
        },
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
```
---

#### asking for the prompt to be formatted on one line

```
make this all one line: Give me 10 trivia questions in strictly/only the following JSON format: "[

    {

      question: "Who was the first President of the United States?",

      options: [

        "George Washington",

        "Thomas Jefferson",

        "John Adams",

        "Benjamin Franklin",

      ],

      correct: "George Washington",

    },

    {

      question: "What is the capital of France?",

      options: ["London", "Paris", "Berlin", "Madrid"],

      correct: "Paris",

    },

    {

      question: "What is the largest ocean on Earth?",

      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],

      correct: "Pacific Ocean",

   }]". Please keep this format and ONLY return the JSON data; no other confirmation text or anything else. The trivia questions should be about the following topic: "watermelons"
```