
import express from "express";
import { askChatbot } from "./chatbot";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/health", (req, res) => {

    res.json({
        status: "OK",
        message: "AI QA Practice Lab is running"
    });
});

app.post("/chat", async (req, res) => {

    try {

        const { question } = req.body ?? {};

        if (typeof question !== "string" || !question.trim()) {
            return res.status(400).json({
                error: "Question is required"
            });
        }

        const result = await askChatbot(question);

        res.json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(PORT, "127.0.0.1", () => {
    console.log(`AI QA Practice Lab is running on http://localhost:${PORT}`);
});
