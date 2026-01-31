import { styleframe } from "styleframe";
import {
	useSwatchColors,
	useSwatchDimensions,
} from "./primitives/tokens.styleframe";

const s = styleframe();

const { swatchColorBackground } = useSwatchColors(s);
const { swatchPreviewSize, swatchBorderRadiusSm } = useSwatchDimensions(s);

s.selector(".box-shadow-swatch__preview", {
	width: s.ref(swatchPreviewSize),
	height: s.ref(swatchPreviewSize),
	background: s.ref(swatchColorBackground),
	borderRadius: s.ref(swatchBorderRadiusSm),
});

export default s;
