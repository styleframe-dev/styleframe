import type { ModifierFactory, Styleframe } from "@styleframe/core";

export interface PseudoStateModifiers {
	hover: ModifierFactory;
	focus: ModifierFactory;
	focusWithin: ModifierFactory;
	focusVisible: ModifierFactory;
	active: ModifierFactory;
	visited: ModifierFactory;
	target: ModifierFactory;
}

export function useHoverModifier(s: Styleframe): ModifierFactory {
	return s.modifier("hover", ({ declarations }) => ({
		"&:hover": declarations,
	}));
}

export function useFocusModifier(s: Styleframe): ModifierFactory {
	return s.modifier("focus", ({ declarations }) => ({
		"&:focus": declarations,
	}));
}

export function useFocusWithinModifier(s: Styleframe): ModifierFactory {
	return s.modifier("focus-within", ({ declarations }) => ({
		"&:focus-within": declarations,
	}));
}

export function useFocusVisibleModifier(s: Styleframe): ModifierFactory {
	return s.modifier("focus-visible", ({ declarations }) => ({
		"&:focus-visible": declarations,
	}));
}

export function useActiveModifier(s: Styleframe): ModifierFactory {
	return s.modifier("active", ({ declarations }) => ({
		"&:active": declarations,
	}));
}

export function useVisitedModifier(s: Styleframe): ModifierFactory {
	return s.modifier("visited", ({ declarations }) => ({
		"&:visited": declarations,
	}));
}

export function useTargetModifier(s: Styleframe): ModifierFactory {
	return s.modifier("target", ({ declarations }) => ({
		"&:target": declarations,
	}));
}

/**
 * Register pseudo-class state modifiers for interactive states.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const { hover, focus } = usePseudoStateModifiers(s);
 *
 * const createBg = utility("background", ({ value }) => ({ background: value }));
 * createBg({ primary: ref(colorPrimary) }, [hover, focus]);
 * ```
 */
export function usePseudoStateModifiers(s: Styleframe): PseudoStateModifiers {
	return {
		hover: useHoverModifier(s),
		focus: useFocusModifier(s),
		focusWithin: useFocusWithinModifier(s),
		focusVisible: useFocusVisibleModifier(s),
		active: useActiveModifier(s),
		visited: useVisitedModifier(s),
		target: useTargetModifier(s),
	};
}
