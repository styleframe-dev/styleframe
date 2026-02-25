import { styleframe } from "styleframe";
import {
	useDesignTokensPreset,
	useModifiersPreset,
	useUtilitiesPreset,
} from "@styleframe/theme";

const s = styleframe();

useDesignTokensPreset(s);
useUtilitiesPreset(s);
useModifiersPreset(s);

export default s;
