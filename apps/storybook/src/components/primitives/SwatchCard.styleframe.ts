import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
	useSwatchTypography,
	useSwatchDimensions,
} from "./tokens.styleframe";

const s = styleframe();

const { swatchColorTertiary, swatchColorBackground, swatchColorBorder } =
	useSwatchColors(s);
const { swatchGapXs, swatchPaddingMd } = useSwatchSpacing(s);
const { swatchFontSize, swatchFontSizeSm, swatchFontWeightNormal } =
	useSwatchTypography(s);
const { swatchPreviewSize, swatchBorderRadius } = useSwatchDimensions(s);

s.selector(".swatch-card", {
	display: "flex",
	flexDirection: "column",
	borderRadius: s.ref(swatchBorderRadius),
	border: s.css`1px solid ${s.ref(swatchColorBorder)}`,
	background: s.ref(swatchColorBackground),
	overflow: "hidden",
});

s.selector(".swatch-card__body", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: s.ref(swatchPaddingMd),
});

s.selector(".swatch-card__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
});

s.selector(".swatch-card__footer", {
	display: "flex",
	flexDirection: "column",
	gap: s.ref(swatchGapXs),
	padding: s.ref(swatchPaddingMd),
	borderTop: s.css`1px solid ${s.ref(swatchColorBorder)}`,
	background: s.ref(swatchColorBackground),
});

s.selector(".swatch-card__name", {
	fontSize: s.ref(swatchFontSize),
	fontWeight: s.ref(swatchFontWeightNormal),
	color: s.ref(swatchColorTertiary),
});

s.selector(".swatch-card__label", {
	fontSize: s.ref(swatchFontSizeSm),
	fontWeight: s.ref(swatchFontWeightNormal),
	color: s.ref(swatchColorTertiary),
});

export default s;
