import {
	useDesignTokensPreset,
	useGlobalPreset,
	useModifiersPreset,
	useSanitizePreset,
	useUtilitiesPreset,
} from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// The complete default design-token configuration. Every value below is the
// framework default — tweak any of them and the whole system (utilities,
// recipes, themes) updates on the next run. Anything you remove falls back to
// the framework default, so you can safely delete what you don't need.
useDesignTokensPreset(s, {
	// Brand + semantic colors. Shades and tints (e.g. `primary-100`,
	// `gray-900`) are generated automatically from each base color.
	colors: {
		primary: "#007A99",
		secondary: "#406AD4",
		success: "#058059",
		warning: "#E8BF2B",
		error: "#D22E3E",
		info: "#0E76B2",
		gray: "#5F7186",
		white: "#ffffff",
		black: "#000000",
		// Surfaces & text
		background: "#F8FAFC",
		surface: "#FFFFFF",
		text: "#0F172A",
		"text-weak": "#334155",
		"text-weaker": "#475569",
		"text-weakest": "#64748B",
		"text-inverted": "#F1F5F9",
	},

	// Modular scale ratio used to derive sizes. Options: minor-second,
	// major-second, minor-third, major-third, perfect-fourth, augmented-fourth,
	// perfect-fifth, golden.
	scale: { default: "@scale.minor-third" },

	// Spacing scale — margins, padding, gap.
	spacing: {
		default: "@spacing.md",
		"2xs": "0.25rem",
		xs: "0.5rem",
		sm: "0.75rem",
		md: "1rem",
		lg: "1.5rem",
		xl: "2rem",
		"2xl": "3rem",
		"3xl": "4rem",
	},

	// Typography
	fontFamily: {
		default: "@font-family.base",
		base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
		mono: "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
		print: "'Georgia', 'Times New Roman', 'Times', serif",
	},
	fontSize: {
		default: "@font-size.md",
		"3xs": "0.5rem",
		"2xs": "0.625rem",
		xs: "0.75rem",
		sm: "0.875rem",
		md: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		"2xl": "1.5rem",
		"3xl": "1.875rem",
		"4xl": "2.25rem",
	},
	fontWeight: {
		default: "@font-weight.normal",
		extralight: 200,
		light: 300,
		normal: "normal",
		medium: 500,
		semibold: 600,
		bold: "bold",
		black: 900,
	},
	lineHeight: {
		default: "@line-height.normal",
		tight: 1.2,
		snug: 1.35,
		normal: 1.5,
		relaxed: 1.65,
		loose: 1.9,
	},
	letterSpacing: {
		default: "@letter-spacing.normal",
		tighter: "-0.05em",
		tight: "-0.025em",
		normal: "normal",
		wide: "0.05em",
		wider: "0.1em",
	},

	// Borders
	borderWidth: {
		default: "@border-width.thin",
		none: "0",
		thin: "thin",
		medium: "medium",
		thick: "thick",
	},
	borderRadius: {
		default: "@border-radius.md",
		none: "0",
		sm: "0.125rem",
		md: "0.25rem",
		lg: "0.5rem",
		xl: "0.75rem",
		"2xl": "1rem",
		full: "9999px",
	},

	// Responsive breakpoints (px).
	breakpoint: {
		xs: 0,
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200,
		"2xl": 1440,
	},

	// Motion timing.
	duration: {
		instant: "0ms",
		fast: "150ms",
		normal: "250ms",
		slow: "300ms",
		slower: "500ms",
		slowest: "1000ms",
	},

	// Stacking order.
	zIndex: {
		default: "@z-index.base",
		base: "0",
		dropdown: "100",
		sticky: "200",
		overlay: "300",
		modal: "400",
		popover: "500",
		toast: "600",
		max: "9999",
	},

	// box-shadow, easing, border-style, border-color and fluid typography also
	// ship sensible defaults — add them here the same way to override.
});

useSanitizePreset(s);
useGlobalPreset(s);
useUtilitiesPreset(s);
useModifiersPreset(s);

// Recipes and layout styles are registered from the *.styleframe.ts files.

export default s;
