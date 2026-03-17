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
	useAbbrDesignTokens,
	useAbbrElement,
	useAddressDesignTokens,
	useAddressElement,
	useBodyDesignTokens,
	useBodyElement,
	useCaptionDesignTokens,
	useCaptionElement,
	useCodeDesignTokens,
	useCodeElement,
	useDdDesignTokens,
	useDdElement,
	useDlDesignTokens,
	useDlElement,
	useDtDesignTokens,
	useDtElement,
	useHeadingDesignTokens,
	useHeadingElement,
	useHrDesignTokens,
	useHrElement,
	useIframeElement,
	useImgElement,
	useKbdDesignTokens,
	useKbdElement,
	useLegendElement,
	useLinkDesignTokens,
	useLinkElement,
	useMarkDesignTokens,
	useMarkElement,
	useOlDesignTokens,
	useOlElement,
	useOutputElement,
	useParagraphDesignTokens,
	useParagraphElement,
	usePreDesignTokens,
	usePreElement,
	useSampDesignTokens,
	useSampElement,
	useSummaryElement,
	useUlDesignTokens,
	useUlElement,
} from "../elements";
import {
	type FocusStateConfig,
	type FocusStateResult,
	type SelectionStateConfig,
	type SelectionStateResult,
	useFocusDesignTokens,
	useFocusState,
	useSelectionDesignTokens,
	useSelectionState,
} from "../states";

// Re-export element defaults
export {
	defaultAbbrConfig,
	defaultAddressConfig,
	defaultBodyConfig,
	defaultCodeConfig,
	defaultDdConfig,
	defaultDlConfig,
	defaultDtConfig,
	defaultHeadingSizeConfig,
	defaultHeadingConfig,
	defaultLinkConfig,
	defaultOlConfig,
	defaultParagraphConfig,
	defaultPreConfig,
	defaultSampConfig,
	defaultUlConfig,
} from "../elements";

// Re-export state defaults
export { defaultFocusConfig, defaultSelectionConfig } from "../states";

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
	address?: AddressElementConfig;
	body?: BodyElementConfig;
	heading?: HeadingElementConfig;
	link?: LinkElementConfig;
	selection?: SelectionStateConfig;
	focus?: FocusStateConfig;
	hr?: HrElementConfig;
	kbd?: KbdElementConfig;
	mark?: MarkElementConfig;
	caption?: CaptionElementConfig;
	dl?: DlElementConfig;
	dt?: DtElementConfig;
	dd?: DdElementConfig;
	abbr?: AbbrElementConfig;
	samp?: SampElementConfig;
	paragraph?: ParagraphElementConfig;
	ol?: OlElementConfig;
	ul?: UlElementConfig;
	code?: CodeElementConfig;
	pre?: PreElementConfig;
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
	config: GlobalPresetConfig = {
		themes: {
			dark: {
				body: {
					color: "#fff",
					background: "#000",
				},
			},
		},
	},
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
				if (overrides.address && result.address)
					useAddressDesignTokens(ctx, overrides.address);
				if (overrides.body && result.body)
					useBodyDesignTokens(ctx, overrides.body);
				if (overrides.heading && result.heading)
					useHeadingDesignTokens(ctx, overrides.heading);
				if (overrides.link && result.link)
					useLinkDesignTokens(ctx, overrides.link);
				if (overrides.code && result.code)
					useCodeDesignTokens(ctx, overrides.code);
				if (overrides.selection && result.selection)
					useSelectionDesignTokens(ctx, overrides.selection);
				if (overrides.focus && result.focus)
					useFocusDesignTokens(ctx, overrides.focus);
				if (overrides.hr && result.hr) useHrDesignTokens(ctx, overrides.hr);
				if (overrides.kbd && result.kbd) useKbdDesignTokens(ctx, overrides.kbd);
				if (overrides.mark && result.mark)
					useMarkDesignTokens(ctx, overrides.mark);
				if (overrides.caption && result.caption)
					useCaptionDesignTokens(ctx, overrides.caption);
				if (overrides.pre && result.pre) usePreDesignTokens(ctx, overrides.pre);
				if (overrides.dl && result.dl) useDlDesignTokens(ctx, overrides.dl);
				if (overrides.dt && result.dt) useDtDesignTokens(ctx, overrides.dt);
				if (overrides.dd && result.dd) useDdDesignTokens(ctx, overrides.dd);
				if (overrides.abbr && result.abbr)
					useAbbrDesignTokens(ctx, overrides.abbr);
				if (overrides.samp && result.samp)
					useSampDesignTokens(ctx, overrides.samp);
				if (overrides.ol && result.ol) useOlDesignTokens(ctx, overrides.ol);
				if (overrides.ul && result.ul) useUlDesignTokens(ctx, overrides.ul);
				if (overrides.paragraph && result.paragraph)
					useParagraphDesignTokens(ctx, overrides.paragraph);
			});
		}
	}

	return result;
}
