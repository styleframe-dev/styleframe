import { createMenuPanelRecipe } from "../dropdown/createMenuRecipe";

/**
 * Context menu panel recipe for the floating surface opened on right-click.
 * Shares the Dropdown/Select menu surface: a flex-column panel with elevation
 * and the 9 color×variant background combinations. Supports color (light, dark,
 * neutral), variant (solid, soft, subtle), and size axes.
 *
 * Built on the shared menu-surface builder (see `../dropdown/createMenuRecipe.ts`).
 */
export const useContextMenuRecipe = createMenuPanelRecipe("context-menu");
