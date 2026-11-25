import { LLMTestCase, SingleTurnParams } from "deepeval/test-case";
import { GEval } from "deepeval/metrics";
import { it, expect } from "vitest";
import "deepeval/vitest";

const testData = [
  {
    input: "What is the capital of France?",
    actualOutput: "Paris",
    expectedOutput: "Paris",
  },
  {
    input: "What is the capital of France?",
    actualOutput: "London",
    expectedOutput: "Paris",
  },
  {
    input: "What is the capital of France?",
    actualOutput: "Paris is the capital city of France.",
    expectedOutput: "Paris",
  },
];

for (const [index, data] of testData.entries()) {
  it(`should evaluate AI response ${index + 1}`, async () => {
    const metric = new GEval({
      name: "Correctness",
      criteria: `
    Evaluate whether the actual output correctly
    answers the user's question.

    Rules:
    1. Compare factual meaning, not exact wording.
    2. Accept different wording when the meaning is correct.
    3. Do not penalize additional information if it
       is factually correct and relevant.
    4. Penalize incorrect or contradictory information.
    5. Use the user's question and expected output
       to determine correctness.
  `,
      evaluationParams: [
        SingleTurnParams.INPUT,
        SingleTurnParams.ACTUAL_OUTPUT,
        SingleTurnParams.EXPECTED_OUTPUT,
      ],
      threshold: 0.5,
    });

    const testCase = new LLMTestCase(data);

    await expect(testCase).toPass([metric]);
  });
}
