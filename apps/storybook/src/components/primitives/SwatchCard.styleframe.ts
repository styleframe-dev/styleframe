import { styleframe } from "virtual:styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
	useSwatchTypography,
	useSwatchDimensions,
} from "../../theme/useSwatch";

const s = styleframe();
const { ref, selector, css } = s;

const { swatchColorTertiary, swatchColorBackground, swatchColorBorder } =
	useSwatchColors(s);
const { swatchGapXs, swatchPaddingMd } = useSwatchSpacing(s);
const { swatchFontSize, swatchFontSizeSm, swatchFontWeightNormal } =
	useSwatchTypography(s);
const { swatchPreviewSize, swatchBorderRadius } = useSwatchDimensions(s);

selector(".swatch-card", {
	display: "flex",
	flexDirection: "column",
	borderRadius: ref(swatchBorderRadius),
	border: css`1px solid ${ref(swatchColorBorder)}`,
	background: ref(swatchColorBackground),
	overflow: "hidden",
});

selector(".swatch-card__body", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: ref(swatchPaddingMd),
});

selector(".swatch-card__preview", {
	width: ref(swatchPreviewSize),
	height: ref(swatchPreviewSize),
});

selector(".swatch-card__footer", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: ref(swatchGapXs),
	padding: ref(swatchPaddingMd),
	borderTop: css`1px solid ${ref(swatchColorBorder)}`,
	background: ref(swatchColorBackground),
});

selector(".swatch-card__name", {
	fontSize: ref(swatchFontSize),
	fontWeight: ref(swatchFontWeightNormal),
	color: ref(swatchColorTertiary),
});

selector(".swatch-card__label", {
	fontSize: ref(swatchFontSizeSm),
	fontWeight: ref(swatchFontWeightNormal),
	color: ref(swatchColorTertiary),
	textAlign: "center",
});

export default s;
