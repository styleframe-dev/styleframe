import { styleframe } from "virtual:styleframe";
import {
	useTabRecipe,
	useTabListRecipe,
	useSplitPaneRecipe,
	useSplitPanePaneRecipe,
	useSplitPaneDividerRecipe,
	useEditorShellRecipe,
	useEditorSurfaceRecipe,
	useErrorBannerRecipe,
	useErrorBannerMessageRecipe,
	useErrorBannerCloseRecipe,
	useToolbarRecipe,
	useToolbarTitleRecipe,
	useToolbarSubtitleRecipe,
} from "./index";

const s = styleframe();

export const pgTab = useTabRecipe(s);
export const pgTabList = useTabListRecipe(s);
export const pgSplitPane = useSplitPaneRecipe(s);
export const pgSplitPanePane = useSplitPanePaneRecipe(s);
export const pgSplitPaneDivider = useSplitPaneDividerRecipe(s);
export const pgEditorShell = useEditorShellRecipe(s);
export const pgEditorSurface = useEditorSurfaceRecipe(s);
export const pgErrorBanner = useErrorBannerRecipe(s);
export const pgErrorBannerMessage = useErrorBannerMessageRecipe(s);
export const pgErrorBannerClose = useErrorBannerCloseRecipe(s);
export const pgToolbar = useToolbarRecipe(s);
export const pgToolbarTitle = useToolbarTitleRecipe(s);
export const pgToolbarSubtitle = useToolbarSubtitleRecipe(s);

export default s;
