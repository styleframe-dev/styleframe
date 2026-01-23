import {
	useFontFamily,
	useFontSize,
	useLineHeight,
	useColor,
	useUtilitiesPreset,
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

// Register all utilities and generate utility classes
const {
	createFontFamilyUtility,
	createFontSizeUtility,
	createLineHeightUtility,
	createTextColorUtility,
	createBackgroundColorUtility,
} = useUtilitiesPreset(s);

createFontFamilyUtility({
	base: s.ref(fontFamilyBase),
});

createFontSizeUtility({
	md: s.ref(fontSizeMd),
});

createLineHeightUtility({
	normal: s.ref(lineHeightNormal),
});

createTextColorUtility({
	text: s.ref(colorText),
});

createBackgroundColorUtility({
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
