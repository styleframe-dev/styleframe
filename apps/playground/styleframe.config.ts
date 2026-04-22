import {
	useDesignTokensPreset,
	useGlobalPreset,
	useModifiersPreset,
	useSanitizePreset,
	useUtilitiesPreset,
} from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

useDesignTokensPreset(s);
useSanitizePreset(s);
useGlobalPreset(s);
useUtilitiesPreset(s);
useModifiersPreset(s);

const { selector } = s;

selector("html, body, #app", {
	height: "100%",
	margin: "0",
});

selector("#app", {
	display: "flex",
	flexDirection: "column",
	background: "@color.white",
	color: "@color.gray-900",
});

selector("#app:is(.dark-theme, [data-theme='dark'])", {
	background: "@color.gray-950",
	color: "@color.white",
});

export default s;
