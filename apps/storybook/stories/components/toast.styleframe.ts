import {
	useToastContentRecipe,
	useToastDescriptionRecipe,
	useToastDismissRecipe,
	useToastIconRecipe,
	useToastProgressRecipe,
	useToastRecipe,
	useToastTitleRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize toast recipes
export const toast = useToastRecipe(s);
export const toastIcon = useToastIconRecipe(s);
export const toastContent = useToastContentRecipe(s);
export const toastTitle = useToastTitleRecipe(s);
export const toastDescription = useToastDescriptionRecipe(s);
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

// Showcase-only: the real progress bar runs once over `--toast-duration`, which
// reads as a static bar on a still story canvas. Loop it here — inside the demo
// wrapper only, never the recipe — so the countdown stays visibly animating in
// Storybook.
selector(".toast-progress-demo .toast-progress", {
	animationIterationCount: "infinite",
	animationDuration: "3s",
});

export default s;
