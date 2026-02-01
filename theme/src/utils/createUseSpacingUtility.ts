import type {
	ModifierFactory,
	Styleframe,
	TokenValue,
	UtilityCallbackFn,
	UtilityCreatorFn,
	Variable,
} from "@styleframe/core";
import { createMultiplierAutogenerate } from "./createMultiplierAutogenerate";

export interface CreateUseSpacingUtilityOptions<
	Defaults extends Record<string, TokenValue>,
> {
	/** Default values for the utility */
	defaults?: Defaults;
	/** Whether to merge user values with defaults (true) or replace them (false) */
	mergeDefaults?: boolean;
	/**
	 * The base spacing variable name or Variable object.
	 * Defaults to "spacing" which references var(--spacing).
	 */
	baseVariable?: string | Variable;
	/**
	 * Fallback value if the base variable is not defined.
	 * Only used when baseVariable is a string. Defaults to "1rem".
	 */
	fallback?: string;
}

/**
 * Creates a composable function for spacing-based CSS utilities with multiplier support.
 *
 * This is similar to createUseUtility but adds automatic multiplier generation:
 * - @-prefixed numeric values like "@1.5" become: calc(var(--spacing) * 1.5)
 * - Named values and references work as normal
 *
 * @example
 * ```typescript
 * export const useMarginUtility = createUseSpacingUtility(
 *     'margin',
 *     ({ value }) => ({ margin: value })
 * );
 *
 * // Usage:
 * const s = styleframe();
 * const createMargin = useMarginUtility(s, { sm: ref(spacingSm) });
 *
 * // Add multiplier values (with @ prefix):
 * createMargin(["@1.5", "@2", "@-1"]);
 * // Generates:
 * // ._margin:1.5 { margin: calc(var(--spacing) * 1.5); }
 * // ._margin:2 { margin: calc(var(--spacing) * 2); }
 * // ._margin:-1 { margin: calc(var(--spacing) * -1); }
 * ```
 */
export function createUseSpacingUtility<
	UtilityName extends string,
	Defaults extends Record<string, TokenValue> = Record<string, TokenValue>,
>(
	utilityName: UtilityName,
	factory: UtilityCallbackFn,
	options: CreateUseSpacingUtilityOptions<Defaults> = {},
) {
	const {
		defaults,
		mergeDefaults = false,
		baseVariable = "spacing",
		fallback = "1rem",
	} = options;

	return function useSpacingUtility<
		T extends Record<string, TokenValue> = Defaults,
	>(
		s: Styleframe,
		values?: T,
		modifiers?: ModifierFactory[],
	): UtilityCreatorFn {
		// Create autogenerate function with multiplier support
		// Only use fallback when baseVariable is a string (Variable objects are always defined)
		const autogenerate = createMultiplierAutogenerate({
			s,
			baseVariable,
			fallback: typeof baseVariable === "string" ? fallback : undefined,
		});

		// Create the utility with custom autogenerate
		const createUtility = s.utility(utilityName, factory, { autogenerate });

		// Resolve values with optional merge
		const resolvedValues = mergeDefaults
			? { ...defaults, ...values }
			: (values ?? defaults);

		if (resolvedValues && Object.keys(resolvedValues).length > 0) {
			createUtility(resolvedValues as Record<string, TokenValue>, modifiers);
		}

		return createUtility;
	};
}
