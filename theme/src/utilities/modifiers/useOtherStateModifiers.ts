import type { ModifierFactory, Styleframe } from "@styleframe/core";

export interface OtherStateModifiers {
	open: ModifierFactory;
	inert: ModifierFactory;
}

export function useOpenModifier(s: Styleframe): ModifierFactory {
	return s.modifier("open", ({ declarations }) => ({
		"&:is([open], :popover-open)": declarations,
	}));
}

export function useInertModifier(s: Styleframe): ModifierFactory {
	return s.modifier("inert", ({ declarations }) => ({
		"&:is([inert], [inert] *)": declarations,
	}));
}

/**
 * Register other state modifiers for open/inert element states.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const { open } = useOtherStateModifiers(s);
 *
 * const createDisplay = utility("display", ({ value }) => ({ display: value }));
 * createDisplay({ block: "block" }, [open]);
 * ```
 */
export function useOtherStateModifiers(s: Styleframe): OtherStateModifiers {
	return {
		open: useOpenModifier(s),
		inert: useInertModifier(s),
	};
}
