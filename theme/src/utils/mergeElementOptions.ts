import type { WithThemes } from "../types";

/**
 * Merges default element options with user-provided overrides.
 * Follows the same spread pattern as `mergeContainers` in `engine/core/src/utils/merge.ts`:
 * base values first, then override with later values winning.
 *
 * Both base config properties and per-theme properties are merged independently.
 */
export function mergeElementOptions<T extends object>(
	defaults: WithThemes<T>,
	overrides: WithThemes<T>,
): WithThemes<T> {
	const { themes: defaultThemes, ...defaultConfig } = defaults;
	const { themes: userThemes, ...userConfig } = overrides;

	const mergedConfig = { ...defaultConfig, ...userConfig } as T;

	let mergedThemes: Record<string, T> | undefined;
	if (defaultThemes || userThemes) {
		mergedThemes = {};
		const themeNames = new Set([
			...Object.keys(defaultThemes ?? {}),
			...Object.keys(userThemes ?? {}),
		]);
		for (const name of themeNames) {
			mergedThemes[name] = {
				...defaultThemes?.[name],
				...userThemes?.[name],
			} as T;
		}
	}

	return { ...mergedConfig, themes: mergedThemes } as WithThemes<T>;
}
