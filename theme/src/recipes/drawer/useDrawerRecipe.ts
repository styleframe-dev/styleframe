import {
	type RecipeConfig,
	createUseRecipe,
} from "../../utils/createUseRecipe";
import { overlaySurfaceCompoundVariants } from "../modal/createOverlayRecipes";

/** Panel thickness per size — the variable dimension of the drawer. */
const sideSizes = { sm: "16rem", md: "20rem", lg: "28rem" } as const;

/**
 * `side × size` compound variants set the panel's variable dimension: width for
 * the horizontal sides (left/right), height for the vertical sides (top/bottom).
 * Generated rather than hand-written to keep the 12 entries DRY.
 */
const sideSizeCompoundVariants: NonNullable<RecipeConfig["compoundVariants"]> =
	[
		...(["left", "right"] as const).flatMap((side) =>
			Object.entries(sideSizes).map(([size, value]) => ({
				match: { side, size },
				css: { width: value },
			})),
		),
		...(["top", "bottom"] as const).flatMap((side) =>
			Object.entries(sideSizes).map(([size, value]) => ({
				match: { side, size },
				css: { height: value },
			})),
		),
	];

/**
 * Drawer container recipe — an edge-anchored, slide-out overlay panel
 * (a Modal anchored to a screen edge). Supports color (light, dark, neutral),
 * variant, size, and `side` (top, right, bottom, left) axes.
 *
 * Positioning: the panel is `position: fixed` and anchors to one edge. Each
 * `side` pins the panel to that edge, caps its cross-axis at the viewport, and
 * raises the single border edge that faces the content; the shared surface
 * compounds then paint that edge. `size` combines with `side` to set the
 * panel's variable dimension (width for left/right, height for top/bottom).
 *
 * The recipe is static: the consumer owns the open/close slide transition,
 * focus trap, and `Esc` handling — exactly like the Modal recipe.
 */
export const useDrawerRecipe = createUseRecipe("drawer", {
	base: {
		position: "fixed",
		zIndex: "1000",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		boxShadow: "@box-shadow.lg",
		lineHeight: "@line-height.normal",
		borderStyle: "@border-style.solid",
		borderColor: "transparent",
		borderWidth: "0",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			soft: {},
			subtle: {},
		},
		size: {
			sm: {},
			md: {},
			lg: {},
		},
		side: {
			left: {
				top: "0",
				bottom: "0",
				left: "0",
				maxWidth: "100vw",
				borderRightWidth: "@border-width.thin",
			},
			right: {
				top: "0",
				bottom: "0",
				right: "0",
				maxWidth: "100vw",
				borderLeftWidth: "@border-width.thin",
			},
			top: {
				top: "0",
				left: "0",
				right: "0",
				maxHeight: "100vh",
				borderBottomWidth: "@border-width.thin",
			},
			bottom: {
				bottom: "0",
				left: "0",
				right: "0",
				maxHeight: "100vh",
				borderTopWidth: "@border-width.thin",
			},
		},
	},
	compoundVariants: [
		...overlaySurfaceCompoundVariants,
		...sideSizeCompoundVariants,
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
		side: "right",
	},
});
