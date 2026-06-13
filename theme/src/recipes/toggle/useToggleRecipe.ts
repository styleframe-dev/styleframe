import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toggle recipe — a two-state `<button>` that looks like a button and carries an
 * on/off state via `aria-pressed`. "A checkbox that looks like a toggleable button."
 *
 * The ON appearance reuses each colour/variant's `:active` fill, re-applied on
 * `&:aria-pressed` (and its dark variant) so a pressed toggle reads as the
 * "actively pressed" step held persistently. `:hover` / `:focus` give the lighter
 * pre-press fill, mirroring the `button` recipe's ghost/outline ramp. `aria-pressed`
 * is never a recipe argument — it is runtime DOM state the `&:aria-pressed` rule
 * targets (just as `:hover` is not an argument).
 *
 * Colours follow the form-control family (`checkbox` / `switch` / `input`):
 * `light` and `dark` are fixed across themes (absolute grays, no `&:dark`), while
 * `neutral` is adaptive and overrides its fills under `&:dark`.
 */
export const useToggleRecipe = createUseRecipe("toggle", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "@font-weight.medium",
		fontSize: "@font-size.sm",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		borderRadius: "@border-radius.md",
		lineHeight: "@line-height.normal",
		paddingTop: "@0.5",
		paddingBottom: "@0.5",
		paddingLeft: "@0.75",
		paddingRight: "@0.75",
		cursor: "pointer",
		transitionProperty: "color, background-color, border-color",
		transitionTimingFunction: "@easing.ease-in-out",
		transitionDuration: "150ms",
		textDecoration: "none",
		whiteSpace: "nowrap",
		userSelect: "none",
		outline: "none",
		"&:focus-visible": {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.primary",
			outlineOffset: "2px",
		},
		"&:disabled": {
			cursor: "not-allowed",
			opacity: "0.75",
			pointerEvents: "none",
		},
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			ghost: {
				background: "transparent",
			},
			outline: {},
		},
		size: {
			sm: {
				fontSize: "@font-size.xs",
				paddingTop: "@0.375",
				paddingBottom: "@0.375",
				paddingLeft: "@0.625",
				paddingRight: "@0.625",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.625",
				paddingBottom: "@0.625",
				paddingLeft: "@0.875",
				paddingRight: "@0.875",
				gap: "@0.5",
				borderRadius: "@border-radius.md",
			},
		},
	},
	compoundVariants: [
		// Light surface — fixed light appearance across themes (absolute grays,
		// dark text). No `&:dark` block: the gray scale is mode-independent.
		{
			match: { color: "light" as const, variant: "ghost" as const },
			css: {
				color: "@color.gray-700",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-200" },
			},
		},
		{
			match: { color: "light" as const, variant: "outline" as const },
			css: {
				color: "@color.gray-700",
				borderColor: "@color.gray-300",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-200" },
			},
		},
		// Dark surface — fixed dark appearance across themes (absolute grays,
		// light text). No `&:dark` block.
		{
			match: { color: "dark" as const, variant: "ghost" as const },
			css: {
				color: "@color.gray-200",
				"&:hover": { background: "@color.gray-800" },
				"&:focus": { background: "@color.gray-800" },
				"&:active": { background: "@color.gray-750" },
				"&:aria-pressed": { background: "@color.gray-750" },
			},
		},
		{
			match: { color: "dark" as const, variant: "outline" as const },
			css: {
				color: "@color.gray-200",
				borderColor: "@color.gray-600",
				"&:hover": { background: "@color.gray-800" },
				"&:focus": { background: "@color.gray-800" },
				"&:active": { background: "@color.gray-750" },
				"&:aria-pressed": { background: "@color.gray-750" },
			},
		},
		// Neutral surface — adaptive. Text follows `@color.text`; fills flip to the
		// dark gray ramp under `&:dark`, and the ON (`:active`) fill is re-asserted
		// on `&:dark:aria-pressed` to keep winning.
		{
			match: { color: "neutral" as const, variant: "ghost" as const },
			css: {
				color: "@color.text",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-200" },
				"&:dark": { color: "@color.gray-200" },
				"&:dark:hover": { background: "@color.gray-800" },
				"&:dark:focus": { background: "@color.gray-800" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-750" },
			},
		},
		{
			match: { color: "neutral" as const, variant: "outline" as const },
			css: {
				color: "@color.text",
				borderColor: "@color.gray-300",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-200" },
				"&:dark": { color: "@color.gray-200", borderColor: "@color.gray-600" },
				"&:dark:hover": { background: "@color.gray-800" },
				"&:dark:focus": { background: "@color.gray-800" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-750" },
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		variant: "ghost",
		size: "md",
	},
});
