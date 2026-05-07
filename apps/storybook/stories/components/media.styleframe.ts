import {
	useMediaRecipe,
	useMediaFigureRecipe,
	useMediaBodyRecipe,
	useMediaTitleRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize media recipes
export const media = useMediaRecipe(s);
export const mediaFigure = useMediaFigureRecipe(s);
export const mediaBody = useMediaBodyRecipe(s);
export const mediaTitle = useMediaTitleRecipe(s);

// Container styles for story layout
selector(".media-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".media-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	alignItems: "flex-start",
});

selector(".media-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	marginBottom: "@spacing.sm",
});

// Placeholder avatar styling for story figures.
// Width/height are intentionally omitted so consumers can size via utility
// classes (e.g., `_width:[40px] _height:[40px]`) — see MediaSizeGrid.vue.
selector(".media-avatar", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: "@color.primary-100",
	color: "@color.primary-700",
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	borderRadius: "@border-radius.full",
});

export default s;
