import {
	useColorPickerRecipe,
	useColorPickerSelectorRecipe,
	useColorPickerThumbRecipe,
	useColorPickerTrackRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize color picker recipes
export const colorPicker = useColorPickerRecipe(s);
export const colorPickerSelector = useColorPickerSelectorRecipe(s);
export const colorPickerTrack = useColorPickerTrackRecipe(s);
export const colorPickerThumb = useColorPickerThumbRecipe(s);

// Static showcase state: pick a pleasant blue hue and place the thumbs at a
// representative selection. In a real app the consumer drives `--color-picker--hue`
// and the thumb positions from drag interactions.
selector(".color-picker", {
	"--color-picker--hue": "217",
});

selector(".color-picker-selector .color-picker-thumb", {
	left: "72%",
	top: "30%",
	transform: "translate(-50%, -50%)",
});

selector(".color-picker-track .color-picker-thumb", {
	left: "50%",
	top: "60%",
	transform: "translate(-50%, -50%)",
});

// Container styles for story layout
selector(".color-picker-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.xl",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".color-picker-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".color-picker-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.xl",
	alignItems: "flex-start",
});

selector(".color-picker-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	marginBottom: "@spacing.sm",
});

export default s;
