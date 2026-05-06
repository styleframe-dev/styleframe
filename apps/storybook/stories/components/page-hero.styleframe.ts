import {
	usePageHeroActionsRecipe,
	usePageHeroBodyRecipe,
	usePageHeroDescriptionRecipe,
	usePageHeroHeadlineRecipe,
	usePageHeroImageRecipe,
	usePageHeroLinksRecipe,
	usePageHeroRecipe,
	usePageHeroTitleRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize all page-hero recipes
export const pageHero = usePageHeroRecipe(s);
export const pageHeroBody = usePageHeroBodyRecipe(s);
export const pageHeroHeadline = usePageHeroHeadlineRecipe(s);
export const pageHeroTitle = usePageHeroTitleRecipe(s);
export const pageHeroDescription = usePageHeroDescriptionRecipe(s);
export const pageHeroActions = usePageHeroActionsRecipe(s);
export const pageHeroLinks = usePageHeroLinksRecipe(s);
export const pageHeroImage = usePageHeroImageRecipe(s);

// Container styles for story layout
selector(".page-hero-grid", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".page-hero-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".page-hero-row", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.md",
});

selector(".page-hero-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	color: "@color.text-weak",
});

// Demo styling for placeholder image inside the Image slot
selector(".page-hero-demo-media", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: "@color.gray-200",
	color: "@color.gray-700",
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.medium",
	minHeight: "200px",
	width: "100%",
});

// Demo CTA button styling for stories (real apps would use the Button recipe)
selector(".page-hero-demo-cta", {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	paddingTop: "calc(@spacing * 0.5)",
	paddingBottom: "calc(@spacing * 0.5)",
	paddingLeft: "calc(@spacing * 1)",
	paddingRight: "calc(@spacing * 1)",
	borderRadius: "@border-radius.md",
	background: "@color.primary",
	color: "@color.white",
	fontWeight: "@font-weight.medium",
	fontSize: "@font-size.sm",
	textDecoration: "none",
	cursor: "pointer",
});

selector(".page-hero-demo-cta-secondary", {
	background: "transparent",
	color: "inherit",
	borderWidth: "@border-width.thin",
	borderStyle: "@border-style.solid",
	borderColor: "currentColor",
});

selector(".page-hero-demo-link", {
	color: "inherit",
	textDecoration: "none",
	fontWeight: "@font-weight.medium",
});

export default s;
