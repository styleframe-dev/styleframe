import type {
	CSS,
	Reference,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";
import { isRef } from "@styleframe/core";

export const defaultScalePowerValues: readonly number[] = [
	-2, -1, 0, 1, 2, 3, 4, 5,
] as const;

export function useScalePowers<T extends readonly number[]>(
	s: Styleframe,
	scale: Variable | Reference,
	powers: T = defaultScalePowerValues as T,
): Record<number, TokenValue> {
	const results: Record<number, CSS> = {};

	for (const power of powers) {
		const absPower = Math.abs(power);
		const operator = power > 0 ? " * " : " / ";
		const value: TokenValue[] = [];

		if (power <= 0) {
			value.push("1");
		}

		// Build the CSS value array directly
		for (let i = 0; i < absPower; i++) {
			if (i > 0 || power < 0) {
				value.push(operator);
			}
			value.push(isRef(scale) ? scale : s.ref(scale));
		}

		results[power] = {
			type: "css",
			value,
		};
	}

	return results as Record<keyof typeof powers, TokenValue>;
}
