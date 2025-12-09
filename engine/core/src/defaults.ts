import type { createRefFunction } from "./tokens";
import { isRef } from "./typeGuards";
import type { Reference, TokenValue } from "./types";

export function transformUtilityKey(
	replacer: (key: string) => string = (v) => v,
) {
	return (value: TokenValue): Record<string, TokenValue> => {
		let resolvedValue = value;
		let resolvedKey: string;

		if (typeof resolvedValue === "string" && resolvedValue[0] === "@") {
			const variableName = resolvedValue.slice(1);

			resolvedKey = replacer(variableName);
			resolvedValue = {
				type: "reference",
				name: variableName,
			} satisfies Reference<string>;
		} else if (isRef(resolvedValue)) {
			resolvedKey = replacer(resolvedValue.name);
		} else {
			resolvedKey = `[${value}]`;
		}

		return {
			[resolvedKey]: resolvedValue,
		};
	};
}
