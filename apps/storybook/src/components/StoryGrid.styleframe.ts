import { styleframe } from "styleframe";
import { useSwatchSpacing } from "./primitives/tokens.styleframe";

const s = styleframe();

const { swatchGapSm, swatchGapLg, swatchPaddingMd } = useSwatchSpacing(s);

s.selector(".story-grid", {
	padding: s.ref(swatchPaddingMd),
});

s.selector(".story-grid--grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: s.ref(swatchGapLg),
});

s.selector(".story-grid--list", {
	display: "flex",
	flexDirection: "column",
	gap: s.ref(swatchGapSm),
});

export default s;
