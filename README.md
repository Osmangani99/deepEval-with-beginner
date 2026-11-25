# DeepEval with TypeScript | AI Testing Practice

A hands-on learning project for evaluating Large Language Model (LLM) responses using DeepEval, TypeScript and Vitest. This repository explores AI response quality through positive testing, negative testing, threshold experiments and combined metric evaluations.

## Project objectives

- Learn practical AI and LLM evaluation techniques.
- Evaluate correctness, relevancy, faithfulness and hallucination.
- Understand LLM-as-a-Judge and metric thresholds.
- Develop reusable AI testing skills for SDET and AI QA roles.
- Progress toward live RAG, chatbot and AI agent testing.

## Technology stack

| Technology | Purpose |
|---|---|
| TypeScript | Test development |
| DeepEval | LLM evaluation metrics |
| Vitest | Test execution and assertions |
| Node.js / npm | Runtime and dependency management |
| OpenAI API | LLM-based evaluation |

## Project structure

```text
deepEval-with-beginner/
├── tests/
│   ├── correctness/
│   │   ├── basic-correctness.test.ts
│   │   └── geval-correctness.test.ts
│   ├── relevancy/
│   │   ├── answer-relevancy.test.ts
│   │   └── relevancy-correctness.test.ts
│   ├── faithfulness/
│   │   ├── faithfulness.test.ts
│   │   └── multiple-contexts.test.ts
│   ├── hallucination/
│   │   ├── hallucination.test.ts
│   │   ├── hallucination-negative.test.ts
│   │   ├── hallucination-multiple-contexts.test.ts
│   │   └── hallucination-threshold.test.ts
│   └── combined-metrics/
│       └── faithfulness-hallucination.test.ts
├── .env.local          # Local only; never commit
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

The tree shows the known test files; additional local exercises may exist.

## Getting started

### Prerequisites

- Node.js and npm
- An OpenAI API key with API billing configured
- VS Code or another TypeScript editor

### Installation

From the repository root, install the existing dependencies:

```bash
npm ci
```

For a new project without existing dependencies:

```bash
npm install -D deepeval typescript vitest
```

### Environment configuration

Create `.env.local` in the project root:

```dotenv
OPENAI_API_KEY=your_api_key_here
```

Ensure `.gitignore` includes:

```gitignore
node_modules/
.env
.env.*
!.env.example
.deepeval/
coverage/
dist/
```

Never commit API keys. API-based evaluation may incur usage charges.

## Running tests

Run a specific test:

```bash
npx deepeval test run tests/hallucination/hallucination.test.ts
```

Run the combined metrics exercise:

```bash
npx deepeval test run tests/combined-metrics/faithfulness-hallucination.test.ts
```

Check installed versions:

```bash
npm list deepeval vitest typescript
```

Some learning exercises intentionally fail to demonstrate detection of poor AI responses. They are not intended to form an entirely green CI regression suite yet.

## Evaluation metrics

| Metric | Purpose | Key reference field |
|---|---|---|
| GEval | Custom criteria-based evaluation, including correctness | `expectedOutput` when used by the criteria |
| Answer Relevancy | Checks whether the response addresses the question | `input` |
| Faithfulness | Checks whether response claims are grounded in retrieved information | `retrievalContext` |
| Hallucination | Detects contradictions against supplied reference information | `context` |

`actualOutput` contains the response being evaluated. `context` represents supplied reference information, while `retrievalContext` represents information retrieved by the application. Neither is independently guaranteed to be accurate by DeepEval.

## Example: Faithfulness and Hallucination

```typescript
import { LLMTestCase } from "deepeval/test-case";
import { FaithfulnessMetric, HallucinationMetric } from "deepeval/metrics";
import { it, expect } from "vitest";
import "deepeval/vitest";

it("should evaluate faithfulness and hallucination together", async () => {
    const faithfulness = new FaithfulnessMetric({ threshold: 0.7 });
    const hallucination = new HallucinationMetric({ threshold: 0.7 });

    const testCase = new LLMTestCase({
        input: "What is the return policy?",
        actualOutput: "Customers can return products within 60 days.",
        context: ["Customers can return products within 30 days."],
        retrievalContext: ["Customers can return products within 60 days."]
    });

    await expect(testCase).toPass([faithfulness, hallucination]);
});
```

The AI response follows an outdated retrieved policy but contradicts the official policy. Faithfulness passes, Hallucination fails, and the overall assertion fails as expected.

## Observed evaluation results

| Experiment | Score | Threshold | Result |
|---|---:|---:|---|
| Faithfulness: supported response | 1.00 | 0.70 | PASS |
| Faithfulness: contradictory response | 0.00 | 0.70 | FAIL |
| Faithfulness: three of four claims supported | 0.75 | 0.80 | FAIL |
| Hallucination: non-contradictory response | 1.00 | Not confirmed in latest output | PASS |
| Hallucination: direct contradiction | 0.00 | 0.70 | FAIL |
| Hallucination: multiple contexts | 0.75 | 0.70 | PASS |
| Hallucination: stricter threshold | 0.75 | 0.80 | FAIL |
| Combined: Faithfulness | 1.00 | 0.70 | PASS |
| Combined: Hallucination | 0.00 | 0.70 | FAIL |

### Hallucination scoring update

The installed SDK reported a scoring migration: higher scores are now better, and the threshold is the minimum passing score. Older examples may use the opposite direction. For example, an old maximum violation threshold of 0.20 corresponds to a new minimum score of 0.80. Check your installed SDK before interpreting results.

LLM-based scores may vary between runs. These small controlled experiments demonstrate expected behavior, not statistically validated evaluator reliability.

## Learning roadmap

- [x] Basic correctness
- [x] GEval correctness
- [x] Answer relevancy
- [x] Combined relevancy and correctness
- [x] Faithfulness
- [x] Hallucination and threshold selection
- [x] Context vs. retrieval context
- [x] Combined faithfulness and hallucination
- [ ] RAG fundamentals and contextual metrics
- [ ] Live chatbot API integration
- [ ] End-to-end RAG evaluation
- [ ] Multi-turn chatbot testing
- [ ] AI safety and agent testing
- [ ] Reusable framework, reporting and CI/CD

## Current project scope

This is a learning repository using controlled, hardcoded AI responses and reference documents. Live chatbot generation, retrieval integration and CI/CD are planned, not implemented or validated in the exercises documented here.

## Learning resources

- [DeepEval official documentation](https://deepeval.com/docs/introduction)
- [DeepEval tutorials](https://deepeval.com/tutorials/tutorial-introduction)
- [DeepEval GitHub repository](https://github.com/confident-ai/deepeval)
- [Vitest documentation](https://vitest.dev/)
- [TypeScript documentation](https://www.typescriptlang.org/docs/)