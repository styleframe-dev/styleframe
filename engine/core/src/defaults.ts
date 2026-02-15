import type { createRefFunction } from "./tokens";
import { isRef } from "./typeGuards";
import type { Reference, TokenValue } from "./types";

export interface TransformUtilityKeyOptions {
	/** Transforms the key used in the utility class name */
	replacer?: (key: string) => string;
	/** Namespace prepended to the reference name (e.g., "spacing" makes "@sm" resolve to ref("spacing.sm")) */
	namespace?: string;
}

export function transformUtilityKey(
	replacerOrOptions?: ((key: string) => string) | TransformUtilityKeyOptions,
) {
	const options: TransformUtilityKeyOptions =
		typeof replacerOrOptions === "function"
			? { replacer: replacerOrOptions }
			: (replacerOrOptions ?? {});

	const { replacer = (v) => v, namespace } = options;

	return (value: TokenValue): Record<string, TokenValue> => {
		let resolvedValue = value;
		let resolvedKey: string;

		if (typeof resolvedValue === "string" && resolvedValue[0] === "@") {
			const variableName = resolvedValue.slice(1);
			const referenceName = namespace
				? `${namespace}.${variableName}`
				: variableName;

			resolvedKey = replacer(variableName);
			resolvedValue = {
				type: "reference",
				name: referenceName,
			} satisfies Reference<string>;
		} else if (isRef(resolvedValue)) {
			let keyName = resolvedValue.name;
			if (namespace && keyName.startsWith(`${namespace}.`)) {
				keyName = keyName.slice(namespace.length + 1);
			}
			resolvedKey = replacer(keyName);
		} else {
			resolvedKey = `[${value}]`;
		}

		return {
			[resolvedKey]: resolvedValue,
		};
	};
}
