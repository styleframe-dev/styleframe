---
title: The Design Systems Styling Engine
description: Styleframe turns your design system into a type-safe TypeScript source of truth and compiles it to CSS — one engine behind tokens, themes, utilities, and recipes.
---

<!--
Hero Section ----------------------------------------------------------------------------------------------
-->

::gradient-page-hero
---
orientation: horizontal
---

::browser-frame
---
title: styleframe.config.ts
---

```ts
import { styleframe } from 'styleframe';
import { useDesignTokensPreset, useGlobalPreset, useModifiersPreset, useSanitizePreset, useUtilitiesPreset, useButtonRecipe } from '@styleframe/theme';

const s = styleframe();

useDesignTokensPreset(s, {
  colors: {
    primary: '#0066ff',
    secondary: '#7c3aed'
  }
});
useSanitizePreset(s);
useGlobalPreset(s);
useUtilitiesPreset(s);
useModifiersPreset(s);

useButtonRecipe(s);

export default s;
```

::

#title
Type-safe<br/> Styling Engine for <span class="text-primary">Design Systems</span>

#description
Author design tokens, themes, utilities, and component recipes in TypeScript and compile them to zero-runtime CSS and type declarations. Catch a renamed token before your users do.

#links
    :::u-button
    ---
    color: primary
    size: xl
    to: /docs/getting-started/introduction
    trailing-icon: i-lucide-arrow-right
    ---
    Get started
    :::

    :::u-button
    ---
    color: neutral
    icon: i-lucide-github
    size: xl
    to: https://github.com/styleframe-dev/styleframe
    target: _blank
    variant: outline
    ---
    Star on GitHub
    :::
::

<!--
Section A — One source of truth ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-b border-default"}
#title
Your whole design system, from one config

#description
Tokens, themes, utilities, and component recipes come from a single TypeScript source. Change a token once, and it flows to every selector, theme, and recipe that references it.

#features
    :::u-page-feature
    ---
    icon: i-lucide-shield-check
    target: _blank
    to: /docs/api
    ---
    #title
    The compiler is your [design-system reviewer]{.text-primary}

    #description
    Autocomplete runs from a token all the way to a recipe variant. Rename a token and the build fails at the reference — not in production.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-boxes
    target: _blank
    to: /docs/api/composables
    ---
    #title
    Easily [Composable]{.text-primary}

    #description
    Compose and reuse styles with functions, variables, arrays, or objects. Every part references the same source.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-palette
    target: _blank
    to: /docs/api/themes
    ---
    #title
    Built-in [Theming]{.text-primary} Support

    #description
    Create and manage light, dark, and custom themes for your design system from the same token source.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-heart-handshake
    target: _blank
    to: /docs/getting-started/installation
    ---
    #title
    One plugin, [every major bundler]{.text-primary}

    #description
    The same config drives Vite, Nuxt, Webpack, Rollup, esbuild, Rspack, Farm, Astro, and Bun. Framework-agnostic output works with React, Vue, Svelte, Solid, and Astro.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-settings
    target: _blank
    to: /docs/api/instance#configuration-options
    ---
    #title
    Fully [Configurable]{.text-primary}

    #description
    Build your system with composables, variables, selectors, variants, and utilities — every knob typed and in one place.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-square-terminal
    target: _blank
    to: /docs/getting-started/guides
    ---
    #title
    Intuitive [Developer Experience]{.text-primary}

    #description
    Get auto-complete, in-editor documentation, and powerful static analysis for your CSS.
    :::
::

<!--
Section A (cont.) — Compose from existing parts ----------------------------------------------------------------------------------------------
-->

::u-page-section
---
orientation: horizontal
reverse: true
links:
-   label: Explore the default theme
    color: neutral
    variant: outline
    to: /docs/theme/design-tokens
    icon: i-lucide-palette
---

::browser-frame
---
title: styleframe.config.ts
---

```ts
import { styleframe } from 'styleframe';
import { useColorDesignTokens } from '@styleframe/theme';
import { useSpacingDesignTokens, useTypography } from '@orgname/theme-minimal';
import { useComponents } from './my-components';

const s = styleframe();

// Colors from the default theme
const { colorPrimary, colorSecondary } = useColorDesignTokens(s, {
    primary: '#318fa0',
    secondary: '#ff6b6b'
});

// Typography and spacing from another theme
useTypography(s);
useSpacingDesignTokens(s);

// Plus your custom components
useComponents(s);

export default s;
```

::

#title
Compose your system from existing parts

#description
Assemble your design system out of composables you already have. Plug and play variables, selectors, variants, and utilities — colors from one theme, typography from another, all resolving through one source.

#features
    :::u-page-feature
    ---
    icon: i-lucide-infinity
    ---
    #title
    Infinitely [Customizable]{.text-primary}

    #description
    Make your design system your own. Start from the default theme and customize every token to fit your needs.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-blend
    ---
    #title
    [Mix and Match]{.text-primary} Composables

    #description
    Colors from one theme, typography from another. Styleframe lets you combine composables seamlessly.
    :::
::

<!--
Section A (cont.) — One source, every theme ----------------------------------------------------------------------------------------------
-->

::u-page-section
---
orientation: horizontal
links:
-   label: Learn about themes
    color: neutral
    variant: outline
    to: /docs/api/themes
    icon: i-lucide-sun-moon
---


::tabs
    :::tabs-item{.my-5 icon="i-lucide-settings" label="Configuration"}
        ::::browser-frame
        ---
        title: styleframe.config.ts
        ---

             ```ts
            import { merge } from 'styleframe';

            import lightTheme from './light.theme';
            import darkTheme from './dark.theme';

            export default merge(lightTheme, darkTheme);

        ::::
    :::
    :::tabs-item{.my-5 icon="i-lucide-sun" label="Light Theme"}
        ::::browser-frame
        ---
        title: light.theme.ts
        ---

            ```ts
            import { styleframe } from 'styleframe';

            const s = styleframe();
            const { variable } = s;

            export const colorPrimary = variable('color-primary', '#007bff');

            export default s;

        ::::
    :::
    :::tabs-item{.my-5 icon="i-lucide-moon" label="Dark Theme"}
        ::::browser-frame
        ---
        title: dark.theme.ts
        ---

            ```ts
            import { styleframe } from 'styleframe';
            import { colorPrimary } from './light.theme';

            const s = styleframe();
            const { theme } = s;

            theme('dark', ({ variable }) => {
                variable(colorPrimary, '#0056b3');
            });

            export default s;

        ::::
    :::
::


#title
One source, every theme

#description
Light, dark, and custom themes come from the same token source. Defining a theme is as easy as declaring a variable — no separate stylesheet to keep in sync.

#features
    :::u-page-feature
    ---
    icon: i-lucide-square-code
    target: _blank
    to: /docs/api/themes
    ---
    #title
    [Intuitive]{.text-primary} API

    #description
    Writing CSS for different themes is as easy as defining a variable. No complex syntax or class names to remember.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-blend
    target: _blank
    to: /docs/api/themes
    ---
    #title
    [Mix and Match]{.text-primary} Themes

    #description
    Colors from one theme, typography from another. Styleframe lets you combine themes seamlessly.
    :::
::

<!--
Section C — Zero-runtime output ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-default"}
---
orientation: horizontal
---

::browser-frame
---
title: Output
---

```css
/* Static CSS generated at build time */
.button {
    background-color: var(--color-primary);
    padding: var(--spacing);
}
```

```ts
/* Optional runtime generated for Recipes */
export const button = recipe('button', {
    background: "primary",
}, {
    size: {
        sm: { padding: 'sm' },
        md: { padding: 'md' },
        lg: { padding: 'lg' }
    }
});
```

::

#title
Zero-Runtime by Default, Dynamic When You Need It

#description
The engine compiles your system to static CSS at build time for maximum performance. When you need prop-based styling, an optional runtime handles Recipes.

#features
    :::u-page-feature
    ---
    icon: i-lucide-zap
    ---
    #title
    [Static]{.text-primary} Generation

    #description
    CSS is generated at build time, resulting in zero runtime overhead for your base styles.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-between-horizontal-start
    to: /docs/api/instance#configuration-options
    ---
    #title
    [Dual Output]{.text-primary}

    #description
    The transpiler outputs both CSS and TypeScript. Configure output on a per-token basis to control exactly what gets generated.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-play
    to: /docs/api/recipes
    ---
    #title
    [Optional Runtime]{.text-primary}

    #description
    Need prop-based class generation? Use Recipes for dynamic component variants without sacrificing the static benefits.
    :::

#links
    :::u-button
    ---
    color: neutral
    icon: i-lucide-chef-hat
    to: /docs/api/recipes
    variant: outline
    ---
    Learn more about Recipes
    :::
::

<!--
Section E — Scanner ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-default"}
---
orientation: horizontal
---

::browser-frame
---
title: Component
---

```html
<!-- Write utility classes in your markup -->
<div class="_padding:lg _display:flex _gap:[1rem]">
    <button class="_background:primary _hover:background:secondary _padding:md">
        Click me
    </button>
</div>
```

::

#title
Write Markup, [Skip the CSS]{.text-primary}

#description
The engine reaches into your markup. Our Utility Scanner is like Tailwind JIT, but type-safe and built on your own design system — write utility classes directly in your markup, and the scanner detects them and generates only the CSS you actually use at build time. Zero waste.

#features
    :::u-page-feature
    ---
    icon: i-lucide-zap
    ---
    #title
    [Automatic]{.text-primary} Detection & Generation

    #description
    Use utility classes in your markup without pre-defining every value. The scanner matches class names against registered factories, resolves design tokens, and generates the CSS.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-heart-handshake
    ---
    #title
    [Framework]{.text-primary} Agnostic

    #description
    Built-in extractors for HTML, Vue, React, Svelte, Astro, MDX, and more. Add custom extractors for any file type.
    :::

#links
    :::u-button
    ---
    color: neutral
    icon: i-lucide-view
    to: /scanner
    variant: outline
    ---
    Learn more about the Scanner
    :::
::

<!--
Section E — Figma ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-default"}
---
orientation: horizontal
reverse: true
---

![Styleframe - Import Design Tokens into Figma](/assets/images/figma-import.png)

#title
Sync Design Tokens with [Figma]{.text-primary}

#description
The engine reaches into your design tool too. Export your Styleframe design tokens to the W3C DTCG format and import them into Figma. Keep your code and design files in perfect sync with full multi-mode support for light and dark themes.

#features
    :::u-page-feature
    ---
    icon: i-lucide-arrow-left-right
    ---
    #title
    [Bidirectional]{.text-primary} Sync

    #description
    Import tokens into Figma or export Figma Variables back to JSON. Both directions preserve structure, aliases, and semantics.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-sun-moon
    ---
    #title
    [Multi-Mode]{.text-primary} Support

    #description
    Light, dark, and custom themes are preserved as Figma modes. Your theme structure stays intact across every sync.
    :::

#links
    :::u-button
    ---
    color: neutral
    icon: i-lucide-figma
    to: /figma
    variant: outline
    ---
    Learn more about the Figma Plugin
    :::
::

<!--
AI Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-b border-default"}
---
headline: Coming Soon
orientation: horizontal
---


::video{ class="rounded" }
---
autoplay: true
loop: true
poster: /assets/images/styleframe-ai.webp
src: /assets/video/styleframe-ai.mp4
---
::

#title
AI that Writes Type-safe Composable CSS

#description
Use styleframe for Agents. Choose from a variety of AI agents and start delegating work, from code generation to other technical tasks.

#features
    :::u-page-feature
    ---
    icon: i-lucide-image-up
    target: _blank
    to: /
    ---
    #title
    Styleframe [MCP]{.text-primary}

    #description
    Connect styleframe to your favorite tools including Cursor, Claude, ChatGPT, and more.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-bot
    target: _blank
    to: /
    ---
    #title
    [Useful AI]{.text-primary} natively built in

    #description
    Styleframe uses the latest language models to power AI workflows that build your Design System for you.
    :::

#links
    ::subscribe-modal
    ---
    cta: Join waitlist for styleframe AI
    title: Join waitlist for styleframe AI
    group: ai
    ---
    ::
::


::FluidResponsiveDesignDemo
::
