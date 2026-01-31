import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
	useSwatchTypography,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";

const s = styleframe();

const { swatchColorSecondary } = useSwatchColors(s);
const { swatchGapXs } = useSwatchSpacing(s);
const { swatchFontSize, swatchFontSizeSm, swatchFontWeightBold } =
	useSwatchTypography(s);
const { swatchPreviewSizeSm, swatchPreviewHeightSm, swatchBorderRadius } =
	useSwatchDimensions(s);

s.selector(".color-variant-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: s.ref(swatchGapXs),
});

s.selector(".color-variant-swatch__preview", {
	width: s.ref(swatchPreviewSizeSm),
	height: s.ref(swatchPreviewHeightSm),
	borderRadius: s.ref(swatchBorderRadius),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontWeight: s.ref(swatchFontWeightBold),
	fontSize: s.ref(swatchFontSize),
});

s.selector(".color-variant-swatch__label", {
	fontSize: s.ref(swatchFontSizeSm),
	color: s.ref(swatchColorSecondary),
	textAlign: "center",
});

export default s;
