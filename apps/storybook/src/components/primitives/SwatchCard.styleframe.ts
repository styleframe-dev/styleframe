import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchSpacing,
	useSwatchTypography,
	useSwatchDimensions,
} from "./tokens.styleframe";

const s = styleframe();

const { swatchColorTertiary } = useSwatchColors(s);
const { swatchGapSm } = useSwatchSpacing(s);
const { swatchFontSize, swatchFontWeightNormal } = useSwatchTypography(s);
const { swatchPreviewSize } = useSwatchDimensions(s);

s.selector(".swatch-card", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: s.ref(swatchGapSm),
});

s.selector(".swatch-card__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
});

s.selector(".swatch-card__name", {
	fontSize: s.ref(swatchFontSize),
	fontWeight: s.ref(swatchFontWeightNormal),
	color: s.ref(swatchColorTertiary),
});

s.selector(".swatch-card__label", {
	fontSize: s.ref(swatchFontSize),
	fontWeight: s.ref(swatchFontWeightNormal),
	color: s.ref(swatchColorTertiary),
});

export default s;
