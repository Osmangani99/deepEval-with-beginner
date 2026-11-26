import OpenAI from "openai";
import dotenv from "dotenv";
import { retrieveContext } from "./retriever";

dotenv.config({ path: ".env.local" });

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function askChatbot(question: string) {

    const retrievalContext = retrieveContext(question);

    const response = await client.responses.create({
        model: "gpt-5.4-mini",

        instructions: `
            You are a customer support chatbot.
            Answer using only the provided company policies.
            If the information is not available,
            say "I don't have that information."
        `,

        input: `
            Company policies:
            ${retrievalContext.join("\n")}

            Customer question:
            ${question}
        `,

        max_output_tokens: 300,
        store: false
    });

    return {
        input: question,
        actualOutput: response.output_text,
        retrievalContext: retrievalContext
    };
}
