import { LLMTestCase } from "deepeval/test-case";
import { FaithfulnessMetric, HallucinationMetric } from "deepeval/metrics";
import { it, expect } from "vitest";
import "deepeval/vitest";

it("should evaluate faithfulness and hallucination together", async () => {

    const faithfulness = new FaithfulnessMetric({
        threshold: 0.7
    });

    const hallucination = new HallucinationMetric({
        threshold: 0.7
    });

    const testCase = new LLMTestCase({

        input: "What is the return policy?",

        actualOutput: "Customers can return products within 60 days.",

        context: [
            "Customers can return products within 30 days."
        ],

        retrievalContext: [
            "Customers can return products within 60 days."
        ]
    });

    await expect(testCase).toPass([
        faithfulness,
        hallucination
    ]);
});
