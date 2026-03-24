import type { ModifierFactory, Styleframe } from "@styleframe/core";

export interface DirectionalModifiers {
	rtl: ModifierFactory;
	ltr: ModifierFactory;
}

export function useRtlModifier(s: Styleframe): ModifierFactory {
	return s.modifier("rtl", ({ declarations, variables, children }) => ({
		'&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)': {
			declarations,
			variables,
			children,
		},
	}));
}

export function useLtrModifier(s: Styleframe): ModifierFactory {
	return s.modifier("ltr", ({ declarations, variables, children }) => ({
		'&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)': {
			declarations,
			variables,
			children,
		},
	}));
}

/**
 * Register directional modifiers for RTL/LTR layout targeting.
 *
 * Uses `:where()` to keep specificity at 0, preventing specificity conflicts.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const { rtl, ltr } = useDirectionalModifiers(s);
 *
 * const createMarginLeft = utility("margin-left", ({ value }) => ({ marginLeft: value }));
 * createMarginLeft({ sm: "0.5rem" }, [rtl]);
 * ```
 */
export function useDirectionalModifiers(s: Styleframe): DirectionalModifiers {
	return {
		rtl: useRtlModifier(s),
		ltr: useLtrModifier(s),
	};
}
