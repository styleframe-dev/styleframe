import { useButtonRecipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";
import {
	useBrandBadgeRecipe,
	useBrandLogotypeRecipe,
	useBrandMarkRecipe,
	useBrowserActionRecipe,
	useBrowserActionsRecipe,
	useBrowserChromeRecipe,
	useBrowserDotRecipe,
	useBrowserDotsRecipe,
	useBrowserUrlRecipe,
	useBrowserUrlTextRecipe,
	useBrowserViewportFrameRecipe,
	useBrowserViewportRecipe,
	useEditorShellRecipe,
	useEditorSurfaceRecipe,
	useErrorBannerCloseRecipe,
	useErrorBannerMessageRecipe,
	useErrorBannerRecipe,
	useFileTabDotRecipe,
	useFileTabListRecipe,
	useFileTabRecipe,
	useHmrDotRecipe,
	useHmrIndicatorRecipe,
	useSplitPaneDividerRecipe,
	useSplitPanePaneRecipe,
	useSplitPaneRecipe,
	useStatusBarDotRecipe,
	useStatusBarGroupRecipe,
	useStatusBarItemRecipe,
	useStatusBarRecipe,
	useTabListRecipe,
	useTabRecipe,
	useThemeToggleRecipe,
	useToolbarRecipe,
	useToolbarSectionRecipe,
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
export const pgToolbarSection = useToolbarSectionRecipe(s);
export const pgThemeToggle = useThemeToggleRecipe(s);
export const button = useButtonRecipe(s);

export const pgBrandMark = useBrandMarkRecipe(s);
export const pgBrandLogotype = useBrandLogotypeRecipe(s);
export const pgBrandBadge = useBrandBadgeRecipe(s);

export const pgFileTabList = useFileTabListRecipe(s);
export const pgFileTab = useFileTabRecipe(s);
export const pgFileTabDot = useFileTabDotRecipe(s);

export const pgBrowserChrome = useBrowserChromeRecipe(s);
export const pgBrowserDots = useBrowserDotsRecipe(s);
export const pgBrowserDot = useBrowserDotRecipe(s);
export const pgBrowserUrl = useBrowserUrlRecipe(s);
export const pgBrowserUrlText = useBrowserUrlTextRecipe(s);
export const pgBrowserActions = useBrowserActionsRecipe(s);
export const pgBrowserAction = useBrowserActionRecipe(s);
export const pgBrowserViewport = useBrowserViewportRecipe(s);
export const pgBrowserViewportFrame = useBrowserViewportFrameRecipe(s);
export const pgHmrIndicator = useHmrIndicatorRecipe(s);
export const pgHmrDot = useHmrDotRecipe(s);

export const pgStatusBar = useStatusBarRecipe(s);
export const pgStatusBarGroup = useStatusBarGroupRecipe(s);
export const pgStatusBarItem = useStatusBarItemRecipe(s);
export const pgStatusBarDot = useStatusBarDotRecipe(s);

export default s;
