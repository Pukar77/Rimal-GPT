require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS configuration to allow all origins
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers for requests
    credentials: true, // Allow cookies or session data
  })
);

// Route to test server is working
app.get("/", (req, res) => {
  return res.json({
    message: "Hello world",
  });
});

// Set up Google Generative AI model using API key from .env
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content based on a prompt
const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    console.log(e);
  }
};

// Endpoint to generate content based on the provided prompt
app.post("/api/content", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.json({
      message: "Some prompt must be entered",
    });
  }

  try {
    const generated_text = await generate(prompt);
    return res.json({
      generated_text,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Failed to generate content",
    });
  }
});

// Start the server on port 3002
app.listen(3000, () => {
  console.log("Server is running successfully on port 3000");
});
