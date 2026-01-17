import {
	useFontFamily,
	useFontSize,
	useLineHeight,
	useColor,
} from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// Base typography variables
const { fontFamilyBase } = useFontFamily(s);
const { fontSizeMd } = useFontSize(s, {
	md: "1rem",
});
const { lineHeightNormal } = useLineHeight(s);
const { colorText, colorBackground } = useColor(s, {
	text: "#1e293b",
	background: "#ffffff",
});

// Create font-family utility
const createFontFamily = s.utility("font-family", ({ value }) => ({
	fontFamily: value,
}));

createFontFamily({
	base: s.ref(fontFamilyBase),
});

// Create font-size utility
const createFontSize = s.utility("font-size", ({ value }) => ({
	fontSize: value,
}));

createFontSize({
	md: s.ref(fontSizeMd),
});

// Create line-height utility
const createLineHeight = s.utility("line-height", ({ value }) => ({
	lineHeight: value,
}));

createLineHeight({
	normal: s.ref(lineHeightNormal),
});

// Create color utility
const createColor = s.utility("color", ({ value }) => ({
	color: value,
}));

createColor({
	text: s.ref(colorText),
});

// Create background utility
const createBackground = s.utility("background", ({ value }) => ({
	background: value,
}));

createBackground({
	base: s.ref(colorBackground),
});

// Global body styles
s.selector("body", {
	fontFamily: s.ref(fontFamilyBase),
	fontSize: s.ref(fontSizeMd),
	lineHeight: s.ref(lineHeightNormal),
	color: s.ref(colorText),
	background: s.ref(colorBackground),
	margin: 0,
	padding: 0,
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
});

// Reset box-sizing
s.selector("*, *::before, *::after", {
	boxSizing: "border-box",
});

export default s;
