import type {
	AtRule,
	Container,
	CSS,
	Root,
	TokenValue,
	Variable,
} from "../types";
import { isAtRule, isVariable } from "../typeGuards";
import { createRefFunction } from "./ref";

const AT_VARIABLE_REGEX = /@([\w.-]+)/g;

function parseAtReferences(
	str: string,
	ref: ReturnType<typeof createRefFunction>,
): TokenValue[] {
	const parts: TokenValue[] = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	AT_VARIABLE_REGEX.lastIndex = 0;
	while ((match = AT_VARIABLE_REGEX.exec(str)) !== null) {
		parts.push(str.slice(lastIndex, match.index));
		parts.push(ref(match[1] as string));
		lastIndex = AT_VARIABLE_REGEX.lastIndex;
	}
	parts.push(str.slice(lastIndex));

	return parts;
}

export function createCssFunction(_parent: Container, _root: Root) {
	const ref = createRefFunction(_parent, _root);

	return function css(
		strings: TemplateStringsArray,
		...interpolations: (TokenValue | Variable | AtRule)[]
	): CSS {
		const value = strings.reduce<TokenValue[]>((acc, str, i) => {
			acc.push(...parseAtReferences(str, ref));

			if (i < interpolations.length) {
				const interpolation = interpolations[i];

				if (isVariable(interpolation)) {
					acc.push(ref(interpolation));
				} else if (isAtRule(interpolation)) {
					acc.push(interpolation.rule);
				} else {
					acc.push(interpolation);
				}
			}

			return acc;
		}, []);

		return {
			type: "css",
			value,
		};
	};
}
