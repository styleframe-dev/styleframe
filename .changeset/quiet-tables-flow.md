---
"@styleframe/theme": minor
---

Centralize theme variable defaults to dedicated values folder

**BREAKING**: Default value exports have been renamed and `useUtilitiesPreset` has moved.

### Renamed Exports

All default value exports have been renamed from `defaultXxxValues` to `xxxValues`:

- `defaultSpacingValues` → `spacingValues`
- `defaultColorValues` → `colorValues`
- `defaultBorderWidthValues` → `borderWidthValues`
- `defaultBorderRadiusValues` → `borderRadiusValues`
- `defaultBorderStyleValues` → `borderStyleValues`
- `defaultBoxShadowValues` → `boxShadowValues`
- `defaultBreakpointValues` → `breakpointValues`
- `defaultEasingValues` → `easingValues`
- `defaultFontFamilyValues` → `fontFamilyValues`
- `defaultFontSizeValues` → `fontSizeValues`
- `defaultFontStyleValues` → `fontStyleValues`
- `defaultFontWeightValues` → `fontWeightValues`
- `defaultLineHeightValues` → `lineHeightValues`
- `defaultLetterSpacingValues` → `letterSpacingValues`
- `defaultScaleValues` → `scaleValues`
- `defaultScalePowerValues` → `scalePowerValues`
- `defaultColorLightnessValues` → `colorLightnessValues`
- `defaultColorShadeValues` → `colorShadeValues`
- `defaultColorTintValues` → `colorTintValues`

### Moved `useUtilitiesPreset`

The `useUtilitiesPreset` function has moved from `utilities/` to `presets/`:

```ts
// Before
import { useUtilitiesPreset } from "@styleframe/theme/utilities";

// After
import { useUtilitiesPreset } from "@styleframe/theme/presets";
// Or from the main export
import { useUtilitiesPreset } from "@styleframe/theme";
```

### Enhanced `useUtilitiesPreset`

The `useUtilitiesPreset` now supports configuration options:

- Customize utility default values
- Disable specific utilities with `false`
- Merge custom values with defaults using `meta.merge: true`

```ts
const utilities = useUtilitiesPreset(s, {
  meta: { merge: true },
  display: { flex: "flex", block: "block" },
  position: false, // Disable position utilities
});
```

Migration: Update imports to use the new export names and import path.
