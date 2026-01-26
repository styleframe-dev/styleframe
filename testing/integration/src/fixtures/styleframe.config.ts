import { styleframe } from "styleframe";

const s = styleframe();

// Variables for selectors
const colorPrimary = s.variable("color--primary", "blue");
const colorSecondary = s.variable("color--secondary", "pink");

// Selector for existing test
s.selector(".h1", {
	color: s.ref(colorPrimary),
	background: s.ref(colorSecondary),
});

// Variables for utilities
const spacingSm = s.variable("spacing.sm", "8px");
const spacingMd = s.variable("spacing.md", "16px");
const utilityColorPrimary = s.variable(
	"utility.color.primary",
	"rgb(0, 102, 255)",
);
const utilityColorSecondary = s.variable(
	"utility.color.secondary",
	"rgb(255, 100, 100)",
);

// Create utilities
const createMargin = s.utility("margin", ({ value }) => ({ margin: value }));
const createPadding = s.utility("padding", ({ value }) => ({ padding: value }));
const createBg = s.utility("bg", ({ value }) => ({ backgroundColor: value }));
const createText = s.utility("text", ({ value }) => ({ color: value }));

// Generate utility classes
createMargin({ sm: s.ref(spacingSm), md: s.ref(spacingMd) });
createPadding({ sm: s.ref(spacingSm), md: s.ref(spacingMd) });
createBg({
	primary: s.ref(utilityColorPrimary),
	secondary: s.ref(utilityColorSecondary),
});
createText({
	primary: s.ref(utilityColorPrimary),
	secondary: s.ref(utilityColorSecondary),
});

export default s;
