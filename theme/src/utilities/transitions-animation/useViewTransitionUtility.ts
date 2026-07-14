import { createUseUtility } from "../../utils";

/**
 * Create view-transition-name utility classes.
 *
 * Escape-hatch tier: a thin property utility for the stable
 * `view-transition-name` declaration, tagging an element so the View
 * Transitions API can animate it independently across a transition. Names are
 * project-defined, so this utility ships without defaults. The still-moving
 * parts — the `::view-transition-*` pseudo-elements and the cross-document
 * `@view-transition` rule — stay on the raw `atRule` hatch until they reach
 * Baseline.
 */
export const useViewTransitionNameUtility = createUseUtility(
	"view-transition-name",
	({ value }) => ({
		viewTransitionName: value,
	}),
);
