const express = require("express");
const { GoogleGenAI } = require('@google/genai');
const dotenv = require("dotenv");



dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", "./views");




const ai = new GoogleGenAI({
    apikey: process.env.GEMINI_API_KEY
})

app.get("/", (req, res) => {
    res.render("home", { reply: null })
});

app.post("/ai", async (req, res) => {

    try {
        const prompt = req.body.prompt;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await ai.models.generateContent({


            model: "gemini-flash-lite-latest",
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 200,
                temperature: 0.3
            }

        });
        res.json({
            success: true,
            reply: response.text,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: "AI request failed"
        });
    }




});


const PORT = process.env.PORT || 8000;





app.listen(PORT, () => {
    console.log(`server Started At PORT  ${PORT}`);
})