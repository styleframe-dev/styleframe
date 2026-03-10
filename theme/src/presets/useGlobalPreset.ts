import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";
import {
	type BodyElementConfig,
	type BodyElementResult,
	type CaptionElementConfig,
	type CaptionElementResult,
	type CodeElementConfig,
	type FocusElementConfig,
	type FocusElementResult,
	type HeadingElementConfig,
	type HeadingElementResult,
	type HrElementConfig,
	type HrElementResult,
	type KbdElementConfig,
	type KbdElementResult,
	type LinkElementConfig,
	type LinkElementResult,
	type MarkElementConfig,
	type MarkElementResult,
	type PreElementConfig,
	type SelectionElementConfig,
	type SelectionElementResult,
	useAbbrElement,
	useAddressElement,
	useBodyElement,
	useCaptionElement,
	useCodeElement,
	useDlElement,
	useFocusElement,
	useHeadingElement,
	useHrElement,
	useIframeElement,
	useImgElement,
	useKbdElement,
	useLegendElement,
	useLinkElement,
	useMarkElement,
	useOlElement,
	useOutputElement,
	useParagraphElement,
	usePreElement,
	useSampElement,
	useSelectionElement,
	useSummaryElement,
	useUlElement,
} from "../elements";

// Re-export element defaults for backward compatibility
export {
	defaultBodyValues,
	defaultHeadingValues as defaultHeadingsValues,
	defaultHeadingSizeRefs,
	defaultLinkValues as defaultLinksValues,
	defaultCodeValues,
	defaultSelectionValues,
	defaultFocusValues,
} from "../elements";

// =============================================================================
// Configuration Types
// =============================================================================

export type GlobalBodyConfig = BodyElementConfig;
export type GlobalHeadingsConfig = HeadingElementConfig;
export type GlobalLinksConfig = LinkElementConfig;
export type GlobalCodeConfig = CodeElementConfig;
export type GlobalSelectionConfig = SelectionElementConfig;
export type GlobalFocusConfig = FocusElementConfig;

export interface GlobalThemeOverrides {
	body?: Pick<BodyElementConfig, "color" | "background">;
	heading?: Pick<HeadingElementConfig, "color">;
	link?: Pick<LinkElementConfig, "color" | "hoverColor">;
	selection?: SelectionElementConfig;
	focus?: Pick<FocusElementConfig, "outlineColor">;
	hr?: Pick<HrElementConfig, "borderColor">;
	kbd?: Pick<KbdElementConfig, "background" | "color">;
	mark?: Pick<MarkElementConfig, "background" | "color">;
	caption?: Pick<CaptionElementConfig, "color">;
}

export interface GlobalPresetConfig {
	body?: BodyElementConfig | false;
	heading?: HeadingElementConfig | false;
	link?: LinkElementConfig | false;
	code?: CodeElementConfig | false;
	selection?: SelectionElementConfig | false;
	focus?: FocusElementConfig | false;
	hr?: HrElementConfig | false;
	kbd?: KbdElementConfig | false;
	mark?: MarkElementConfig | false;
	caption?: CaptionElementConfig | false;
	pre?: PreElementConfig | false;
	abbr?: boolean;
	address?: boolean;
	samp?: boolean;
	dl?: boolean;
	ol?: boolean;
	ul?: boolean;
	paragraph?: boolean;
	img?: boolean;
	iframe?: boolean;
	output?: boolean;
	legend?: boolean;
	summary?: boolean;
	themes?: Record<string, GlobalThemeOverrides>;
}

// =============================================================================
// Result Type
// =============================================================================

export interface GlobalPresetResult {
	body?: BodyElementResult;
	heading?: HeadingElementResult;
	link?: LinkElementResult;
	selection?: SelectionElementResult;
	focus?: FocusElementResult;
	hr?: HrElementResult;
	kbd?: KbdElementResult;
	mark?: MarkElementResult;
	caption?: CaptionElementResult;
}

// =============================================================================
// Main Preset Function
// =============================================================================

export function useGlobalPreset(
	s: Styleframe,
	config: GlobalPresetConfig = {},
): GlobalPresetResult {
	const result: GlobalPresetResult = {};

	// ── Elements with variables ──
	if (config.body !== false) {
		result.body = useBodyElement(
			s,
			config.body === undefined ? {} : config.body,
		);
	}

	if (config.heading !== false) {
		result.heading = useHeadingElement(
			s,
			config.heading === undefined ? {} : config.heading,
		);
	}

	if (config.link !== false) {
		result.link = useLinkElement(
			s,
			config.link === undefined ? {} : config.link,
		);
	}

	if (config.code !== false) {
		useCodeElement(s, config.code === undefined ? {} : config.code);
	}

	if (config.selection !== false) {
		result.selection = useSelectionElement(
			s,
			config.selection === undefined ? {} : config.selection,
		);
	}

	if (config.focus !== false) {
		result.focus = useFocusElement(
			s,
			config.focus === undefined ? {} : config.focus,
		);
	}

	if (config.hr !== false) {
		result.hr = useHrElement(s, config.hr === undefined ? {} : config.hr);
	}

	if (config.kbd !== false) {
		result.kbd = useKbdElement(s, config.kbd === undefined ? {} : config.kbd);
	}

	if (config.mark !== false) {
		result.mark = useMarkElement(
			s,
			config.mark === undefined ? {} : config.mark,
		);
	}

	if (config.caption !== false) {
		result.caption = useCaptionElement(
			s,
			config.caption === undefined ? {} : config.caption,
		);
	}

	if (config.pre !== false) {
		usePreElement(s, config.pre === undefined ? {} : config.pre);
	}

	// ── Elements without variables ──
	if (config.abbr !== false) useAbbrElement(s);
	if (config.address !== false) useAddressElement(s);
	if (config.samp !== false) useSampElement(s);
	if (config.dl !== false) useDlElement(s);
	if (config.ol !== false) useOlElement(s);
	if (config.ul !== false) useUlElement(s);
	if (config.paragraph !== false) useParagraphElement(s);
	if (config.img !== false) useImgElement(s);
	if (config.iframe !== false) useIframeElement(s);
	if (config.output !== false) useOutputElement(s);
	if (config.legend !== false) useLegendElement(s);
	if (config.summary !== false) useSummaryElement(s);

	// ── Themes ──
	if (config.themes) {
		for (const [themeName, overrides] of Object.entries(config.themes)) {
			s.theme(themeName, (ctx: DeclarationsCallbackContext) => {
				if (overrides.body && result.body) {
					if (overrides.body.color) {
						ctx.variable(result.body.bodyColor, overrides.body.color);
					}
					if (overrides.body.background) {
						ctx.variable(result.body.bodyBackground, overrides.body.background);
					}
				}

				if (overrides.heading?.color && result.heading) {
					ctx.variable(result.heading.headingColor, overrides.heading.color);
				}

				if (overrides.link && result.link) {
					if (overrides.link.color) {
						ctx.variable(result.link.linkColor, overrides.link.color);
					}
					if (overrides.link.hoverColor) {
						ctx.variable(result.link.linkHoverColor, overrides.link.hoverColor);
					}
				}

				if (overrides.selection && result.selection) {
					if (overrides.selection.background) {
						ctx.variable(
							result.selection.selectionBackground,
							overrides.selection.background,
						);
					}
					if (overrides.selection.color) {
						ctx.variable(
							result.selection.selectionColor,
							overrides.selection.color,
						);
					}
				}

				if (overrides.focus?.outlineColor && result.focus) {
					ctx.variable(
						result.focus.focusOutlineColor,
						overrides.focus.outlineColor,
					);
				}

				if (overrides.hr?.borderColor && result.hr) {
					ctx.variable(result.hr.hrBorderColor, overrides.hr.borderColor);
				}

				if (overrides.kbd && result.kbd) {
					if (overrides.kbd.background) {
						ctx.variable(result.kbd.kbdBackground, overrides.kbd.background);
					}
					if (overrides.kbd.color) {
						ctx.variable(result.kbd.kbdColor, overrides.kbd.color);
					}
				}

				if (overrides.mark && result.mark) {
					if (overrides.mark.background) {
						ctx.variable(result.mark.markBackground, overrides.mark.background);
					}
					if (overrides.mark.color) {
						ctx.variable(result.mark.markColor, overrides.mark.color);
					}
				}

				if (overrides.caption?.color && result.caption) {
					ctx.variable(result.caption.captionColor, overrides.caption.color);
				}
			});
		}
	}

	return result;
}
