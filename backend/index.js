const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "Hello world",
  });
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "what is the age of elon mosk";

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    console.log(e);
  }
};

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
  }
});

app.listen(3000, () => {
  console.log("Servering is running successfully");
});
