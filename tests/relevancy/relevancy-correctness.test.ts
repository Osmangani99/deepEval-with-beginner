
import { LLMTestCase, SingleTurnParams } from "deepeval/test-case";
import { AnswerRelevancyMetric, GEval } from "deepeval/metrics";
import { it, expect } from "vitest";
import "deepeval/vitest";

it("should evaluate relevancy and correctness", async () => {

  const relevancyMetric = new AnswerRelevancyMetric({
    threshold: 0.7,
  });

  const correctnessMetric = new GEval({
    name: "Correctness",
    criteria: `
      Evaluate whether the actual output
      factually answers the user's question.

      Compare factual meaning, not exact wording.
      Penalize factually incorrect answers.
    `,
    evaluationParams: [
      SingleTurnParams.INPUT,
      SingleTurnParams.ACTUAL_OUTPUT,
      SingleTurnParams.EXPECTED_OUTPUT,
    ],
    threshold: 0.5,
  });

  const testCase = new LLMTestCase({
    input: "What is the capital of France?",
    actualOutput: "London is the capital of France.",
    expectedOutput: "Paris",
  });

  await expect(testCase).toPass([
    relevancyMetric,
    correctnessMetric,
  ]);
});
