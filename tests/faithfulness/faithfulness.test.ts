import { LLMTestCase } from "deepeval/test-case";
import { FaithfulnessMetric } from "deepeval/metrics";
import { it, expect } from "vitest";
import "deepeval/vitest";

it("should evaluate AI response faithfulness", async () => {

    const metric = new FaithfulnessMetric({
        threshold: 0.7
    });

    const testCase = new LLMTestCase({
        input: "What is the return policy?",

        //actualOutput: "Customers can return products within 30 days.",
        actualOutput: "Customers can return products within 60 days.",

        retrievalContext: [
            "Customers can return products within 30 days."
        ]
    });

    await expect(testCase).toPass([metric]);
});
