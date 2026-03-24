import type { ModifierFactory, Styleframe } from "@styleframe/core";

export interface MediaPreferenceModifiers {
	dark: ModifierFactory;
	motionSafe: ModifierFactory;
	motionReduce: ModifierFactory;
	contrastMore: ModifierFactory;
	contrastLess: ModifierFactory;
	portrait: ModifierFactory;
	landscape: ModifierFactory;
	print: ModifierFactory;
	forcedColors: ModifierFactory;
}

export function useDarkModifier(s: Styleframe): ModifierFactory {
	return s.modifier("dark", ({ declarations, variables, children }) => ({
		"@media (prefers-color-scheme: dark)": {
			declarations,
			variables,
			children,
		},
		':is(.dark-theme, [data-theme="dark"]) &': {
			declarations: { ...declarations },
			variables,
			children,
		},
	}));
}

export function useMotionSafeModifier(s: Styleframe): ModifierFactory {
	return s.modifier("motion-safe", ({ declarations }) => ({
		"@media (prefers-reduced-motion: no-preference)": declarations,
	}));
}

export function useMotionReduceModifier(s: Styleframe): ModifierFactory {
	return s.modifier("motion-reduce", ({ declarations }) => ({
		"@media (prefers-reduced-motion: reduce)": declarations,
	}));
}

export function useContrastMoreModifier(s: Styleframe): ModifierFactory {
	return s.modifier("contrast-more", ({ declarations }) => ({
		"@media (prefers-contrast: more)": declarations,
	}));
}

export function useContrastLessModifier(s: Styleframe): ModifierFactory {
	return s.modifier("contrast-less", ({ declarations }) => ({
		"@media (prefers-contrast: less)": declarations,
	}));
}

export function usePortraitModifier(s: Styleframe): ModifierFactory {
	return s.modifier("portrait", ({ declarations }) => ({
		"@media (orientation: portrait)": declarations,
	}));
}

export function useLandscapeModifier(s: Styleframe): ModifierFactory {
	return s.modifier("landscape", ({ declarations }) => ({
		"@media (orientation: landscape)": declarations,
	}));
}

export function usePrintModifier(s: Styleframe): ModifierFactory {
	return s.modifier("print", ({ declarations }) => ({
		"@media print": declarations,
	}));
}

export function useForcedColorsModifier(s: Styleframe): ModifierFactory {
	return s.modifier("forced-colors", ({ declarations }) => ({
		"@media (forced-colors: active)": declarations,
	}));
}

/**
 * Register media/preference query modifiers for adaptive styling.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * const { dark, motionReduce } = useMediaPreferenceModifiers(s);
 *
 * const createBg = utility("background", ({ value }) => ({ background: value }));
 * createBg({ primary: ref(colorPrimary) }, [dark]);
 * ```
 */
export function useMediaPreferenceModifiers(
	s: Styleframe,
): MediaPreferenceModifiers {
	return {
		dark: useDarkModifier(s),
		motionSafe: useMotionSafeModifier(s),
		motionReduce: useMotionReduceModifier(s),
		contrastMore: useContrastMoreModifier(s),
		contrastLess: useContrastLessModifier(s),
		portrait: usePortraitModifier(s),
		landscape: useLandscapeModifier(s),
		print: usePrintModifier(s),
		forcedColors: useForcedColorsModifier(s),
	};
}
