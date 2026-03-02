import {
	useDesignTokensPreset,
	useModifiersPreset,
	useUtilitiesPreset,
} from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

useDesignTokensPreset(s);
useUtilitiesPreset(s);
useModifiersPreset(s);

export default s;
