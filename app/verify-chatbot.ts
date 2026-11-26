
import { askChatbot } from "./chatbot";

async function main() {

    const result = await askChatbot(
        "How long does a refund take?"
    );

    console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
