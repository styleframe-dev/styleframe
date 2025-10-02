import { genAtRuleQuery } from "./genAtRuleQuery";

export function genInlineAtRule(identifier: string, rule: string) {
	return `${genAtRuleQuery(identifier, rule)};`;
}
