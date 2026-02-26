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

export function createCssFunction(_parent: Container, _root: Root) {
	const ref = createRefFunction(_parent, _root);

	return function css(
		strings: TemplateStringsArray,
		...interpolations: (TokenValue | Variable | AtRule)[]
	): CSS {
		const value = strings.reduce<TokenValue[]>((acc, str, i) => {
			acc.push(str);

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
