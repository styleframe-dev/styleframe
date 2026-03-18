import { styleframe } from "virtual:styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
	useSwatchTypography,
	useSwatchDimensions,
} from "../../theme/useSwatch";

const s = styleframe();
const { ref, selector } = s;

const { swatchColorPrimary, swatchColorSecondary, swatchColorBackground } =
	useSwatchColors(s);
const { swatchGapMd, swatchPaddingRow } = useSwatchSpacing(s);
const { swatchFontSize, swatchFontWeightBold, swatchFontFamilyMono } =
	useSwatchTypography(s);
const { swatchBorderRadius, swatchNameMinWidth, swatchValueMinWidth } =
	useSwatchDimensions(s);

selector(".swatch-row", {
	display: "flex",
	alignItems: "center",
	gap: ref(swatchGapMd),
	padding: ref(swatchPaddingRow),
	borderRadius: ref(swatchBorderRadius),
	background: ref(swatchColorBackground),
});

selector(".swatch-row__name", {
	fontWeight: ref(swatchFontWeightBold),
	fontSize: ref(swatchFontSize),
	color: ref(swatchColorPrimary),
	minWidth: ref(swatchNameMinWidth),
});

selector(".swatch-row__name--uppercase", {
	textTransform: "uppercase",
});

selector(".swatch-row__value", {
	fontSize: ref(swatchFontSize),
	color: ref(swatchColorSecondary),
	fontFamily: ref(swatchFontFamilyMono),
	minWidth: ref(swatchValueMinWidth),
});

selector(".swatch-row__content", {
	flex: "1",
	display: "flex",
	alignItems: "center",
});

export default s;
