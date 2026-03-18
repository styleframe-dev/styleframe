import { styleframe } from "virtual:styleframe";
import { useSwatchColors, useSwatchDimensions } from "../../theme/useSwatch";

const s = styleframe();
const { ref, selector } = s;

const { swatchColorPrimary, swatchColorBorder } = useSwatchColors(s);
const { swatchBarHeight, swatchBorderRadiusSm } = useSwatchDimensions(s);

selector(".progress-bar", {
	flex: "1",
	height: ref(swatchBarHeight),
	background: ref(swatchColorBorder),
	borderRadius: ref(swatchBorderRadiusSm),
	overflow: "hidden",
});

selector(".progress-bar__fill", {
	height: "100%",
	borderRadius: ref(swatchBorderRadiusSm),
	background: ref(swatchColorPrimary),
	transition: "width 0.3s ease",
});

export default s;
