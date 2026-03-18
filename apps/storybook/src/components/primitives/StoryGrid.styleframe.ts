import { styleframe } from "virtual:styleframe";
import { useSwatchSpacing } from "../../theme/useSwatch";

const s = styleframe();
const { ref, selector } = s;

const { swatchGapSm, swatchGapLg, swatchPaddingMd } = useSwatchSpacing(s);

selector(".story-grid", {
	padding: ref(swatchPaddingMd),
});

selector(".story-grid--grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: ref(swatchGapLg),
});

selector(".story-grid--list", {
	display: "flex",
	flexDirection: "column",
	gap: ref(swatchGapSm),
});

export default s;
