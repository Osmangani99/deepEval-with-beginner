
import { LLMTestCase } from "deepeval/test-case";
import { AnswerRelevancyMetric } from "deepeval/metrics";
import { it, expect } from "vitest";
import "deepeval/vitest";

it("should evaluate answer relevancy", async () => {

  // Step 1: Create our metric
  const metric = new AnswerRelevancyMetric({
    threshold: 0.7,
  });

  // Step 2: Create our test case
  const testCase = new LLMTestCase({
    input: "What is the capital of France?",
    actualOutput: "London is the capital of France.",
  });

  // Step 3: Run the evaluation
  await expect(testCase).toPass([metric]);

});
