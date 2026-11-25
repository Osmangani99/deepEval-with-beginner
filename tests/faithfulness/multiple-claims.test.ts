import { LLMTestCase } from "deepeval/test-case";
import { FaithfulnessMetric } from "deepeval/metrics";
import { it, expect } from "vitest";
import "deepeval/vitest";

it("should evaluate AI response faithfulness", async () => {

    const metric = new FaithfulnessMetric({
        threshold: 0.7
    });

const testCase = new LLMTestCase({
    input: "What is the company's return and refund policy?",

    actualOutput: 
       `Customers can return products within 30 days.
        A purchase receipt is required.
        Refunds are processed within 10 days.`,

    retrievalContext: [
        "Customers can return products within 30 days.",
        "A purchase receipt is required.",
        "Refunds are processed within 5 days."
    ]
});
    await expect(testCase).toPass([metric]);
});
