import {
	useDesignTokensPreset,
	useModifiersPreset,
	useUtilitiesPreset,
} from "@styleframe/theme";
import { styleframe } from "styleframe";
import { useGlobalStyles } from "./src/theme";

const s = styleframe();

useDesignTokensPreset(s);
useUtilitiesPreset(s);
useModifiersPreset(s);

useGlobalStyles(s);

export default s;
