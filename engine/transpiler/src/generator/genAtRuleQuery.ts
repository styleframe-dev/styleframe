export function genAtRuleQuery(identifier: string, rule: string) {
	return `@${identifier} ${rule}`;
}
