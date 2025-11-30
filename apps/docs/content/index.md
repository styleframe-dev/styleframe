---
title: Type-safe Composable CSS
description: From simple UI styles to full Design Systems, write code using Styleframe’s powerful TypeScript CSS API — AI-ready by design.
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
import { useColor } from '@styleframe/theme';

const s = styleframe();
const { variable, ref, selector } = s;

const spacing = variable('spacing', '1rem');
const { colorPrimary } = useColor(s, {
    primary: '#318fa0',
});

selector('.button', {
    backgroundColor: ref(colorPrimary),
    padding: ref(spacing),
});

export default s;
```

::

#title
Type-safe Composable CSS 

#description
From simple UI styles to full Design Systems, write code using Styleframe’s powerful TypeScript CSS API.

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
Features Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-b border-default"}
#title
Built for Excellent Developer Experience

#features
    :::u-page-feature
    ---
    icon: i-lucide-shield-check
    target: _blank
    to: /docs/api
    ---
    #title
    [Type-safe]{.text-primary} CSS API
    
    #description
    All styles are validated at compile time, eliminating typos and runtime errors.
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
    Compose and reuse styles using functions, variables, arrays, or objects. Mix and match easily.
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
    Easily create and manage light and dark themes for your design system.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-heart-handshake
    target: _blank
    to: /docs/getting-started/installation/vite
    ---
    #title
    Framework [Agnostic]{.text-primary}
    
    #description
    Works with any frontend stack (React, Vue, Solid, Svelte, Astro) and integrates seamlessly with Vite.
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
    Build themes using composables, variables, selectors, variants, and utilities naturally.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-square-terminal
    target: _blank
    to: /docs/resources/guides
    ---
    #title
    Intuitive [Developer Experience]{.text-primary}
    
    #description
    Get auto-complete, in-editor documentation, and powerful static analysis for your CSS.
    :::
:: 

<!-- 
Architecture Section ----------------------------------------------------------------------------------------------
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
Styleframe generates CSS at build time for maximum performance. When you need prop-based styling, an optional runtime handles [Recipes](/docs/api/recipes).

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
::

<!-- 
Composability Section ----------------------------------------------------------------------------------------------
-->

::u-page-section
---
orientation: horizontal
reverse: true
links:
-   label: Explore the default theme
    color: neutral
    variant: outline
    to: /docs/design-tokens
    icon: i-lucide-palette
---

::browser-frame
---
title: styleframe.config.ts
---

```ts
import { styleframe } from 'styleframe';
import { useColor } from '@styleframe/theme';
import { useSpacing, useTypography } from '@orgname/theme-minimal';
import { useComponents } from './my-components';

const s = styleframe();

// Colors from the default theme
const { colorPrimary, colorSecondary } = useColor(s, {
    primary: '#318fa0',
    secondary: '#ff6b6b'
});

// Typography and spacing from another theme
useTypography(s);
useSpacing(s);

// Plus your custom components
useComponents(s);

export default s;
```

::

#title
Compose Design Systems in Minutes

#description
Use styleframe's native composability to construct your Design System out of existing parts. Plug and play composables, variables, selectors, variants, and utilities.

#features
    :::u-page-feature
    ---
    icon: i-lucide-infinity
    ---
    #title
    Infinitely [Customizable]{.text-primary}

    #description
    Make your Design System your own. Use the default theme as a starting point and customize it to fit your needs.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-blend
    ---
    #title
    [Mix and Match]{.text-primary} Composables

    #description
    Colors from one theme, typography from another. Styleframe lets you combine different themes seamlessly.
    :::
::

<!-- 
Theming Section ----------------------------------------------------------------------------------------------
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
Dark and Light Themes

#description
Easily create and manage themes for your design system using styleframe's native theming capabilities.

#features
    :::u-page-feature
    ---
    icon: i-lucide-square-code
    target: _blank
    to: /
    ---
    #title
    [Intuitive]{.text-primary} API

    #description
    Writing CSS for different themes is as easy as defining a variable. No need to remember complex syntax or class names.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-blend
    target: _blank
    to: /
    ---
    #title
    [Mix and Match]{.text-primary} Themes

    #description
    Colors from one theme, typography from another. Styleframe lets you combine different themes seamlessly.
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


::u-page-section{class="border-t border-default"}
---
headline: Now Available
variant: primary
links:
-   label: Learn more
    color: primary
    to: /pro
    size: xl
    trailing-icon: i-lucide-arrow-right
-   label: See pricing plans
    color: neutral
    variant: outline
    to: /pricing
    size: xl
---

#title
Build faster with styleframe [Pro]{.text-primary}.

#description
A collection of premium design system themes, composables, component styles, and utils built on top of styleframe.

::

::FluidResponsiveDesignDemo
::
