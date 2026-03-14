import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";
import {
	type AbbrElementConfig,
	type AbbrElementResult,
	type AddressElementConfig,
	type AddressElementResult,
	type BodyElementConfig,
	type BodyElementResult,
	type CaptionElementConfig,
	type CaptionElementResult,
	type CodeElementConfig,
	type CodeElementResult,
	type DdElementConfig,
	type DdElementResult,
	type DlElementConfig,
	type DlElementResult,
	type DtElementConfig,
	type DtElementResult,
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
	type OlElementConfig,
	type OlElementResult,
	type ParagraphElementConfig,
	type ParagraphElementResult,
	type PreElementConfig,
	type PreElementResult,
	type SampElementConfig,
	type SampElementResult,
	type UlElementConfig,
	type UlElementResult,
	useAbbrElement,
	useAddressElement,
	useBodyElement,
	useCaptionElement,
	useCodeElement,
	useDdElement,
	useDlElement,
	useDtElement,
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
	useSummaryElement,
	useUlElement,
} from "../elements";
import {
	type FocusStateConfig,
	type FocusStateResult,
	type SelectionStateConfig,
	type SelectionStateResult,
	useFocusState,
	useSelectionState,
} from "../states";

// Re-export element defaults for backward compatibility
export {
	defaultAbbrValues,
	defaultAddressValues,
	defaultBodyValues,
	defaultCodeValues,
	defaultDdValues,
	defaultDlValues,
	defaultDtValues,
	defaultHeadingSizeRefs,
	defaultHeadingValues as defaultHeadingsValues,
	defaultLinkValues as defaultLinksValues,
	defaultOlValues,
	defaultParagraphValues,
	defaultPreValues,
	defaultSampValues,
	defaultUlValues,
} from "../elements";

// Re-export state defaults
export {
	defaultFocusValues,
	defaultSelectionValues,
} from "../states";

// =============================================================================
// Configuration Types
// =============================================================================

export type GlobalAddressConfig = AddressElementConfig;
export type GlobalBodyConfig = BodyElementConfig;
export type GlobalHeadingsConfig = HeadingElementConfig;
export type GlobalLinksConfig = LinkElementConfig;
export type GlobalCodeConfig = CodeElementConfig;
export type GlobalSelectionConfig = SelectionStateConfig;
export type GlobalFocusConfig = FocusStateConfig;
export type GlobalDlConfig = DlElementConfig;
export type GlobalDtConfig = DtElementConfig;
export type GlobalDdConfig = DdElementConfig;

export interface GlobalThemeOverrides {
	address?: Pick<AddressElementConfig, "marginBottom">;
	body?: Pick<
		BodyElementConfig,
		"color" | "background" | "fontFamily" | "fontSize" | "lineHeight"
	>;
	heading?: Pick<
		HeadingElementConfig,
		"color" | "fontFamily" | "fontWeight" | "lineHeight" | "sizes"
	>;
	link?: Pick<
		LinkElementConfig,
		"color" | "textDecoration" | "hoverColor" | "hoverTextDecoration"
	>;
	selection?: SelectionStateConfig;
	focus?: FocusStateConfig;
	hr?: HrElementConfig;
	kbd?: KbdElementConfig;
	mark?: MarkElementConfig;
	caption?: CaptionElementConfig;
	dl?: Pick<DlElementConfig, "marginBottom">;
	dt?: Pick<DtElementConfig, "fontWeight">;
	dd?: Pick<DdElementConfig, "marginBottom">;
	abbr?: Pick<AbbrElementConfig, "cursor" | "textDecoration">;
	samp?: Pick<SampElementConfig, "fontFamily">;
	paragraph?: Pick<ParagraphElementConfig, "marginBottom">;
	ol?: Pick<OlElementConfig, "marginBottom">;
	ul?: Pick<UlElementConfig, "marginBottom">;
	code?: Pick<CodeElementConfig, "fontFamily" | "fontSize">;
	pre?: Pick<PreElementConfig, "fontFamily" | "fontSize" | "marginBottom">;
}

export interface GlobalPresetConfig {
	address?: AddressElementConfig | false;
	body?: BodyElementConfig | false;
	heading?: HeadingElementConfig | false;
	link?: LinkElementConfig | false;
	code?: CodeElementConfig | false;
	selection?: SelectionStateConfig | false;
	focus?: FocusStateConfig | false;
	hr?: HrElementConfig | false;
	kbd?: KbdElementConfig | false;
	mark?: MarkElementConfig | false;
	caption?: CaptionElementConfig | false;
	pre?: PreElementConfig | false;
	dl?: DlElementConfig | false;
	dt?: DtElementConfig | false;
	dd?: DdElementConfig | false;
	abbr?: AbbrElementConfig | false;
	samp?: SampElementConfig | false;
	ol?: OlElementConfig | false;
	ul?: UlElementConfig | false;
	paragraph?: ParagraphElementConfig | false;
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
	abbr?: AbbrElementResult;
	address?: AddressElementResult;
	body?: BodyElementResult;
	heading?: HeadingElementResult;
	link?: LinkElementResult;
	code?: CodeElementResult;
	selection?: SelectionStateResult;
	focus?: FocusStateResult;
	hr?: HrElementResult;
	kbd?: KbdElementResult;
	mark?: MarkElementResult;
	caption?: CaptionElementResult;
	dl?: DlElementResult;
	dt?: DtElementResult;
	dd?: DdElementResult;
	samp?: SampElementResult;
	paragraph?: ParagraphElementResult;
	ol?: OlElementResult;
	ul?: UlElementResult;
	pre?: PreElementResult;
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
	if (config.address !== false) {
		result.address = useAddressElement(
			s,
			config.address === undefined ? {} : config.address,
		);
	}

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
		result.code = useCodeElement(
			s,
			config.code === undefined ? {} : config.code,
		);
	}

	if (config.selection !== false) {
		result.selection = useSelectionState(
			s,
			config.selection === undefined ? {} : config.selection,
		);
	}

	if (config.focus !== false) {
		result.focus = useFocusState(
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
		result.pre = usePreElement(s, config.pre === undefined ? {} : config.pre);
	}

	if (config.dl !== false) {
		result.dl = useDlElement(s, config.dl === undefined ? {} : config.dl);
	}

	if (config.dt !== false) {
		result.dt = useDtElement(s, config.dt === undefined ? {} : config.dt);
	}

	if (config.dd !== false) {
		result.dd = useDdElement(s, config.dd === undefined ? {} : config.dd);
	}

	if (config.abbr !== false) {
		result.abbr = useAbbrElement(
			s,
			config.abbr === undefined ? {} : config.abbr,
		);
	}

	if (config.samp !== false) {
		result.samp = useSampElement(
			s,
			config.samp === undefined ? {} : config.samp,
		);
	}

	if (config.ol !== false) {
		result.ol = useOlElement(s, config.ol === undefined ? {} : config.ol);
	}

	if (config.ul !== false) {
		result.ul = useUlElement(s, config.ul === undefined ? {} : config.ul);
	}

	if (config.paragraph !== false) {
		result.paragraph = useParagraphElement(
			s,
			config.paragraph === undefined ? {} : config.paragraph,
		);
	}

	// ── Elements without variables ──
	if (config.img !== false) useImgElement(s);
	if (config.iframe !== false) useIframeElement(s);
	if (config.output !== false) useOutputElement(s);
	if (config.legend !== false) useLegendElement(s);
	if (config.summary !== false) useSummaryElement(s);

	// ── Themes ──
	if (config.themes) {
		for (const [themeName, overrides] of Object.entries(config.themes)) {
			s.theme(themeName, (ctx: DeclarationsCallbackContext) => {
				if (overrides.address?.marginBottom && result.address) {
					ctx.variable(
						result.address.addressMarginBottom,
						overrides.address.marginBottom,
					);
				}

				if (overrides.body && result.body) {
					if (overrides.body.color) {
						ctx.variable(result.body.bodyColor, overrides.body.color);
					}
					if (overrides.body.background) {
						ctx.variable(result.body.bodyBackground, overrides.body.background);
					}
					if (overrides.body.fontFamily) {
						ctx.variable(result.body.bodyFontFamily, overrides.body.fontFamily);
					}
					if (overrides.body.fontSize) {
						ctx.variable(result.body.bodyFontSize, overrides.body.fontSize);
					}
					if (overrides.body.lineHeight) {
						ctx.variable(result.body.bodyLineHeight, overrides.body.lineHeight);
					}
				}

				if (overrides.heading && result.heading) {
					if (overrides.heading.color) {
						ctx.variable(result.heading.headingColor, overrides.heading.color);
					}
					if (overrides.heading.fontFamily) {
						ctx.variable(
							result.heading.headingFontFamily,
							overrides.heading.fontFamily,
						);
					}
					if (overrides.heading.fontWeight) {
						ctx.variable(
							result.heading.headingFontWeight,
							overrides.heading.fontWeight,
						);
					}
					if (overrides.heading.lineHeight) {
						ctx.variable(
							result.heading.headingLineHeight,
							overrides.heading.lineHeight,
						);
					}
					if (overrides.heading.sizes) {
						const sizeMap = {
							h1: result.heading.headingH1FontSize,
							h2: result.heading.headingH2FontSize,
							h3: result.heading.headingH3FontSize,
							h4: result.heading.headingH4FontSize,
							h5: result.heading.headingH5FontSize,
							h6: result.heading.headingH6FontSize,
						} as const;
						for (const [tag, value] of Object.entries(
							overrides.heading.sizes,
						)) {
							if (value) {
								ctx.variable(sizeMap[tag as keyof typeof sizeMap], value);
							}
						}
					}
				}

				if (overrides.link && result.link) {
					if (overrides.link.color) {
						ctx.variable(result.link.linkColor, overrides.link.color);
					}
					if (overrides.link.textDecoration) {
						ctx.variable(
							result.link.linkTextDecoration,
							overrides.link.textDecoration,
						);
					}
					if (overrides.link.hoverColor) {
						ctx.variable(result.link.linkHoverColor, overrides.link.hoverColor);
					}
					if (overrides.link.hoverTextDecoration) {
						ctx.variable(
							result.link.linkHoverTextDecoration,
							overrides.link.hoverTextDecoration,
						);
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

				if (overrides.focus && result.focus) {
					if (overrides.focus.outlineColor) {
						ctx.variable(
							result.focus.focusOutlineColor,
							overrides.focus.outlineColor,
						);
					}
					if (overrides.focus.outlineWidth) {
						ctx.variable(
							result.focus.focusOutlineWidth,
							overrides.focus.outlineWidth,
						);
					}
					if (overrides.focus.outlineStyle) {
						ctx.variable(
							result.focus.focusOutlineStyle,
							overrides.focus.outlineStyle,
						);
					}
					if (overrides.focus.outlineOffset) {
						ctx.variable(
							result.focus.focusOutlineOffset,
							overrides.focus.outlineOffset,
						);
					}
				}

				if (overrides.hr && result.hr) {
					if (overrides.hr.borderColor) {
						ctx.variable(result.hr.hrBorderColor, overrides.hr.borderColor);
					}
					if (overrides.hr.borderWidth) {
						ctx.variable(result.hr.hrBorderWidth, overrides.hr.borderWidth);
					}
					if (overrides.hr.borderStyle) {
						ctx.variable(result.hr.hrBorderStyle, overrides.hr.borderStyle);
					}
					if (overrides.hr.margin) {
						ctx.variable(result.hr.hrMargin, overrides.hr.margin);
					}
				}

				if (overrides.kbd && result.kbd) {
					if (overrides.kbd.background) {
						ctx.variable(result.kbd.kbdBackground, overrides.kbd.background);
					}
					if (overrides.kbd.color) {
						ctx.variable(result.kbd.kbdColor, overrides.kbd.color);
					}
					if (overrides.kbd.fontFamily) {
						ctx.variable(result.kbd.kbdFontFamily, overrides.kbd.fontFamily);
					}
					if (overrides.kbd.fontSize) {
						ctx.variable(result.kbd.kbdFontSize, overrides.kbd.fontSize);
					}
					if (overrides.kbd.borderRadius) {
						ctx.variable(
							result.kbd.kbdBorderRadius,
							overrides.kbd.borderRadius,
						);
					}
					if (overrides.kbd.paddingBlock) {
						ctx.variable(
							result.kbd.kbdPaddingBlock,
							overrides.kbd.paddingBlock,
						);
					}
					if (overrides.kbd.paddingInline) {
						ctx.variable(
							result.kbd.kbdPaddingInline,
							overrides.kbd.paddingInline,
						);
					}
				}

				if (overrides.mark && result.mark) {
					if (overrides.mark.background) {
						ctx.variable(result.mark.markBackground, overrides.mark.background);
					}
					if (overrides.mark.color) {
						ctx.variable(result.mark.markColor, overrides.mark.color);
					}
					if (overrides.mark.paddingTop) {
						ctx.variable(result.mark.markPaddingTop, overrides.mark.paddingTop);
					}
					if (overrides.mark.paddingRight) {
						ctx.variable(
							result.mark.markPaddingRight,
							overrides.mark.paddingRight,
						);
					}
					if (overrides.mark.paddingBottom) {
						ctx.variable(
							result.mark.markPaddingBottom,
							overrides.mark.paddingBottom,
						);
					}
					if (overrides.mark.paddingLeft) {
						ctx.variable(
							result.mark.markPaddingLeft,
							overrides.mark.paddingLeft,
						);
					}
				}

				if (overrides.caption && result.caption) {
					if (overrides.caption.color) {
						ctx.variable(result.caption.captionColor, overrides.caption.color);
					}
					if (overrides.caption.paddingTop) {
						ctx.variable(
							result.caption.captionPaddingTop,
							overrides.caption.paddingTop,
						);
					}
					if (overrides.caption.paddingRight) {
						ctx.variable(
							result.caption.captionPaddingRight,
							overrides.caption.paddingRight,
						);
					}
					if (overrides.caption.paddingBottom) {
						ctx.variable(
							result.caption.captionPaddingBottom,
							overrides.caption.paddingBottom,
						);
					}
					if (overrides.caption.paddingLeft) {
						ctx.variable(
							result.caption.captionPaddingLeft,
							overrides.caption.paddingLeft,
						);
					}
					if (overrides.caption.textAlign) {
						ctx.variable(
							result.caption.captionTextAlign,
							overrides.caption.textAlign,
						);
					}
				}

				if (overrides.dl?.marginBottom && result.dl) {
					ctx.variable(result.dl.dlMarginBottom, overrides.dl.marginBottom);
				}

				if (overrides.dt?.fontWeight && result.dt) {
					ctx.variable(result.dt.dtFontWeight, overrides.dt.fontWeight);
				}

				if (overrides.dd?.marginBottom && result.dd) {
					ctx.variable(result.dd.ddMarginBottom, overrides.dd.marginBottom);
				}

				if (overrides.abbr && result.abbr) {
					if (overrides.abbr.cursor) {
						ctx.variable(result.abbr.abbrCursor, overrides.abbr.cursor);
					}
					if (overrides.abbr.textDecoration) {
						ctx.variable(
							result.abbr.abbrTextDecoration,
							overrides.abbr.textDecoration,
						);
					}
				}

				if (overrides.samp?.fontFamily && result.samp) {
					ctx.variable(result.samp.sampFontFamily, overrides.samp.fontFamily);
				}

				if (overrides.paragraph?.marginBottom && result.paragraph) {
					ctx.variable(
						result.paragraph.paragraphMarginBottom,
						overrides.paragraph.marginBottom,
					);
				}

				if (overrides.ol?.marginBottom && result.ol) {
					ctx.variable(result.ol.olMarginBottom, overrides.ol.marginBottom);
				}

				if (overrides.ul?.marginBottom && result.ul) {
					ctx.variable(result.ul.ulMarginBottom, overrides.ul.marginBottom);
				}

				if (overrides.code && result.code) {
					if (overrides.code.fontFamily) {
						ctx.variable(result.code.codeFontFamily, overrides.code.fontFamily);
					}
					if (overrides.code.fontSize) {
						ctx.variable(result.code.codeFontSize, overrides.code.fontSize);
					}
				}

				if (overrides.pre && result.pre) {
					if (overrides.pre.fontFamily) {
						ctx.variable(result.pre.preFontFamily, overrides.pre.fontFamily);
					}
					if (overrides.pre.fontSize) {
						ctx.variable(result.pre.preFontSize, overrides.pre.fontSize);
					}
					if (overrides.pre.marginBottom) {
						ctx.variable(
							result.pre.preMarginBottom,
							overrides.pre.marginBottom,
						);
					}
				}
			});
		}
	}

	return result;
}
