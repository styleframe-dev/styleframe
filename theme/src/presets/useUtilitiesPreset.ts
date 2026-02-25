import type { Styleframe } from "@styleframe/core";

// Import default values from centralized values folder
import {
	// Accessibility
	forcedColorAdjustValues,
	// Backgrounds
	backgroundAttachmentValues,
	backgroundClipValues,
	backgroundImageValues,
	backgroundOriginValues,
	backgroundPositionValues,
	backgroundRepeatValues,
	backgroundSizeValues,
	// Blend modes
	backgroundBlendModeValues,
	mixBlendModeValues,
	// Borders utility
	divideStyleValues,
	outlineStyleValues,
	// Flexbox & Grid
	alignContentValues,
	alignItemsValues,
	alignSelfValues,
	flexDirectionValues,
	flexValues,
	flexWrapValues,
	gridAutoFlowValues,
	justifyContentValues,
	justifyItemsValues,
	justifySelfValues,
	placeContentValues,
	placeItemsValues,
	placeSelfValues,
	// Interactivity
	appearanceValues,
	colorSchemeValues,
	cursorValues,
	pointerEventsValues,
	resizeValues,
	scrollBehaviorValues,
	scrollSnapAlignValues,
	scrollSnapStopValues,
	scrollSnapTypeValues,
	touchActionValues,
	userSelectValues,
	willChangeValues,
	// Layout
	aspectRatioValues,
	boxDecorationBreakValues,
	boxSizingValues,
	breakAfterValues,
	breakBeforeValues,
	breakInsideValues,
	clearValues,
	displayValues,
	floatValues,
	isolationValues,
	objectFitValues,
	objectPositionValues,
	overflowValues,
	overscrollValues,
	positionValues,
	visibilityValues,
	// Tables
	borderCollapseValues,
	captionSideValues,
	tableLayoutValues,
	// Transforms
	backfaceVisibilityValues,
	perspectiveOriginValues,
	transformOriginValues,
	transformStyleValues,
	// Transitions
	animationValues,
	transitionBehaviorValues,
	transitionPropertyValues,
	// Typography utility
	fontSmoothingValues,
	fontStretchValues,
	fontVariantNumericValues,
	hyphensValues,
	listStylePositionValues,
	listStyleTypeValues,
	overflowWrapValues,
	textAlignValues,
	textDecorationLineValues,
	textDecorationStyleValues,
	textOverflowValues,
	textTransformValues,
	textWrapValues,
	verticalAlignValues,
	whitespaceValues,
	wordBreakValues,
} from "../values";

// Accessibility
import {
	useForcedColorAdjustUtility,
	useNotSrOnlyUtility,
	useSrOnlyUtility,
} from "../utilities/accessibility";

// Backgrounds
import {
	useBackgroundAttachmentUtility,
	useBackgroundClipUtility,
	useBackgroundColorUtility,
	useBackgroundImageUtility,
	useBackgroundOriginUtility,
	useBackgroundPositionUtility,
	useBackgroundRepeatUtility,
	useBackgroundSizeUtility,
	useBackgroundUtility,
	useGradientFromUtility,
	useGradientToUtility,
	useGradientViaUtility,
} from "../utilities/backgrounds";

// Borders
import {
	useBorderColorBottomUtility,
	useBorderColorEndUtility,
	useBorderColorLeftUtility,
	useBorderColorRightUtility,
	useBorderColorStartUtility,
	useBorderColorTopUtility,
	useBorderColorUtility,
	useBorderColorXUtility,
	useBorderColorYUtility,
	useBorderRadiusBottomLeftUtility,
	useBorderRadiusBottomRightUtility,
	useBorderRadiusBottomUtility,
	useBorderRadiusEndEndUtility,
	useBorderRadiusEndStartUtility,
	useBorderRadiusEndUtility,
	useBorderRadiusLeftUtility,
	useBorderRadiusRightUtility,
	useBorderRadiusStartEndUtility,
	useBorderRadiusStartStartUtility,
	useBorderRadiusStartUtility,
	useBorderRadiusTopLeftUtility,
	useBorderRadiusTopRightUtility,
	useBorderRadiusTopUtility,
	useBorderRadiusUtility,
	useBorderStyleUtility,
	useBorderWidthBottomUtility,
	useBorderWidthEndUtility,
	useBorderWidthLeftUtility,
	useBorderWidthRightUtility,
	useBorderWidthStartUtility,
	useBorderWidthTopUtility,
	useBorderWidthUtility,
	useBorderWidthXUtility,
	useBorderWidthYUtility,
	useDivideColorUtility,
	useDivideStyleUtility,
	useDivideXReverseUtility,
	useDivideXUtility,
	useDivideYReverseUtility,
	useDivideYUtility,
	useOutlineColorUtility,
	useOutlineOffsetUtility,
	useOutlineStyleUtility,
	useOutlineWidthUtility,
	useRingColorUtility,
	useRingInsetUtility,
	useRingOffsetColorUtility,
	useRingOffsetWidthUtility,
	useRingWidthUtility,
} from "../utilities/borders";

// Effects
import {
	useBackgroundBlendModeUtility,
	useBoxShadowColorUtility,
	useBoxShadowUtility,
	useMixBlendModeUtility,
	useOpacityUtility,
	useTextShadowColorUtility,
	useTextShadowUtility,
} from "../utilities/effects";

// Filters
import {
	useBackdropBlurUtility,
	useBackdropBrightnessUtility,
	useBackdropContrastUtility,
	useBackdropGrayscaleUtility,
	useBackdropHueRotateUtility,
	useBackdropInvertUtility,
	useBackdropOpacityUtility,
	useBackdropSaturateUtility,
	useBackdropSepiaUtility,
	useBlurUtility,
	useBrightnessUtility,
	useContrastUtility,
	useDropShadowUtility,
	useGrayscaleUtility,
	useHueRotateUtility,
	useInvertUtility,
	useSaturateUtility,
	useSepiaUtility,
} from "../utilities/filters";

// Flexbox and Grid
import {
	useAlignContentUtility,
	useAlignItemsUtility,
	useAlignSelfUtility,
	useFlexBasisUtility,
	useFlexDirectionUtility,
	useFlexGrowUtility,
	useFlexShrinkUtility,
	useFlexUtility,
	useFlexWrapUtility,
	useGapUtility,
	useGapXUtility,
	useGapYUtility,
	useGridAutoColumnsUtility,
	useGridAutoFlowUtility,
	useGridAutoRowsUtility,
	useGridColumnEndUtility,
	useGridColumnStartUtility,
	useGridColumnUtility,
	useGridRowEndUtility,
	useGridRowStartUtility,
	useGridRowUtility,
	useGridTemplateColumnsUtility,
	useGridTemplateRowsUtility,
	useJustifyContentUtility,
	useJustifyItemsUtility,
	useJustifySelfUtility,
	useOrderUtility,
	usePlaceContentUtility,
	usePlaceItemsUtility,
	usePlaceSelfUtility,
} from "../utilities/flexbox-grid";

// Interactivity
import {
	useAccentColorUtility,
	useAppearanceUtility,
	useCaretColorUtility,
	useColorSchemeUtility,
	useCursorUtility,
	usePointerEventsUtility,
	useResizeUtility,
	useScrollBehaviorUtility,
	useScrollMarginBottomUtility,
	useScrollMarginEndUtility,
	useScrollMarginLeftUtility,
	useScrollMarginRightUtility,
	useScrollMarginStartUtility,
	useScrollMarginTopUtility,
	useScrollMarginUtility,
	useScrollMarginXUtility,
	useScrollMarginYUtility,
	useScrollPaddingBottomUtility,
	useScrollPaddingEndUtility,
	useScrollPaddingLeftUtility,
	useScrollPaddingRightUtility,
	useScrollPaddingStartUtility,
	useScrollPaddingTopUtility,
	useScrollPaddingUtility,
	useScrollPaddingXUtility,
	useScrollPaddingYUtility,
	useScrollSnapAlignUtility,
	useScrollSnapStopUtility,
	useScrollSnapTypeUtility,
	useTouchActionUtility,
	useUserSelectUtility,
	useWillChangeUtility,
} from "../utilities/interactivity";

// Layout
import {
	useAspectRatioUtility,
	useBottomUtility,
	useBoxDecorationBreakUtility,
	useBoxSizingUtility,
	useBreakAfterUtility,
	useBreakBeforeUtility,
	useBreakInsideUtility,
	useClearUtility,
	useColumnsUtility,
	useDisplayUtility,
	useFloatUtility,
	useInsetEndUtility,
	useInsetStartUtility,
	useInsetUtility,
	useInsetXUtility,
	useInsetYUtility,
	useIsolationUtility,
	useLeftUtility,
	useObjectFitUtility,
	useObjectPositionUtility,
	useOverflowUtility,
	useOverflowXUtility,
	useOverflowYUtility,
	useOverscrollUtility,
	useOverscrollXUtility,
	useOverscrollYUtility,
	usePositionUtility,
	useRightUtility,
	useTopUtility,
	useVisibilityUtility,
	useZIndexUtility,
} from "../utilities/layout";

// Sizing
import {
	useHeightUtility,
	useMaxHeightUtility,
	useMaxWidthUtility,
	useMinHeightUtility,
	useMinWidthUtility,
	useSizeUtility,
	useWidthUtility,
} from "../utilities/sizing";

// Spacing
import {
	useMarginBlockUtility,
	useMarginBottomUtility,
	useMarginInlineEndUtility,
	useMarginInlineStartUtility,
	useMarginInlineUtility,
	useMarginLeftUtility,
	useMarginRightUtility,
	useMarginTopUtility,
	useMarginUtility,
	useMarginXUtility,
	useMarginYUtility,
	usePaddingBlockUtility,
	usePaddingBottomUtility,
	usePaddingInlineEndUtility,
	usePaddingInlineStartUtility,
	usePaddingInlineUtility,
	usePaddingLeftUtility,
	usePaddingRightUtility,
	usePaddingTopUtility,
	usePaddingUtility,
	usePaddingXUtility,
	usePaddingYUtility,
	useSpaceXReverseUtility,
	useSpaceXUtility,
	useSpaceYReverseUtility,
	useSpaceYUtility,
} from "../utilities/spacing";

// SVG
import {
	useFillUtility,
	useStrokeUtility,
	useStrokeWidthUtility,
} from "../utilities/svg";

// Tables
import {
	useBorderCollapseUtility,
	useBorderSpacingUtility,
	useBorderSpacingXUtility,
	useBorderSpacingYUtility,
	useCaptionSideUtility,
	useTableLayoutUtility,
} from "../utilities/tables";

// Transforms
import {
	useBackfaceVisibilityUtility,
	usePerspectiveOriginUtility,
	usePerspectiveUtility,
	useRotateUtility,
	useRotateXUtility,
	useRotateYUtility,
	useScaleUtility,
	useScaleXUtility,
	useScaleYUtility,
	useSkewXUtility,
	useSkewYUtility,
	useTransformOriginUtility,
	useTransformStyleUtility,
	useTranslateUtility,
	useTranslateXUtility,
	useTranslateYUtility,
	useTranslateZUtility,
} from "../utilities/transforms";

// Transitions and Animation
import {
	useAnimationUtility,
	useTransitionBehaviorUtility,
	useTransitionDelayUtility,
	useTransitionDurationUtility,
	useTransitionPropertyUtility,
	useTransitionTimingFunctionUtility,
} from "../utilities/transitions-animation";

// Typography
import {
	useColorUtility,
	useContentUtility,
	useFontFamilyUtility,
	useFontSizeUtility,
	useFontSmoothingUtility,
	useFontStretchUtility,
	useFontStyleUtility,
	useFontVariantNumericUtility,
	useFontWeightUtility,
	useHyphensUtility,
	useLetterSpacingUtility,
	useLineClampUtility,
	useLineHeightUtility,
	useListStyleImageUtility,
	useListStylePositionUtility,
	useListStyleTypeUtility,
	useOverflowWrapUtility,
	useTextAlignUtility,
	useTextColorUtility,
	useTextDecorationColorUtility,
	useTextDecorationLineUtility,
	useTextDecorationStyleUtility,
	useTextDecorationThicknessUtility,
	useTextIndentUtility,
	useTextOverflowUtility,
	useTextTransformUtility,
	useTextUnderlineOffsetUtility,
	useTextWrapUtility,
	useVerticalAlignUtility,
	useWhitespaceUtility,
	useWordBreakUtility,
} from "../utilities/typography";

// =============================================================================
// Configuration Types
// =============================================================================

/**
 * Meta configuration for utilities preset
 */
export interface UtilitiesMetaConfig {
	/**
	 * When true, custom values are merged with defaults instead of replacing them.
	 * Custom values override defaults with the same key.
	 */
	merge?: boolean;
}

/**
 * Configuration options for the utilities preset.
 *
 * - Omit or set to `undefined` to use default values
 * - Set to `false` to disable the utility category entirely
 * - Provide a custom record to use custom values
 * - Set `meta.merge` to `true` to merge custom values with defaults
 */
export interface UtilitiesPresetConfig {
	meta?: UtilitiesMetaConfig;

	// Accessibility
	forcedColorAdjust?: Record<string, string> | false;

	// Backgrounds
	backgroundAttachment?: Record<string, string> | false;
	backgroundClip?: Record<string, string> | false;
	backgroundImage?: Record<string, string> | false;
	backgroundOrigin?: Record<string, string> | false;
	backgroundPosition?: Record<string, string> | false;
	backgroundRepeat?: Record<string, string> | false;
	backgroundSize?: Record<string, string> | false;

	// Effects
	backgroundBlendMode?: Record<string, string> | false;
	mixBlendMode?: Record<string, string> | false;

	// Borders utility
	divideStyle?: Record<string, string> | false;
	outlineStyle?: Record<string, string> | false;

	// Flexbox & Grid
	flex?: Record<string, string> | false;
	flexDirection?: Record<string, string> | false;
	flexWrap?: Record<string, string> | false;
	justifyContent?: Record<string, string> | false;
	justifyItems?: Record<string, string> | false;
	justifySelf?: Record<string, string> | false;
	alignContent?: Record<string, string> | false;
	alignItems?: Record<string, string> | false;
	alignSelf?: Record<string, string> | false;
	placeContent?: Record<string, string> | false;
	placeItems?: Record<string, string> | false;
	placeSelf?: Record<string, string> | false;
	gridAutoFlow?: Record<string, string> | false;

	// Interactivity
	appearance?: Record<string, string> | false;
	colorScheme?: Record<string, string> | false;
	cursor?: Record<string, string> | false;
	pointerEvents?: Record<string, string> | false;
	resize?: Record<string, string> | false;
	scrollBehavior?: Record<string, string> | false;
	scrollSnapAlign?: Record<string, string> | false;
	scrollSnapStop?: Record<string, string> | false;
	scrollSnapType?: Record<string, string> | false;
	touchAction?: Record<string, string> | false;
	userSelect?: Record<string, string> | false;
	willChange?: Record<string, string> | false;

	// Layout
	aspectRatio?: Record<string, string> | false;
	boxDecorationBreak?: Record<string, string> | false;
	boxSizing?: Record<string, string> | false;
	breakAfter?: Record<string, string> | false;
	breakBefore?: Record<string, string> | false;
	breakInside?: Record<string, string> | false;
	clear?: Record<string, string> | false;
	display?: Record<string, string> | false;
	float?: Record<string, string> | false;
	isolation?: Record<string, string> | false;
	objectFit?: Record<string, string> | false;
	objectPosition?: Record<string, string> | false;
	overflow?: Record<string, string> | false;
	overscroll?: Record<string, string> | false;
	position?: Record<string, string> | false;
	visibility?: Record<string, string> | false;

	// Tables
	borderCollapse?: Record<string, string> | false;
	captionSide?: Record<string, string> | false;
	tableLayout?: Record<string, string> | false;

	// Transforms
	backfaceVisibility?: Record<string, string> | false;
	perspectiveOrigin?: Record<string, string> | false;
	transformOrigin?: Record<string, string> | false;
	transformStyle?: Record<string, string> | false;

	// Transitions & Animation
	animation?: Record<string, string> | false;
	transitionBehavior?: Record<string, string> | false;
	transitionProperty?: Record<string, string> | false;

	// Typography utility
	fontSmoothing?: Record<string, string> | false;
	fontStretch?: Record<string, string> | false;
	fontVariantNumeric?: Record<string, string> | false;
	hyphens?: Record<string, string> | false;
	listStylePosition?: Record<string, string> | false;
	listStyleType?: Record<string, string> | false;
	overflowWrap?: Record<string, string> | false;
	textAlign?: Record<string, string> | false;
	textDecorationLine?: Record<string, string> | false;
	textDecorationStyle?: Record<string, string> | false;
	textOverflow?: Record<string, string> | false;
	textTransform?: Record<string, string> | false;
	textWrap?: Record<string, string> | false;
	verticalAlign?: Record<string, string> | false;
	whitespace?: Record<string, string> | false;
	wordBreak?: Record<string, string> | false;
}

/**
 * Register all utility factories with the Styleframe instance and return their creator functions.
 *
 * This function is useful when you want to register all utilities at once for use with recipes.
 * Each utility factory is registered with configurable default values.
 *
 * @param s - The Styleframe instance to register utilities with
 * @param config - Configuration options for customizing utility defaults
 * @returns An object containing creator functions for all registered utilities
 *
 * @example
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useUtilitiesPreset } from "@styleframe/theme";
 *
 * const s = styleframe();
 *
 * // Use all defaults
 * const utilities = useUtilitiesPreset(s);
 *
 * // Customize specific utilities
 * const utilities = useUtilitiesPreset(s, {
 *     display: { flex: "flex", block: "block", hidden: "none" },
 *     position: false, // Disable position utilities
 * });
 *
 * // Merge custom values with defaults
 * const utilities = useUtilitiesPreset(s, {
 *     meta: { merge: true },
 *     cursor: { custom: "url('custom.cur'), auto" },
 * });
 *
 * // Now you can use the creator functions to define additional utility values
 * utilities.createMarginUtility({ sm: '0.5rem', md: '1rem', lg: '1.5rem' });
 * ```
 */
export function useUtilitiesPreset(
	s: Styleframe,
	config: UtilitiesPresetConfig = {},
) {
	const shouldMerge = config.meta?.merge === true;

	/**
	 * Helper to resolve values with optional merge behavior
	 */
	function resolveValues<TDefault extends Record<string, string>>(
		configValue: Record<string, string> | false | undefined,
		defaultValue: TDefault,
	): TDefault | Record<string, string> | undefined {
		if (configValue === false) {
			return undefined;
		}

		if (configValue === undefined) {
			return defaultValue;
		}

		if (shouldMerge) {
			return { ...defaultValue, ...configValue };
		}

		return configValue;
	}

	// Resolve all utility values
	const forcedColorAdjust = resolveValues(
		config.forcedColorAdjust,
		forcedColorAdjustValues,
	);
	const backgroundAttachment = resolveValues(
		config.backgroundAttachment,
		backgroundAttachmentValues,
	);
	const backgroundClip = resolveValues(
		config.backgroundClip,
		backgroundClipValues,
	);
	const backgroundImage = resolveValues(
		config.backgroundImage,
		backgroundImageValues,
	);
	const backgroundOrigin = resolveValues(
		config.backgroundOrigin,
		backgroundOriginValues,
	);
	const backgroundPosition = resolveValues(
		config.backgroundPosition,
		backgroundPositionValues,
	);
	const backgroundRepeat = resolveValues(
		config.backgroundRepeat,
		backgroundRepeatValues,
	);
	const backgroundSize = resolveValues(
		config.backgroundSize,
		backgroundSizeValues,
	);
	const backgroundBlendMode = resolveValues(
		config.backgroundBlendMode,
		backgroundBlendModeValues,
	);
	const mixBlendMode = resolveValues(config.mixBlendMode, mixBlendModeValues);
	const divideStyle = resolveValues(config.divideStyle, divideStyleValues);
	const outlineStyle = resolveValues(config.outlineStyle, outlineStyleValues);
	const flex = resolveValues(config.flex, flexValues);
	const flexDirection = resolveValues(
		config.flexDirection,
		flexDirectionValues,
	);
	const flexWrap = resolveValues(config.flexWrap, flexWrapValues);
	const justifyContent = resolveValues(
		config.justifyContent,
		justifyContentValues,
	);
	const justifyItems = resolveValues(config.justifyItems, justifyItemsValues);
	const justifySelf = resolveValues(config.justifySelf, justifySelfValues);
	const alignContent = resolveValues(config.alignContent, alignContentValues);
	const alignItems = resolveValues(config.alignItems, alignItemsValues);
	const alignSelf = resolveValues(config.alignSelf, alignSelfValues);
	const placeContent = resolveValues(config.placeContent, placeContentValues);
	const placeItems = resolveValues(config.placeItems, placeItemsValues);
	const placeSelf = resolveValues(config.placeSelf, placeSelfValues);
	const gridAutoFlow = resolveValues(config.gridAutoFlow, gridAutoFlowValues);
	const appearance = resolveValues(config.appearance, appearanceValues);
	const colorScheme = resolveValues(config.colorScheme, colorSchemeValues);
	const cursor = resolveValues(config.cursor, cursorValues);
	const pointerEvents = resolveValues(
		config.pointerEvents,
		pointerEventsValues,
	);
	const resize = resolveValues(config.resize, resizeValues);
	const scrollBehavior = resolveValues(
		config.scrollBehavior,
		scrollBehaviorValues,
	);
	const scrollSnapAlign = resolveValues(
		config.scrollSnapAlign,
		scrollSnapAlignValues,
	);
	const scrollSnapStop = resolveValues(
		config.scrollSnapStop,
		scrollSnapStopValues,
	);
	const scrollSnapType = resolveValues(
		config.scrollSnapType,
		scrollSnapTypeValues,
	);
	const touchAction = resolveValues(config.touchAction, touchActionValues);
	const userSelect = resolveValues(config.userSelect, userSelectValues);
	const willChange = resolveValues(config.willChange, willChangeValues);
	const aspectRatio = resolveValues(config.aspectRatio, aspectRatioValues);
	const boxDecorationBreak = resolveValues(
		config.boxDecorationBreak,
		boxDecorationBreakValues,
	);
	const boxSizing = resolveValues(config.boxSizing, boxSizingValues);
	const breakAfter = resolveValues(config.breakAfter, breakAfterValues);
	const breakBefore = resolveValues(config.breakBefore, breakBeforeValues);
	const breakInside = resolveValues(config.breakInside, breakInsideValues);
	const clear = resolveValues(config.clear, clearValues);
	const display = resolveValues(config.display, displayValues);
	const float = resolveValues(config.float, floatValues);
	const isolation = resolveValues(config.isolation, isolationValues);
	const objectFit = resolveValues(config.objectFit, objectFitValues);
	const objectPosition = resolveValues(
		config.objectPosition,
		objectPositionValues,
	);
	const overflow = resolveValues(config.overflow, overflowValues);
	const overscroll = resolveValues(config.overscroll, overscrollValues);
	const position = resolveValues(config.position, positionValues);
	const visibility = resolveValues(config.visibility, visibilityValues);
	const borderCollapse = resolveValues(
		config.borderCollapse,
		borderCollapseValues,
	);
	const captionSide = resolveValues(config.captionSide, captionSideValues);
	const tableLayout = resolveValues(config.tableLayout, tableLayoutValues);
	const backfaceVisibility = resolveValues(
		config.backfaceVisibility,
		backfaceVisibilityValues,
	);
	const perspectiveOrigin = resolveValues(
		config.perspectiveOrigin,
		perspectiveOriginValues,
	);
	const transformOrigin = resolveValues(
		config.transformOrigin,
		transformOriginValues,
	);
	const transformStyle = resolveValues(
		config.transformStyle,
		transformStyleValues,
	);
	const animation = resolveValues(config.animation, animationValues);
	const transitionBehavior = resolveValues(
		config.transitionBehavior,
		transitionBehaviorValues,
	);
	const transitionProperty = resolveValues(
		config.transitionProperty,
		transitionPropertyValues,
	);
	const fontSmoothing = resolveValues(
		config.fontSmoothing,
		fontSmoothingValues,
	);
	const fontStretch = resolveValues(config.fontStretch, fontStretchValues);
	const fontVariantNumeric = resolveValues(
		config.fontVariantNumeric,
		fontVariantNumericValues,
	);
	const hyphens = resolveValues(config.hyphens, hyphensValues);
	const listStylePosition = resolveValues(
		config.listStylePosition,
		listStylePositionValues,
	);
	const listStyleType = resolveValues(
		config.listStyleType,
		listStyleTypeValues,
	);
	const overflowWrap = resolveValues(config.overflowWrap, overflowWrapValues);
	const textAlign = resolveValues(config.textAlign, textAlignValues);
	const textDecorationLine = resolveValues(
		config.textDecorationLine,
		textDecorationLineValues,
	);
	const textDecorationStyle = resolveValues(
		config.textDecorationStyle,
		textDecorationStyleValues,
	);
	const textOverflow = resolveValues(config.textOverflow, textOverflowValues);
	const textTransform = resolveValues(
		config.textTransform,
		textTransformValues,
	);
	const textWrap = resolveValues(config.textWrap, textWrapValues);
	const verticalAlign = resolveValues(
		config.verticalAlign,
		verticalAlignValues,
	);
	const whitespace = resolveValues(config.whitespace, whitespaceValues);
	const wordBreak = resolveValues(config.wordBreak, wordBreakValues);

	// Register utilities with resolved values
	const createForcedColorAdjustUtility = useForcedColorAdjustUtility(s);
	if (forcedColorAdjust) createForcedColorAdjustUtility(forcedColorAdjust);

	const createBackgroundAttachmentUtility = useBackgroundAttachmentUtility(s);
	if (backgroundAttachment)
		createBackgroundAttachmentUtility(backgroundAttachment);

	const createBackgroundClipUtility = useBackgroundClipUtility(s);
	if (backgroundClip) createBackgroundClipUtility(backgroundClip);

	const createBackgroundImageUtility = useBackgroundImageUtility(s);
	if (backgroundImage) createBackgroundImageUtility(backgroundImage);

	const createBackgroundOriginUtility = useBackgroundOriginUtility(s);
	if (backgroundOrigin) createBackgroundOriginUtility(backgroundOrigin);

	const createBackgroundPositionUtility = useBackgroundPositionUtility(s);
	if (backgroundPosition) createBackgroundPositionUtility(backgroundPosition);

	const createBackgroundRepeatUtility = useBackgroundRepeatUtility(s);
	if (backgroundRepeat) createBackgroundRepeatUtility(backgroundRepeat);

	const createBackgroundSizeUtility = useBackgroundSizeUtility(s);
	if (backgroundSize) createBackgroundSizeUtility(backgroundSize);

	const createBackgroundBlendModeUtility = useBackgroundBlendModeUtility(s);
	if (backgroundBlendMode)
		createBackgroundBlendModeUtility(backgroundBlendMode);

	const createMixBlendModeUtility = useMixBlendModeUtility(s);
	if (mixBlendMode) createMixBlendModeUtility(mixBlendMode);

	const createDivideStyleUtility = useDivideStyleUtility(s);
	if (divideStyle) createDivideStyleUtility(divideStyle);

	const createOutlineStyleUtility = useOutlineStyleUtility(s);
	if (outlineStyle) createOutlineStyleUtility(outlineStyle);

	const createFlexUtility = useFlexUtility(s);
	if (flex) createFlexUtility(flex);

	const createFlexDirectionUtility = useFlexDirectionUtility(s);
	if (flexDirection) createFlexDirectionUtility(flexDirection);

	const createFlexWrapUtility = useFlexWrapUtility(s);
	if (flexWrap) createFlexWrapUtility(flexWrap);

	const createJustifyContentUtility = useJustifyContentUtility(s);
	if (justifyContent) createJustifyContentUtility(justifyContent);

	const createJustifyItemsUtility = useJustifyItemsUtility(s);
	if (justifyItems) createJustifyItemsUtility(justifyItems);

	const createJustifySelfUtility = useJustifySelfUtility(s);
	if (justifySelf) createJustifySelfUtility(justifySelf);

	const createAlignContentUtility = useAlignContentUtility(s);
	if (alignContent) createAlignContentUtility(alignContent);

	const createAlignItemsUtility = useAlignItemsUtility(s);
	if (alignItems) createAlignItemsUtility(alignItems);

	const createAlignSelfUtility = useAlignSelfUtility(s);
	if (alignSelf) createAlignSelfUtility(alignSelf);

	const createPlaceContentUtility = usePlaceContentUtility(s);
	if (placeContent) createPlaceContentUtility(placeContent);

	const createPlaceItemsUtility = usePlaceItemsUtility(s);
	if (placeItems) createPlaceItemsUtility(placeItems);

	const createPlaceSelfUtility = usePlaceSelfUtility(s);
	if (placeSelf) createPlaceSelfUtility(placeSelf);

	const createGridAutoFlowUtility = useGridAutoFlowUtility(s);
	if (gridAutoFlow) createGridAutoFlowUtility(gridAutoFlow);

	const createAppearanceUtility = useAppearanceUtility(s);
	if (appearance) createAppearanceUtility(appearance);

	const createColorSchemeUtility = useColorSchemeUtility(s);
	if (colorScheme) createColorSchemeUtility(colorScheme);

	const createCursorUtility = useCursorUtility(s);
	if (cursor) createCursorUtility(cursor);

	const createPointerEventsUtility = usePointerEventsUtility(s);
	if (pointerEvents) createPointerEventsUtility(pointerEvents);

	const createResizeUtility = useResizeUtility(s);
	if (resize) createResizeUtility(resize);

	const createScrollBehaviorUtility = useScrollBehaviorUtility(s);
	if (scrollBehavior) createScrollBehaviorUtility(scrollBehavior);

	const createScrollSnapAlignUtility = useScrollSnapAlignUtility(s);
	if (scrollSnapAlign) createScrollSnapAlignUtility(scrollSnapAlign);

	const createScrollSnapStopUtility = useScrollSnapStopUtility(s);
	if (scrollSnapStop) createScrollSnapStopUtility(scrollSnapStop);

	const createScrollSnapTypeUtility = useScrollSnapTypeUtility(s);
	if (scrollSnapType) createScrollSnapTypeUtility(scrollSnapType);

	const createTouchActionUtility = useTouchActionUtility(s);
	if (touchAction) createTouchActionUtility(touchAction);

	const createUserSelectUtility = useUserSelectUtility(s);
	if (userSelect) createUserSelectUtility(userSelect);

	const createWillChangeUtility = useWillChangeUtility(s);
	if (willChange) createWillChangeUtility(willChange);

	const createAspectRatioUtility = useAspectRatioUtility(s);
	if (aspectRatio) createAspectRatioUtility(aspectRatio);

	const createBoxDecorationBreakUtility = useBoxDecorationBreakUtility(s);
	if (boxDecorationBreak) createBoxDecorationBreakUtility(boxDecorationBreak);

	const createBoxSizingUtility = useBoxSizingUtility(s);
	if (boxSizing) createBoxSizingUtility(boxSizing);

	const createBreakAfterUtility = useBreakAfterUtility(s);
	if (breakAfter) createBreakAfterUtility(breakAfter);

	const createBreakBeforeUtility = useBreakBeforeUtility(s);
	if (breakBefore) createBreakBeforeUtility(breakBefore);

	const createBreakInsideUtility = useBreakInsideUtility(s);
	if (breakInside) createBreakInsideUtility(breakInside);

	const createClearUtility = useClearUtility(s);
	if (clear) createClearUtility(clear);

	const createDisplayUtility = useDisplayUtility(s);
	if (display) createDisplayUtility(display);

	const createFloatUtility = useFloatUtility(s);
	if (float) createFloatUtility(float);

	const createIsolationUtility = useIsolationUtility(s);
	if (isolation) createIsolationUtility(isolation);

	const createObjectFitUtility = useObjectFitUtility(s);
	if (objectFit) createObjectFitUtility(objectFit);

	const createObjectPositionUtility = useObjectPositionUtility(s);
	if (objectPosition) createObjectPositionUtility(objectPosition);

	const createOverflowUtility = useOverflowUtility(s);
	if (overflow) createOverflowUtility(overflow);

	const createOverscrollUtility = useOverscrollUtility(s);
	if (overscroll) createOverscrollUtility(overscroll);

	const createPositionUtility = usePositionUtility(s);
	if (position) createPositionUtility(position);

	const createVisibilityUtility = useVisibilityUtility(s);
	if (visibility) createVisibilityUtility(visibility);

	const createBorderCollapseUtility = useBorderCollapseUtility(s);
	if (borderCollapse) createBorderCollapseUtility(borderCollapse);

	const createCaptionSideUtility = useCaptionSideUtility(s);
	if (captionSide) createCaptionSideUtility(captionSide);

	const createTableLayoutUtility = useTableLayoutUtility(s);
	if (tableLayout) createTableLayoutUtility(tableLayout);

	const createBackfaceVisibilityUtility = useBackfaceVisibilityUtility(s);
	if (backfaceVisibility) createBackfaceVisibilityUtility(backfaceVisibility);

	const createPerspectiveOriginUtility = usePerspectiveOriginUtility(s);
	if (perspectiveOrigin) createPerspectiveOriginUtility(perspectiveOrigin);

	const createTransformOriginUtility = useTransformOriginUtility(s);
	if (transformOrigin) createTransformOriginUtility(transformOrigin);

	const createTransformStyleUtility = useTransformStyleUtility(s);
	if (transformStyle) createTransformStyleUtility(transformStyle);

	const createAnimationUtility = useAnimationUtility(s);
	if (animation) createAnimationUtility(animation);

	const createTransitionBehaviorUtility = useTransitionBehaviorUtility(s);
	if (transitionBehavior) createTransitionBehaviorUtility(transitionBehavior);

	const createTransitionPropertyUtility = useTransitionPropertyUtility(s);
	if (transitionProperty) createTransitionPropertyUtility(transitionProperty);

	const createFontSmoothingUtility = useFontSmoothingUtility(s);
	if (fontSmoothing) createFontSmoothingUtility(fontSmoothing);

	const createFontStretchUtility = useFontStretchUtility(s);
	if (fontStretch) createFontStretchUtility(fontStretch);

	const createFontVariantNumericUtility = useFontVariantNumericUtility(s);
	if (fontVariantNumeric) createFontVariantNumericUtility(fontVariantNumeric);

	const createHyphensUtility = useHyphensUtility(s);
	if (hyphens) createHyphensUtility(hyphens);

	const createListStylePositionUtility = useListStylePositionUtility(s);
	if (listStylePosition) createListStylePositionUtility(listStylePosition);

	const createListStyleTypeUtility = useListStyleTypeUtility(s);
	if (listStyleType) createListStyleTypeUtility(listStyleType);

	const createOverflowWrapUtility = useOverflowWrapUtility(s);
	if (overflowWrap) createOverflowWrapUtility(overflowWrap);

	const createTextAlignUtility = useTextAlignUtility(s);
	if (textAlign) createTextAlignUtility(textAlign);

	const createTextDecorationLineUtility = useTextDecorationLineUtility(s);
	if (textDecorationLine) createTextDecorationLineUtility(textDecorationLine);

	const createTextDecorationStyleUtility = useTextDecorationStyleUtility(s);
	if (textDecorationStyle)
		createTextDecorationStyleUtility(textDecorationStyle);

	const createTextOverflowUtility = useTextOverflowUtility(s);
	if (textOverflow) createTextOverflowUtility(textOverflow);

	const createTextTransformUtility = useTextTransformUtility(s);
	if (textTransform) createTextTransformUtility(textTransform);

	const createTextWrapUtility = useTextWrapUtility(s);
	if (textWrap) createTextWrapUtility(textWrap);

	const createVerticalAlignUtility = useVerticalAlignUtility(s);
	if (verticalAlign) createVerticalAlignUtility(verticalAlign);

	const createWhitespaceUtility = useWhitespaceUtility(s);
	if (whitespace) createWhitespaceUtility(whitespace);

	const createWordBreakUtility = useWordBreakUtility(s);
	if (wordBreak) createWordBreakUtility(wordBreak);

	return {
		// Accessibility
		createForcedColorAdjustUtility,
		createNotSrOnlyUtility: useNotSrOnlyUtility(s),
		createSrOnlyUtility: useSrOnlyUtility(s),

		// Backgrounds
		createBackgroundAttachmentUtility,
		createBackgroundClipUtility,
		createBackgroundColorUtility: useBackgroundColorUtility(s),
		createBackgroundImageUtility,
		createBackgroundOriginUtility,
		createBackgroundPositionUtility,
		createBackgroundRepeatUtility,
		createBackgroundSizeUtility,
		createBackgroundUtility: useBackgroundUtility(s),
		createGradientFromUtility: useGradientFromUtility(s),
		createGradientToUtility: useGradientToUtility(s),
		createGradientViaUtility: useGradientViaUtility(s),

		// Borders
		createBorderColorBottomUtility: useBorderColorBottomUtility(s),
		createBorderColorEndUtility: useBorderColorEndUtility(s),
		createBorderColorLeftUtility: useBorderColorLeftUtility(s),
		createBorderColorRightUtility: useBorderColorRightUtility(s),
		createBorderColorStartUtility: useBorderColorStartUtility(s),
		createBorderColorTopUtility: useBorderColorTopUtility(s),
		createBorderColorUtility: useBorderColorUtility(s),
		createBorderColorXUtility: useBorderColorXUtility(s),
		createBorderColorYUtility: useBorderColorYUtility(s),
		createBorderRadiusBottomLeftUtility: useBorderRadiusBottomLeftUtility(s),
		createBorderRadiusBottomRightUtility: useBorderRadiusBottomRightUtility(s),
		createBorderRadiusBottomUtility: useBorderRadiusBottomUtility(s),
		createBorderRadiusEndEndUtility: useBorderRadiusEndEndUtility(s),
		createBorderRadiusEndStartUtility: useBorderRadiusEndStartUtility(s),
		createBorderRadiusEndUtility: useBorderRadiusEndUtility(s),
		createBorderRadiusLeftUtility: useBorderRadiusLeftUtility(s),
		createBorderRadiusRightUtility: useBorderRadiusRightUtility(s),
		createBorderRadiusStartEndUtility: useBorderRadiusStartEndUtility(s),
		createBorderRadiusStartStartUtility: useBorderRadiusStartStartUtility(s),
		createBorderRadiusStartUtility: useBorderRadiusStartUtility(s),
		createBorderRadiusTopLeftUtility: useBorderRadiusTopLeftUtility(s),
		createBorderRadiusTopRightUtility: useBorderRadiusTopRightUtility(s),
		createBorderRadiusTopUtility: useBorderRadiusTopUtility(s),
		createBorderRadiusUtility: useBorderRadiusUtility(s),
		createBorderStyleUtility: useBorderStyleUtility(s),
		createBorderWidthBottomUtility: useBorderWidthBottomUtility(s),
		createBorderWidthEndUtility: useBorderWidthEndUtility(s),
		createBorderWidthLeftUtility: useBorderWidthLeftUtility(s),
		createBorderWidthRightUtility: useBorderWidthRightUtility(s),
		createBorderWidthStartUtility: useBorderWidthStartUtility(s),
		createBorderWidthTopUtility: useBorderWidthTopUtility(s),
		createBorderWidthUtility: useBorderWidthUtility(s),
		createBorderWidthXUtility: useBorderWidthXUtility(s),
		createBorderWidthYUtility: useBorderWidthYUtility(s),
		createDivideColorUtility: useDivideColorUtility(s),
		createDivideStyleUtility,
		createDivideXReverseUtility: useDivideXReverseUtility(s),
		createDivideXUtility: useDivideXUtility(s),
		createDivideYReverseUtility: useDivideYReverseUtility(s),
		createDivideYUtility: useDivideYUtility(s),
		createOutlineColorUtility: useOutlineColorUtility(s),
		createOutlineOffsetUtility: useOutlineOffsetUtility(s),
		createOutlineStyleUtility,
		createOutlineWidthUtility: useOutlineWidthUtility(s),
		createRingColorUtility: useRingColorUtility(s),
		createRingInsetUtility: useRingInsetUtility(s),
		createRingOffsetColorUtility: useRingOffsetColorUtility(s),
		createRingOffsetWidthUtility: useRingOffsetWidthUtility(s),
		createRingWidthUtility: useRingWidthUtility(s),

		// Effects
		createBackgroundBlendModeUtility,
		createBoxShadowColorUtility: useBoxShadowColorUtility(s),
		createBoxShadowUtility: useBoxShadowUtility(s),
		createMixBlendModeUtility,
		createOpacityUtility: useOpacityUtility(s),
		createTextShadowColorUtility: useTextShadowColorUtility(s),
		createTextShadowUtility: useTextShadowUtility(s),

		// Filters
		createBackdropBlurUtility: useBackdropBlurUtility(s),
		createBackdropBrightnessUtility: useBackdropBrightnessUtility(s),
		createBackdropContrastUtility: useBackdropContrastUtility(s),
		createBackdropGrayscaleUtility: useBackdropGrayscaleUtility(s),
		createBackdropHueRotateUtility: useBackdropHueRotateUtility(s),
		createBackdropInvertUtility: useBackdropInvertUtility(s),
		createBackdropOpacityUtility: useBackdropOpacityUtility(s),
		createBackdropSaturateUtility: useBackdropSaturateUtility(s),
		createBackdropSepiaUtility: useBackdropSepiaUtility(s),
		createBlurUtility: useBlurUtility(s),
		createBrightnessUtility: useBrightnessUtility(s),
		createContrastUtility: useContrastUtility(s),
		createDropShadowUtility: useDropShadowUtility(s),
		createGrayscaleUtility: useGrayscaleUtility(s),
		createHueRotateUtility: useHueRotateUtility(s),
		createInvertUtility: useInvertUtility(s),
		createSaturateUtility: useSaturateUtility(s),
		createSepiaUtility: useSepiaUtility(s),

		// Flexbox and Grid
		createAlignContentUtility,
		createAlignItemsUtility,
		createAlignSelfUtility,
		createFlexBasisUtility: useFlexBasisUtility(s),
		createFlexDirectionUtility,
		createFlexGrowUtility: useFlexGrowUtility(s),
		createFlexShrinkUtility: useFlexShrinkUtility(s),
		createFlexUtility,
		createFlexWrapUtility,
		createGapUtility: useGapUtility(s),
		createGapXUtility: useGapXUtility(s),
		createGapYUtility: useGapYUtility(s),
		createGridAutoColumnsUtility: useGridAutoColumnsUtility(s),
		createGridAutoFlowUtility,
		createGridAutoRowsUtility: useGridAutoRowsUtility(s),
		createGridColumnEndUtility: useGridColumnEndUtility(s),
		createGridColumnStartUtility: useGridColumnStartUtility(s),
		createGridColumnUtility: useGridColumnUtility(s),
		createGridRowEndUtility: useGridRowEndUtility(s),
		createGridRowStartUtility: useGridRowStartUtility(s),
		createGridRowUtility: useGridRowUtility(s),
		createGridTemplateColumnsUtility: useGridTemplateColumnsUtility(s),
		createGridTemplateRowsUtility: useGridTemplateRowsUtility(s),
		createJustifyContentUtility,
		createJustifyItemsUtility,
		createJustifySelfUtility,
		createOrderUtility: useOrderUtility(s),
		createPlaceContentUtility,
		createPlaceItemsUtility,
		createPlaceSelfUtility,

		// Interactivity
		createAccentColorUtility: useAccentColorUtility(s),
		createAppearanceUtility,
		createCaretColorUtility: useCaretColorUtility(s),
		createColorSchemeUtility,
		createCursorUtility,
		createPointerEventsUtility,
		createResizeUtility,
		createScrollBehaviorUtility,
		createScrollMarginBottomUtility: useScrollMarginBottomUtility(s),
		createScrollMarginEndUtility: useScrollMarginEndUtility(s),
		createScrollMarginLeftUtility: useScrollMarginLeftUtility(s),
		createScrollMarginRightUtility: useScrollMarginRightUtility(s),
		createScrollMarginStartUtility: useScrollMarginStartUtility(s),
		createScrollMarginTopUtility: useScrollMarginTopUtility(s),
		createScrollMarginUtility: useScrollMarginUtility(s),
		createScrollMarginXUtility: useScrollMarginXUtility(s),
		createScrollMarginYUtility: useScrollMarginYUtility(s),
		createScrollPaddingBottomUtility: useScrollPaddingBottomUtility(s),
		createScrollPaddingEndUtility: useScrollPaddingEndUtility(s),
		createScrollPaddingLeftUtility: useScrollPaddingLeftUtility(s),
		createScrollPaddingRightUtility: useScrollPaddingRightUtility(s),
		createScrollPaddingStartUtility: useScrollPaddingStartUtility(s),
		createScrollPaddingTopUtility: useScrollPaddingTopUtility(s),
		createScrollPaddingUtility: useScrollPaddingUtility(s),
		createScrollPaddingXUtility: useScrollPaddingXUtility(s),
		createScrollPaddingYUtility: useScrollPaddingYUtility(s),
		createScrollSnapAlignUtility,
		createScrollSnapStopUtility,
		createScrollSnapTypeUtility,
		createTouchActionUtility,
		createUserSelectUtility,
		createWillChangeUtility,

		// Layout
		createAspectRatioUtility,
		createBottomUtility: useBottomUtility(s),
		createBoxDecorationBreakUtility,
		createBoxSizingUtility,
		createBreakAfterUtility,
		createBreakBeforeUtility,
		createBreakInsideUtility,
		createClearUtility,
		createColumnsUtility: useColumnsUtility(s),
		createDisplayUtility,
		createFloatUtility,
		createInsetEndUtility: useInsetEndUtility(s),
		createInsetStartUtility: useInsetStartUtility(s),
		createInsetUtility: useInsetUtility(s),
		createInsetXUtility: useInsetXUtility(s),
		createInsetYUtility: useInsetYUtility(s),
		createIsolationUtility,
		createLeftUtility: useLeftUtility(s),
		createObjectFitUtility,
		createObjectPositionUtility,
		createOverflowUtility,
		createOverflowXUtility: useOverflowXUtility(s),
		createOverflowYUtility: useOverflowYUtility(s),
		createOverscrollUtility,
		createOverscrollXUtility: useOverscrollXUtility(s),
		createOverscrollYUtility: useOverscrollYUtility(s),
		createPositionUtility,
		createRightUtility: useRightUtility(s),
		createTopUtility: useTopUtility(s),
		createVisibilityUtility,
		createZIndexUtility: useZIndexUtility(s),

		// Sizing
		createHeightUtility: useHeightUtility(s),
		createMaxHeightUtility: useMaxHeightUtility(s),
		createMaxWidthUtility: useMaxWidthUtility(s),
		createMinHeightUtility: useMinHeightUtility(s),
		createMinWidthUtility: useMinWidthUtility(s),
		createSizeUtility: useSizeUtility(s),
		createWidthUtility: useWidthUtility(s),

		// Spacing
		createMarginBlockUtility: useMarginBlockUtility(s),
		createMarginBottomUtility: useMarginBottomUtility(s),
		createMarginInlineEndUtility: useMarginInlineEndUtility(s),
		createMarginInlineStartUtility: useMarginInlineStartUtility(s),
		createMarginInlineUtility: useMarginInlineUtility(s),
		createMarginLeftUtility: useMarginLeftUtility(s),
		createMarginRightUtility: useMarginRightUtility(s),
		createMarginTopUtility: useMarginTopUtility(s),
		createMarginUtility: useMarginUtility(s),
		createMarginXUtility: useMarginXUtility(s),
		createMarginYUtility: useMarginYUtility(s),
		createPaddingBlockUtility: usePaddingBlockUtility(s),
		createPaddingBottomUtility: usePaddingBottomUtility(s),
		createPaddingInlineEndUtility: usePaddingInlineEndUtility(s),
		createPaddingInlineStartUtility: usePaddingInlineStartUtility(s),
		createPaddingInlineUtility: usePaddingInlineUtility(s),
		createPaddingLeftUtility: usePaddingLeftUtility(s),
		createPaddingRightUtility: usePaddingRightUtility(s),
		createPaddingTopUtility: usePaddingTopUtility(s),
		createPaddingUtility: usePaddingUtility(s),
		createPaddingXUtility: usePaddingXUtility(s),
		createPaddingYUtility: usePaddingYUtility(s),
		createSpaceXReverseUtility: useSpaceXReverseUtility(s),
		createSpaceXUtility: useSpaceXUtility(s),
		createSpaceYReverseUtility: useSpaceYReverseUtility(s),
		createSpaceYUtility: useSpaceYUtility(s),

		// SVG
		createFillUtility: useFillUtility(s),
		createStrokeUtility: useStrokeUtility(s),
		createStrokeWidthUtility: useStrokeWidthUtility(s),

		// Tables
		createBorderCollapseUtility,
		createBorderSpacingUtility: useBorderSpacingUtility(s),
		createBorderSpacingXUtility: useBorderSpacingXUtility(s),
		createBorderSpacingYUtility: useBorderSpacingYUtility(s),
		createCaptionSideUtility,
		createTableLayoutUtility,

		// Transforms
		createBackfaceVisibilityUtility,
		createPerspectiveOriginUtility,
		createPerspectiveUtility: usePerspectiveUtility(s),
		createRotateUtility: useRotateUtility(s),
		createRotateXUtility: useRotateXUtility(s),
		createRotateYUtility: useRotateYUtility(s),
		createScaleUtility: useScaleUtility(s),
		createScaleXUtility: useScaleXUtility(s),
		createScaleYUtility: useScaleYUtility(s),
		createSkewXUtility: useSkewXUtility(s),
		createSkewYUtility: useSkewYUtility(s),
		createTransformOriginUtility,
		createTransformStyleUtility,
		createTranslateUtility: useTranslateUtility(s),
		createTranslateXUtility: useTranslateXUtility(s),
		createTranslateYUtility: useTranslateYUtility(s),
		createTranslateZUtility: useTranslateZUtility(s),

		// Transitions and Animation
		createAnimationUtility,
		createTransitionBehaviorUtility,
		createTransitionDelayUtility: useTransitionDelayUtility(s),
		createTransitionDurationUtility: useTransitionDurationUtility(s),
		createTransitionPropertyUtility,
		createTransitionTimingFunctionUtility:
			useTransitionTimingFunctionUtility(s),

		// Typography
		createColorUtility: useColorUtility(s),
		createContentUtility: useContentUtility(s),
		createFontFamilyUtility: useFontFamilyUtility(s),
		createFontSizeUtility: useFontSizeUtility(s),
		createFontSmoothingUtility,
		createFontStretchUtility,
		createFontStyleUtility: useFontStyleUtility(s),
		createFontVariantNumericUtility,
		createFontWeightUtility: useFontWeightUtility(s),
		createHyphensUtility,
		createLetterSpacingUtility: useLetterSpacingUtility(s),
		createLineClampUtility: useLineClampUtility(s),
		createLineHeightUtility: useLineHeightUtility(s),
		createListStyleImageUtility: useListStyleImageUtility(s),
		createListStylePositionUtility,
		createListStyleTypeUtility,
		createOverflowWrapUtility,
		createTextAlignUtility,
		createTextColorUtility: useTextColorUtility(s),
		createTextDecorationColorUtility: useTextDecorationColorUtility(s),
		createTextDecorationLineUtility,
		createTextDecorationStyleUtility,
		createTextDecorationThicknessUtility: useTextDecorationThicknessUtility(s),
		createTextIndentUtility: useTextIndentUtility(s),
		createTextOverflowUtility,
		createTextTransformUtility,
		createTextUnderlineOffsetUtility: useTextUnderlineOffsetUtility(s),
		createTextWrapUtility,
		createVerticalAlignUtility,
		createWhitespaceUtility,
		createWordBreakUtility,
	};
}
