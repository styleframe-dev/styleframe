import { styleframe } from "styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

const { colors } = useDesignTokensPreset(s);
const { colorPrimary, colorSecondary } = colors;

useUtilitiesPreset(s);

// Selector for existing test
s.selector(".h1", {
	color: s.ref(colorPrimary),
	background: s.ref(colorSecondary),
});

export default s;
