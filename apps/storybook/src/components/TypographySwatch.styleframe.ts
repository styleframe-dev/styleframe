import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
	useSwatchTypography,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";

const s = styleframe();

const {
	swatchColorPrimary,
	swatchColorSecondary,
	swatchColorTertiary,
	swatchColorBackground,
} = useSwatchColors(s);
const { swatchGapSm } = useSwatchSpacing(s);
const { swatchFontSize, swatchFontWeightBold, swatchFontFamilyMono } =
	useSwatchTypography(s);
const { swatchBorderRadius } = useSwatchDimensions(s);

s.selector(".typography-swatch", {
	display: "flex",
	flexDirection: "column",
	gap: s.ref(swatchGapSm),
	padding: s.ref(swatchGapSm),
	borderRadius: s.ref(swatchBorderRadius),
	background: s.ref(swatchColorBackground),
});

s.selector(".typography-swatch__name", {
	fontWeight: s.ref(swatchFontWeightBold),
	fontSize: s.ref(swatchFontSize),
	color: s.ref(swatchColorPrimary),
});

s.selector(".typography-swatch__value", {
	fontSize: s.ref(swatchFontSize),
	color: s.ref(swatchColorSecondary),
	fontFamily: s.ref(swatchFontFamilyMono),
});

s.selector(".typography-swatch__preview", {
	color: s.ref(swatchColorTertiary),
});

export default s;
