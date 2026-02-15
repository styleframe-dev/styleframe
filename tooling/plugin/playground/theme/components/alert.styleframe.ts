import { styleframe } from "virtual:styleframe";
import { useTokens } from "../useTokens";

const s = styleframe();
const { ref, selector, css } = s;

const { tokens, colorWhite, fadeIn } = useTokens(s);
const { spacingXs, spacingSm, spacingMd } = tokens.spacing;
const { borderRadiusLg, borderRadiusMd } = tokens.borderRadius;
const { borderWidthThin } = tokens.borderWidth;
const { fontSizeSm, fontSizeMd } = tokens.fontSize;
const { fontWeightSemibold } = tokens.fontWeight;
const { lineHeightNormal } = tokens.lineHeight;
const { colorSuccess, colorWarning, colorDanger, colorInfo } = tokens.colors;

// Alert structure
selector(".alert", {
	display: "flex",
	gap: ref(spacingSm),
	padding: ref(spacingMd),
	borderRadius: ref(borderRadiusLg),
	borderWidth: ref(borderWidthThin),
	borderStyle: "solid",
	borderColor: "transparent",
	lineHeight: ref(lineHeightNormal),
	animation: css`${fadeIn.name} 200ms ease-out`,
	"@media (prefers-reduced-motion: reduce)": {
		animation: "none",
	},
});

selector(".alert__icon", {
	flexShrink: "0",
	width: "20px",
	height: "20px",
	marginTop: "2px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

selector(".alert__content", {
	flex: "1",
	minWidth: "0",
});

selector(".alert__title", {
	fontWeight: ref(fontWeightSemibold),
	fontSize: ref(fontSizeMd),
	margin: "0",
});

selector(".alert__description", {
	fontSize: ref(fontSizeSm),
	marginTop: ref(spacingXs),
	margin: "0",
});

selector(".alert__dismiss", {
	flexShrink: "0",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	width: "24px",
	height: "24px",
	borderRadius: ref(borderRadiusMd),
	border: "none",
	background: "transparent",
	cursor: "pointer",
	opacity: "0.6",
	transition: "opacity 150ms ease",
	"&:hover": {
		opacity: "1",
	},
});

// Alert color recipe
export const alertRecipe = s.recipe({
	name: "alert",
	base: {},
	variants: {
		color: {
			success: {
				backgroundColor: ref(colorSuccess),
				color: ref(colorWhite),
				borderColor: ref(colorSuccess),
			},
			warning: {
				backgroundColor: ref(colorWarning),
				color: ref(colorWhite),
				borderColor: ref(colorWarning),
			},
			danger: {
				backgroundColor: ref(colorDanger),
				color: ref(colorWhite),
				borderColor: ref(colorDanger),
			},
			info: {
				backgroundColor: ref(colorInfo),
				color: ref(colorWhite),
				borderColor: ref(colorInfo),
			},
		},
	},
	defaultVariants: {
		color: "info",
	},
});

export default s;
