import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Toggle recipe — a two-state `<button>` that looks like a button and carries an
 * on/off state via `aria-pressed`. "A checkbox that looks like a toggleable button."
 *
 * Three visual styles set the resting surface: `solid` (the default) carries a soft
 * gray fill so it reads as a filled button at rest; `outline` is transparent with a
 * border; `ghost` is transparent with no border. All three share a single engaged
 * fill applied on hover, focus, active, and the ON state — `&:aria-pressed` reuses
 * the `:active` fill, so a held toggle reads as the actively-pressed step.
 * `aria-pressed` is never a recipe argument; it is runtime DOM state the
 * `&:aria-pressed` rule targets (just as `:hover` is not an argument).
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
			solid: {},
			outline: {},
			ghost: {},
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
		// dark text). `solid` carries the `gray-100` resting fill; all variants share
		// the `gray-150` engaged fill. No `&:dark` block: the gray scale is mode-independent.
		{
			match: { color: "light" as const, variant: "solid" as const },
			css: {
				color: "@color.gray-700",
				background: "@color.gray-100",
				"&:hover": { background: "@color.gray-150" },
				"&:focus": { background: "@color.gray-150" },
				"&:active": { background: "@color.gray-150" },
				"&:aria-pressed": { background: "@color.gray-150" },
			},
		},
		{
			match: { color: "light" as const, variant: "outline" as const },
			css: {
				color: "@color.gray-700",
				borderColor: "@color.gray-300",
				"&:hover": { background: "@color.gray-150" },
				"&:focus": { background: "@color.gray-150" },
				"&:active": { background: "@color.gray-150" },
				"&:aria-pressed": { background: "@color.gray-150" },
			},
		},
		{
			match: { color: "light" as const, variant: "ghost" as const },
			css: {
				color: "@color.gray-700",
				"&:hover": { background: "@color.gray-150" },
				"&:focus": { background: "@color.gray-150" },
				"&:active": { background: "@color.gray-150" },
				"&:aria-pressed": { background: "@color.gray-150" },
			},
		},
		// Dark surface — fixed dark appearance across themes (absolute grays,
		// light text). `solid` carries the `gray-800` resting fill; all variants share
		// the `gray-750` engaged fill. No `&:dark` block.
		{
			match: { color: "dark" as const, variant: "solid" as const },
			css: {
				color: "@color.gray-200",
				background: "@color.gray-800",
				"&:hover": { background: "@color.gray-750" },
				"&:focus": { background: "@color.gray-750" },
				"&:active": { background: "@color.gray-750" },
				"&:aria-pressed": { background: "@color.gray-750" },
			},
		},
		{
			match: { color: "dark" as const, variant: "outline" as const },
			css: {
				color: "@color.gray-200",
				borderColor: "@color.gray-600",
				"&:hover": { background: "@color.gray-750" },
				"&:focus": { background: "@color.gray-750" },
				"&:active": { background: "@color.gray-750" },
				"&:aria-pressed": { background: "@color.gray-750" },
			},
		},
		{
			match: { color: "dark" as const, variant: "ghost" as const },
			css: {
				color: "@color.gray-200",
				"&:hover": { background: "@color.gray-750" },
				"&:focus": { background: "@color.gray-750" },
				"&:active": { background: "@color.gray-750" },
				"&:aria-pressed": { background: "@color.gray-750" },
			},
		},
		// Neutral surface — adaptive. Text follows `@color.text`; `solid`'s resting fill
		// and every variant's engaged fills flip to the dark gray ramp under `&:dark`.
		{
			match: { color: "neutral" as const, variant: "solid" as const },
			css: {
				color: "@color.text",
				background: "@color.gray-100",
				"&:hover": { background: "@color.gray-150" },
				"&:focus": { background: "@color.gray-150" },
				"&:active": { background: "@color.gray-150" },
				"&:aria-pressed": { background: "@color.gray-150" },
				"&:dark": { color: "@color.gray-200", background: "@color.gray-800" },
				"&:dark:hover": { background: "@color.gray-750" },
				"&:dark:focus": { background: "@color.gray-750" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-750" },
			},
		},
		{
			match: { color: "neutral" as const, variant: "outline" as const },
			css: {
				color: "@color.text",
				borderColor: "@color.gray-300",
				"&:hover": { background: "@color.gray-150" },
				"&:focus": { background: "@color.gray-150" },
				"&:active": { background: "@color.gray-150" },
				"&:aria-pressed": { background: "@color.gray-150" },
				"&:dark": {
					color: "@color.gray-200",
					borderColor: "@color.gray-600",
				},
				"&:dark:hover": { background: "@color.gray-750" },
				"&:dark:focus": { background: "@color.gray-750" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-750" },
			},
		},
		{
			match: { color: "neutral" as const, variant: "ghost" as const },
			css: {
				color: "@color.text",
				"&:hover": { background: "@color.gray-150" },
				"&:focus": { background: "@color.gray-150" },
				"&:active": { background: "@color.gray-150" },
				"&:aria-pressed": { background: "@color.gray-150" },
				"&:dark": { color: "@color.gray-200" },
				"&:dark:hover": { background: "@color.gray-750" },
				"&:dark:focus": { background: "@color.gray-750" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-750" },
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});
