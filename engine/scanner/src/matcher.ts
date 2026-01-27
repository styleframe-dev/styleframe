import type {
	ModifierFactory,
	Root,
	Utility,
	UtilityFactory,
} from "@styleframe/core";
import type {
	ParsedUtility,
	UtilityMatch,
	UtilitySelectorOptions,
} from "./types";

/**
 * Match parsed utility classes against registered utilities in the root.
 *
 * @param parsed Array of parsed utility classes
 * @param root The Styleframe root instance
 * @returns Array of match results
 */
export function matchUtilities(
	parsed: ParsedUtility[],
	root: Root,
): UtilityMatch[] {
	// Build lookup maps for efficient matching
	const utilityMap = new Map<string, UtilityFactory>();
	const modifierMap = new Map<string, ModifierFactory>();

	for (const utility of root.utilities) {
		utilityMap.set(utility.name, utility);
	}

	for (const modifier of root.modifiers) {
		for (const key of modifier.key) {
			modifierMap.set(key, modifier);
		}
	}

	const matches: UtilityMatch[] = [];

	for (const parsedClass of parsed) {
		const factory = utilityMap.get(parsedClass.name) ?? null;
		const matchedModifiers: ModifierFactory[] = [];

		// Find matching modifier factories
		for (const modKey of parsedClass.modifiers) {
			const modifier = modifierMap.get(modKey);
			if (modifier) {
				matchedModifiers.push(modifier);
			}
		}

		// Check if the value exists in the factory
		let exists = false;

		if (factory) {
			// Check existing values in the factory
			const existingValue = factory.values.find(
				(v) =>
					v.key === parsedClass.value &&
					v.modifiers.length === parsedClass.modifiers.length &&
					v.modifiers.every((m) => parsedClass.modifiers.includes(m)),
			);

			exists = !!existingValue;
		}

		matches.push({
			parsed: parsedClass,
			factory,
			modifierFactories: matchedModifiers,
			exists,
		});
	}

	return matches;
}

/**
 * Generate the CSS selector for a utility instance.
 *
 * This mirrors the logic from @styleframe/transpiler/defaults.ts
 */
export function generateUtilitySelector(
	options: UtilitySelectorOptions,
): string {
	const { name, value, modifiers } = options;

	const parts = [
		...modifiers,
		name,
		...(value === "default" ? [] : [value]),
	].filter(Boolean);

	return `._${parts.join("\\:").replace(/[[\].#()%,]/g, "\\$&")}`;
}

/**
 * Generate the raw utility class name from options (without CSS escaping).
 */
export function classNameFromUtilityOptions(
	options: UtilitySelectorOptions,
): string {
	const { name, value, modifiers } = options;

	const parts = [
		...modifiers,
		name,
		...(value === "default" ? [] : [value]),
	].filter(Boolean);

	return `_${parts.join(":")}`;
}

/**
 * Create a filter function that checks if a utility is in the used set.
 *
 * @param usedClasses Set of used utility class names
 * @returns Filter function for utilities
 */
export function createUtilityFilter(
	usedClasses: Set<string>,
): (utility: Utility) => boolean {
	return (utility: Utility) => {
		const className = classNameFromUtilityOptions({
			name: utility.name,
			value: utility.value,
			modifiers: utility.modifiers,
		});
		return usedClasses.has(className);
	};
}

/**
 * Filter root children to only include used utilities.
 *
 * @param root The Styleframe root instance
 * @param usedClasses Set of used utility class names
 * @returns Array of used children (utilities are filtered, other types pass through)
 */
export function filterUtilities(
	root: Root,
	usedClasses: Set<string>,
): Root["children"] {
	const filter = createUtilityFilter(usedClasses);

	return root.children.filter((child) => {
		// Non-utility children always pass through
		if (child.type !== "utility") {
			return true;
		}

		return filter(child);
	});
}

/**
 * Get all unique utility class names from matches.
 */
export function getUsedClassNames(matches: UtilityMatch[]): Set<string> {
	const classNames = new Set<string>();

	for (const match of matches) {
		classNames.add(match.parsed.raw);
	}

	return classNames;
}

/**
 * Get matches that have a corresponding utility factory.
 */
export function getValidMatches(matches: UtilityMatch[]): UtilityMatch[] {
	return matches.filter((m) => m.factory !== null);
}

/**
 * Get matches that exist in the registered values.
 */
export function getExistingMatches(matches: UtilityMatch[]): UtilityMatch[] {
	return matches.filter((m) => m.exists);
}

/**
 * Get matches for arbitrary values.
 */
export function getArbitraryMatches(matches: UtilityMatch[]): UtilityMatch[] {
	return matches.filter((m) => m.parsed.isArbitrary);
}
