import { styleframe } from "virtual:styleframe";
import { useTokens } from "../useTokens";

const s = styleframe();
const { ref, selector } = s;

// Register tokens so recipe can reference them
const { tokens, colorWhite } = useTokens(s);
const { colorPrimary, colorSecondary, colorSuccess, colorDanger } =
	tokens.colors;
const { spacingXs, spacingSm, spacingMd, spacingLg } = tokens.spacing;
const { borderWidthThin } = tokens.borderWidth;
const { borderRadiusMd } = tokens.borderRadius;
const { fontSizeSm, fontSizeMd, fontSizeLg } = tokens.fontSize;
const { fontWeightMedium, fontWeightSemibold } = tokens.fontWeight;
const { lineHeightSnug } = tokens.lineHeight;

// Smooth transitions for interactive states
selector(".button", {
	transition:
		"color 150ms ease, background-color 150ms ease, border-color 150ms ease, opacity 150ms ease",
	"&:hover:not(:disabled)": {
		opacity: "0.9",
	},
	"&:active:not(:disabled)": {
		opacity: "0.8",
	},
});

export const buttonRecipe = s.recipe({
	name: "button",
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: ref(spacingXs),
		borderWidth: ref(borderWidthThin),
		borderStyle: "solid",
		borderColor: "transparent",
		borderRadius: ref(borderRadiusMd),
		fontWeight: ref(fontWeightMedium),
		lineHeight: ref(lineHeightSnug),
		cursor: "pointer",
		userSelect: "none",
	},
	variants: {
		color: {
			primary: {
				backgroundColor: ref(colorPrimary),
				color: ref(colorWhite),
				borderColor: ref(colorPrimary),
			},
			secondary: {
				backgroundColor: ref(colorSecondary),
				color: ref(colorWhite),
				borderColor: ref(colorSecondary),
			},
			success: {
				backgroundColor: ref(colorSuccess),
				color: ref(colorWhite),
				borderColor: ref(colorSuccess),
			},
			danger: {
				backgroundColor: ref(colorDanger),
				color: ref(colorWhite),
				borderColor: ref(colorDanger),
			},
		},
		size: {
			sm: {
				paddingBlock: ref(spacingXs),
				paddingInline: ref(spacingSm),
				fontSize: ref(fontSizeSm),
			},
			md: {
				paddingBlock: ref(spacingSm),
				paddingInline: ref(spacingMd),
				fontSize: ref(fontSizeMd),
			},
			lg: {
				paddingBlock: ref(spacingMd),
				paddingInline: ref(spacingLg),
				fontSize: ref(fontSizeLg),
				fontWeight: ref(fontWeightSemibold),
			},
		},
		variant: {
			solid: {},
			outline: {
				backgroundColor: "transparent",
			},
			ghost: {
				backgroundColor: "transparent",
				borderColor: "transparent",
			},
		},
		disabled: {
			false: {},
			true: {
				opacity: "0.5",
				cursor: "not-allowed",
				pointerEvents: "none",
			},
		},
	},
	defaultVariants: {
		color: "primary",
		size: "md",
		variant: "solid",
		disabled: false,
	},
	compoundVariants: [
		// Outline variant: text and border use brand color
		{
			match: { color: "primary", variant: "outline" },
			css: { color: ref(colorPrimary) },
		},
		{
			match: { color: "secondary", variant: "outline" },
			css: { color: ref(colorSecondary) },
		},
		{
			match: { color: "success", variant: "outline" },
			css: { color: ref(colorSuccess) },
		},
		{
			match: { color: "danger", variant: "outline" },
			css: { color: ref(colorDanger) },
		},
		// Ghost variant: only text color
		{
			match: { color: "primary", variant: "ghost" },
			css: { color: ref(colorPrimary) },
		},
		{
			match: { color: "secondary", variant: "ghost" },
			css: { color: ref(colorSecondary) },
		},
		{
			match: { color: "success", variant: "ghost" },
			css: { color: ref(colorSuccess) },
		},
		{
			match: { color: "danger", variant: "ghost" },
			css: { color: ref(colorDanger) },
		},
	],
});

export default s;
