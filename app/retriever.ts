import policies from "./knowledge-base/policies.json";

export function retrieveContext(question: string): string[] {

    const userQuestion = question.toLowerCase();

    const matchedPolicies = policies.filter((policy) => {

        const keywords = policy.topic.toLowerCase().split(" ");

        return keywords.some((keyword) =>
            userQuestion.includes(keyword)
        );
    });

    return matchedPolicies.map((policy) => policy.content);
}
