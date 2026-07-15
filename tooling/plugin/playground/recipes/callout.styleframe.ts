import {
	useCalloutContentRecipe,
	useCalloutDescriptionRecipe,
	useCalloutDismissRecipe,
	useCalloutIconRecipe,
	useCalloutRecipe,
	useCalloutTitleRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();

export const callout = useCalloutRecipe(s);
export const calloutIcon = useCalloutIconRecipe(s);
export const calloutContent = useCalloutContentRecipe(s);
export const calloutTitle = useCalloutTitleRecipe(s);
export const calloutDescription = useCalloutDescriptionRecipe(s);
export const calloutDismiss = useCalloutDismissRecipe(s);

export default s;
