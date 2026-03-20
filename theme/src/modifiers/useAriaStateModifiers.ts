import type { ModifierFactory, Styleframe } from "@styleframe/core";

export interface AriaStateModifiers {
	ariaBusy: ModifierFactory;
	ariaChecked: ModifierFactory;
	ariaDisabled: ModifierFactory;
	ariaExpanded: ModifierFactory;
	ariaHidden: ModifierFactory;
	ariaPressed: ModifierFactory;
	ariaReadonly: ModifierFactory;
	ariaRequired: ModifierFactory;
	ariaSelected: ModifierFactory;
}

export function useAriaBusyModifier(s: Styleframe): ModifierFactory {
	return s.modifier("aria-busy", ({ declarations }) => ({
		'&[aria-busy="true"]': declarations,
	}));
}

export function useAriaCheckedModifier(s: Styleframe): ModifierFactory {
	return s.modifier("aria-checked", ({ declarations }) => ({
		'&[aria-checked="true"]': declarations,
	}));
}

export function useAriaDisabledModifier(s: Styleframe): ModifierFactory {
	return s.modifier("aria-disabled", ({ declarations }) => ({
		'&[aria-disabled="true"]': declarations,
	}));
}

export function useAriaExpandedModifier(s: Styleframe): ModifierFactory {
	return s.modifier("aria-expanded", ({ declarations }) => ({
		'&[aria-expanded="true"]': declarations,
	}));
}

export function useAriaHiddenModifier(s: Styleframe): ModifierFactory {
	return s.modifier("aria-hidden", ({ declarations }) => ({
		'&[aria-hidden="true"]': declarations,
	}));
}

export function useAriaPressedModifier(s: Styleframe): ModifierFactory {
	return s.modifier("aria-pressed", ({ declarations }) => ({
		'&[aria-pressed="true"]': declarations,
	}));
}

export function useAriaReadonlyModifier(s: Styleframe): ModifierFactory {
	return s.modifier("aria-readonly", ({ declarations }) => ({
		'&[aria-readonly="true"]': declarations,
	}));
}

export function useAriaRequiredModifier(s: Styleframe): ModifierFactory {
	return s.modifier("aria-required", ({ declarations }) => ({
		'&[aria-required="true"]': declarations,
	}));
}

export function useAriaSelectedModifier(s: Styleframe): ModifierFactory {
	return s.modifier("aria-selected", ({ declarations }) => ({
		'&[aria-selected="true"]': declarations,
	}));
}

/**
 * Register ARIA state modifiers for targeting elements by ARIA attributes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const { ariaExpanded, ariaDisabled } = useAriaStateModifiers(s);
 *
 * const createOpacity = utility("opacity", ({ value }) => ({ opacity: value }));
 * createOpacity({ 50: "0.5" }, [ariaDisabled]);
 * ```
 */
export function useAriaStateModifiers(s: Styleframe): AriaStateModifiers {
	return {
		ariaBusy: useAriaBusyModifier(s),
		ariaChecked: useAriaCheckedModifier(s),
		ariaDisabled: useAriaDisabledModifier(s),
		ariaExpanded: useAriaExpandedModifier(s),
		ariaHidden: useAriaHiddenModifier(s),
		ariaPressed: useAriaPressedModifier(s),
		ariaReadonly: useAriaReadonlyModifier(s),
		ariaRequired: useAriaRequiredModifier(s),
		ariaSelected: useAriaSelectedModifier(s),
	};
}
