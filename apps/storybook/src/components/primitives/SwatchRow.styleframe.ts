import { styleframe } from "virtual:styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
	useSwatchTypography,
	useSwatchDimensions,
} from "./tokens.styleframe";

const s = styleframe();

const { swatchColorPrimary, swatchColorSecondary, swatchColorBackground } =
	useSwatchColors(s);
const { swatchGapMd, swatchPaddingRow } = useSwatchSpacing(s);
const { swatchFontSize, swatchFontWeightBold, swatchFontFamilyMono } =
	useSwatchTypography(s);
const { swatchBorderRadius, swatchNameMinWidth, swatchValueMinWidth } =
	useSwatchDimensions(s);

s.selector(".swatch-row", {
	display: "flex",
	alignItems: "center",
	gap: s.ref(swatchGapMd),
	padding: s.ref(swatchPaddingRow),
	borderRadius: s.ref(swatchBorderRadius),
	background: s.ref(swatchColorBackground),
});

s.selector(".swatch-row__name", {
	fontWeight: s.ref(swatchFontWeightBold),
	fontSize: s.ref(swatchFontSize),
	color: s.ref(swatchColorPrimary),
	minWidth: s.ref(swatchNameMinWidth),
});

s.selector(".swatch-row__name--uppercase", {
	textTransform: "uppercase",
});

s.selector(".swatch-row__value", {
	fontSize: s.ref(swatchFontSize),
	color: s.ref(swatchColorSecondary),
	fontFamily: s.ref(swatchFontFamilyMono),
	minWidth: s.ref(swatchValueMinWidth),
});

s.selector(".swatch-row__content", {
	flex: "1",
	display: "flex",
	alignItems: "center",
});

export default s;
