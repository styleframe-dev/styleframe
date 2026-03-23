export const colorValues = {
	/**
	 * Primitives
	 */

	primary: "#007A99",
	secondary: "#406AD4",
	success: "#058059",
	warning: "#E8BF2B",
	danger: "#D22E3E",
	info: "#0E76B2",
	gray: "#5F7186",

	white: "#ffffff",
	black: "#000000",

	/**
	 * States
	 */

	"primary.hover": "@color.primary-shade-50",
	"primary.focus": "@color.primary-shade-50",
	"primary.active": "@color.primary-shade-100",
	"secondary.hover": "@color.secondary-shade-50",
	"secondary.focus": "@color.secondary-shade-50",
	"secondary.active": "@color.secondary-shade-100",
	"success.hover": "@color.success-shade-50",
	"success.focus": "@color.success-shade-50",
	"success.active": "@color.success-shade-100",
	"warning.hover": "@color.warning-shade-50",
	"warning.focus": "@color.warning-shade-50",
	"warning.active": "@color.warning-shade-100",
	"danger.hover": "@color.danger-shade-50",
	"danger.focus": "@color.danger-shade-50",
	"danger.active": "@color.danger-shade-100",
	"info.hover": "@color.info-shade-50",
	"info.focus": "@color.info-shade-50",
	"info.active": "@color.info-shade-100",
	"gray.hover": "@color.gray-shade-50",
	"gray.focus": "@color.gray-shade-50",
	"gray.active": "@color.gray-shade-100",

	/**
	 * Surfaces
	 */

	background: "#F8FAFC",
	surface: "#FFFFFF",

	/**
	 * Text
	 */

	text: "#0F172A",
	"text-inverted": "#F1F5F9",
	"text-weak": "#334155",
	"text-weaker": "#475569",
	"text-weakest": "#64748B",
} as const;

export const darkModeColorValues = {
	/**
	 * Primitives
	 */

	primary: "#007A99",
	secondary: "#406AD4",
	success: "#058059",
	warning: "#E8BF2B",
	danger: "#D22E3E",
	info: "#0E76B2",
	gray: "#5F7186",

	/**
	 * States
	 */

	"primary.hover": "@color.primary-tint-50",
	"primary.focus": "@color.primary-tint-50",
	"primary.active": "@color.primary-tint-100",
	"secondary.hover": "@color.secondary-tint-50",
	"secondary.focus": "@color.secondary-tint-50",
	"secondary.active": "@color.secondary-tint-100",
	"success.hover": "@color.success-tint-50",
	"success.focus": "@color.success-tint-50",
	"success.active": "@color.success-tint-100",
	"warning.hover": "@color.warning-tint-50",
	"warning.focus": "@color.warning-tint-50",
	"warning.active": "@color.warning-tint-100",
	"danger.hover": "@color.danger-tint-50",
	"danger.focus": "@color.danger-tint-50",
	"danger.active": "@color.danger-tint-100",
	"info.hover": "@color.info-tint-50",
	"info.focus": "@color.info-tint-50",
	"info.active": "@color.info-tint-100",
	"gray.hover": "@color.gray-tint-50",
	"gray.focus": "@color.gray-tint-50",
	"gray.active": "@color.gray-tint-100",

	/**
	 * Surfaces
	 */

	background: "#15181E",
	surface: "#1C2028",

	/**
	 * Text
	 */

	text: "#F1F5F9",
	"text-inverted": "#0F172A",
	"text-weak": "#CBD5E1",
	"text-weaker": "#94A3B8",
	"text-weakest": "#64748B",
};
