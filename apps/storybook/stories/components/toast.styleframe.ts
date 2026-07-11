import {
	useToastContentRecipe,
	useToastDismissRecipe,
	useToastIconRecipe,
	useToastProgressRecipe,
	useToastRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize toast recipes
export const toast = useToastRecipe(s);
export const toastIcon = useToastIconRecipe(s);
export const toastContent = useToastContentRecipe(s);
export const toastProgress = useToastProgressRecipe(s);
export const toastDismiss = useToastDismissRecipe(s);

// Container styles for story layout
selector(".toast-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".toast-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".toast-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "flex-start",
});

selector(".toast-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

// Showcase-only: the real progress line runs once over `--toast-duration`
// (animation-fill-mode: forwards), which reads as an already-collapsed line in
// a static story. Loop it here — inside the demo wrapper only, never the recipe
// — so the countdown stays visible on the Storybook canvas.
selector(".toast-progress-demo .toast-progress", {
	animationIterationCount: "infinite",
	animationDuration: "3s",
});

export default s;
