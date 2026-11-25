import { LLMTestCase } from "deepeval/test-case";
import { HallucinationMetric } from "deepeval/metrics";
import { it, expect } from "vitest";
import "deepeval/vitest";

it("should evaluate hallucination against multiple contexts", async () => {

    const metric = new HallucinationMetric({
        threshold: 0.8
    });

    const testCase = new LLMTestCase({

        input: "What are your return, refund, shipping and support policies?",

        actualOutput: `
            Customers can return products within 30 days.
            Refunds are processed within 5 days.
            Free shipping is available on orders over $100.
            Customer support is available Monday through Friday.
        `,

        context: [
            "Customers can return products within 30 days.",
            "Refunds are processed within 5 days.",
            "Free shipping is available on orders over $50.",
            "Customer support is available Monday through Friday."
        ]
    });

    await expect(testCase).toPass([metric]);
});
