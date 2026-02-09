import { styleframe } from "virtual:styleframe";
import { useSwatchColors, useSwatchDimensions } from "./tokens.styleframe";

const s = styleframe();

const { swatchColorPrimary, swatchColorBorder } = useSwatchColors(s);
const { swatchBarHeight, swatchBorderRadiusSm } = useSwatchDimensions(s);

s.selector(".progress-bar", {
	flex: "1",
	height: s.ref(swatchBarHeight),
	background: s.ref(swatchColorBorder),
	borderRadius: s.ref(swatchBorderRadiusSm),
	overflow: "hidden",
});

s.selector(".progress-bar__fill", {
	height: "100%",
	borderRadius: s.ref(swatchBorderRadiusSm),
	background: s.ref(swatchColorPrimary),
	transition: "width 0.3s ease",
});

export default s;
