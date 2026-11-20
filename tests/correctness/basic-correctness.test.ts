// <CodeBlock language="typescript" editable>
import { LLMTestCase, SingleTurnParams } from "deepeval/test-case";
import { GEval } from "deepeval/metrics";
import { it, expect } from "vitest";
import "deepeval/vitest";


it("should evaluate answer correctness", async () => {

// 1. Define our evaluation metric
const correctnessMetric = new GEval({
name: "Correctness",
criteria:
"Determine if the actual output is correct based on the expected output.",
evaluationParams: [
SingleTurnParams.ACTUAL_OUTPUT,
SingleTurnParams.EXPECTED_OUTPUT,
],
threshold: 0.5,
});

// 2. Create a test case
const testCase = new LLMTestCase({
input: "What is the capital of France?",

actualOutput: "The capital of France is Paris.",
expectedOutput: "Paris is the capital of France.",
// expectedOutput: "Paris could be the capital city of France but I am not sure",

});

// 3. Evaluate the test case
await expect(testCase).toPass([correctnessMetric]);

});