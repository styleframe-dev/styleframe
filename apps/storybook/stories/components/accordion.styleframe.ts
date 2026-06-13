import {
	useAccordionBodyRecipe,
	useAccordionContentRecipe,
	useAccordionItemRecipe,
	useAccordionRecipe,
	useAccordionTriggerRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize accordion recipes
export const accordion = useAccordionRecipe(s);
export const accordionItem = useAccordionItemRecipe(s);
export const accordionTrigger = useAccordionTriggerRecipe(s);
export const accordionContent = useAccordionContentRecipe(s);
export const accordionBody = useAccordionBodyRecipe(s);

// Reset the semantic heading that wraps each trigger button
selector(".accordion-header", {
	margin: "0",
});

// Container styles for story layout
selector(".accordion-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".accordion-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	alignItems: "flex-start",
});

selector(".accordion-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	marginBottom: "@spacing.xs",
});

selector(".accordion-demo", {
	width: "100%",
	maxWidth: "24rem",
});

export default s;
