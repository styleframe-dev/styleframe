export const colorValues = {
	/**
	 * Primitives
	 */

	primary: "#198CCF",
	secondary: "#878BFF",
	success: "#53B365",
	warning: "#FFC53D",
	danger: "#FF604A",
	info: "#399FFF",
	gray: "#E5E5E5",
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

	background: "#f8fafc",
	surface: "#ffffff",

	/**
	 * Text
	 */

	text: "#0F172A",
	"text-inverted": "#F1F5F9",
	"text-weak": "#334155",
	"text-weaker": "#475569",
	"text-weakest": "#64748B",

	"text.on-primary": "@color.text-inverted",
	"text.on-secondary": "@color.text-inverted",
	"text.on-success": "@color.text-inverted",
	"text.on-warning": "@color.text-inverted",
	"text.on-danger": "@color.text-inverted",
	"text.on-info": "@color.text-inverted",
	"text.on-gray": "@color.text-inverted",
} as const;

export const darkModeColorValues = {
	/**
	 * Primitives
	 */

	primary: "#1676AD",
	secondary: "#878BFF",
	success: "#53B365",
	warning: "#FFC53D",
	danger: "#FF604A",
	info: "#399FFF",
	gray: "#E5E5E5",
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

	background: "#0F172A",
	surface: "#1E293B",

	/**
	 * Text
	 */

	text: "#F1F5F9",
	"text-inverted": "#0F172A",
	"text-weak": "#CBD5E1",
	"text-weaker": "#94A3B8",
	"text-weakest": "#64748B",

	"text.on-primary": "@color.text",
	"text.on-secondary": "@color.text",
	"text.on-success": "@color.text",
	"text.on-warning": "@color.text",
	"text.on-danger": "@color.text",
	"text.on-info": "@color.text",
	"text.on-gray": "@color.text",
};
