import { styleframe } from "styleframe";
import { useDesignTokensPreset, useUtilitiesPreset } from "@styleframe/theme";

const s = styleframe();

useDesignTokensPreset(s);
useUtilitiesPreset(s);

export default s;
