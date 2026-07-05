import {
	useCalloutContentRecipe,
	useCalloutDismissRecipe,
	useCalloutIconRecipe,
	useCalloutRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();

export const callout = useCalloutRecipe(s);
export const calloutIcon = useCalloutIconRecipe(s);
export const calloutContent = useCalloutContentRecipe(s);
export const calloutDismiss = useCalloutDismissRecipe(s);

export default s;
