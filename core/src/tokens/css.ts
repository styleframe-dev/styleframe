import type { Container, CSS, Root, TokenValue } from "../types";

export function createCssFunction(_parent: Container, _root: Root) {
	return function css(
		strings: TemplateStringsArray,
		...interpolations: TokenValue[]
	): CSS {
		const value = strings.reduce<TokenValue[]>((acc, str, i) => {
			acc.push(str);

			if (i < interpolations.length) {
				acc.push(interpolations[i]);
			}

			return acc;
		}, []);

		return {
			type: "css",
			value,
		};
	};
}
