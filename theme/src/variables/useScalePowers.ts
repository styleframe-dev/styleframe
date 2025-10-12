import type { CSS, Styleframe, TokenValue, Variable } from "@styleframe/core";
import { defaultScalePowers } from "../constants";

export function useScalePowers<T extends readonly number[]>(
	s: Styleframe,
	scale: Variable,
	powers: T = defaultScalePowers as T,
): Record<number, TokenValue> {
	const results: Record<number, CSS> = {};

	for (const power of powers) {
		const absPower = Math.abs(power);
		const operator = power > 0 ? " * " : " / ";
		const value: TokenValue[] = [];

		// Build the CSS value array directly
		for (let i = 0; i < absPower; i++) {
			if (i > 0) {
				value.push(operator);
			}
			value.push(s.ref(scale));
		}

		if (power === 0) {
			value.push("1");
		}

		results[power] = {
			type: "css",
			value,
		};
	}

	return results as Record<keyof typeof powers, TokenValue>;
}
