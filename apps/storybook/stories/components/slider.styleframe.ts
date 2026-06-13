import {
	useSliderRangeRecipe,
	useSliderRecipe,
	useSliderThumbRecipe,
	useSliderTrackRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize slider recipes
export const slider = useSliderRecipe(s);
export const sliderTrack = useSliderTrackRecipe(s);
export const sliderRange = useSliderRangeRecipe(s);
export const sliderThumb = useSliderThumbRecipe(s);

// Demo positioning — a fixed, representative 60% fill for the static showcase.
// The fill length and thumb offset are data-driven in real usage, so the
// recipes deliberately leave them out; the showcase pins them with utility
// selectors instead of inline styles.
selector(".slider-range-demo--horizontal", {
	width: "60%",
});

selector(".slider-range-demo--vertical", {
	height: "60%",
});

selector(".slider-thumb-demo--horizontal", {
	top: "50%",
	insetInlineStart: "60%",
	transform: "translate(-50%, -50%)",
});

selector(".slider-thumb-demo--vertical", {
	insetInlineStart: "50%",
	bottom: "60%",
	transform: "translate(-50%, 50%)",
});

// Container styles for story layout
selector(".slider-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".slider-row", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.sm",
});

selector(".slider-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
