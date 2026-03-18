import { createUseVariable } from "../utils";
import { zIndexValues } from "../values";
/**
 * Create a set of z-index variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useZIndex } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   zIndex, // Variable<'z-index'>
 *   zIndexDropdown, // Variable<'z-index.dropdown'>
 *   zIndexModal, // Variable<'z-index.modal'>
 *   zIndexToast, // Variable<'z-index.toast'>
 * } = useZIndex(s, {
 *   default: '@base',
 *   dropdown: '100',
 *   modal: '400',
 *   toast: '600',
 * });
 * ```
 */
export const useZIndex = createUseVariable("z-index", {
	defaults: zIndexValues,
});
