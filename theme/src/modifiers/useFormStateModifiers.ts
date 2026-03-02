import type { ModifierFactory, Styleframe } from "@styleframe/core";

export interface FormStateModifiers {
	disabled: ModifierFactory;
	enabled: ModifierFactory;
	checked: ModifierFactory;
	indeterminate: ModifierFactory;
	required: ModifierFactory;
	optional: ModifierFactory;
	valid: ModifierFactory;
	invalid: ModifierFactory;
	placeholderShown: ModifierFactory;
	autofill: ModifierFactory;
	readOnly: ModifierFactory;
	readonly: ModifierFactory;
}

export function useDisabledModifier(s: Styleframe): ModifierFactory {
	return s.modifier("disabled", ({ declarations }) => ({
		"&:disabled": declarations,
	}));
}

export function useEnabledModifier(s: Styleframe): ModifierFactory {
	return s.modifier("enabled", ({ declarations }) => ({
		"&:enabled": declarations,
	}));
}

export function useCheckedModifier(s: Styleframe): ModifierFactory {
	return s.modifier("checked", ({ declarations }) => ({
		"&:checked": declarations,
	}));
}

export function useIndeterminateModifier(s: Styleframe): ModifierFactory {
	return s.modifier("indeterminate", ({ declarations }) => ({
		"&:indeterminate": declarations,
	}));
}

export function useRequiredModifier(s: Styleframe): ModifierFactory {
	return s.modifier("required", ({ declarations }) => ({
		"&:required": declarations,
	}));
}

export function useOptionalModifier(s: Styleframe): ModifierFactory {
	return s.modifier("optional", ({ declarations }) => ({
		"&:optional": declarations,
	}));
}

export function useValidModifier(s: Styleframe): ModifierFactory {
	return s.modifier("valid", ({ declarations }) => ({
		"&:valid": declarations,
	}));
}

export function useInvalidModifier(s: Styleframe): ModifierFactory {
	return s.modifier("invalid", ({ declarations }) => ({
		"&:invalid": declarations,
	}));
}

export function usePlaceholderShownModifier(s: Styleframe): ModifierFactory {
	return s.modifier("placeholder-shown", ({ declarations }) => ({
		"&:placeholder-shown": declarations,
	}));
}

export function useAutofillModifier(s: Styleframe): ModifierFactory {
	return s.modifier("autofill", ({ declarations }) => ({
		"&:autofill": declarations,
	}));
}

export function useReadOnlyModifier(s: Styleframe): ModifierFactory {
	return s.modifier("read-only", ({ declarations }) => ({
		"&:read-only": declarations,
	}));
}

export function useReadonlyModifier(s: Styleframe): ModifierFactory {
	return s.modifier("readonly", ({ declarations }) => ({
		"&:read-only": declarations,
	}));
}

/**
 * Register form state modifiers for form element pseudo-classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const { disabled, invalid } = useFormStateModifiers(s);
 *
 * const createOpacity = utility("opacity", ({ value }) => ({ opacity: value }));
 * createOpacity({ 50: "0.5" }, [disabled]);
 * ```
 */
export function useFormStateModifiers(s: Styleframe): FormStateModifiers {
	return {
		disabled: useDisabledModifier(s),
		enabled: useEnabledModifier(s),
		checked: useCheckedModifier(s),
		indeterminate: useIndeterminateModifier(s),
		required: useRequiredModifier(s),
		optional: useOptionalModifier(s),
		valid: useValidModifier(s),
		invalid: useInvalidModifier(s),
		placeholderShown: usePlaceholderShownModifier(s),
		autofill: useAutofillModifier(s),
		readOnly: useReadOnlyModifier(s),
		readonly: useReadonlyModifier(s),
	};
}
