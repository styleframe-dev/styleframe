---
seo:
    title: Type-safe Composable CSS
    description: Write composable, type-safe, future-proof Design Systems code using styleframe's powerful TypeScript CSS API.
layout: default
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

const s = styleframe();
const { variable, ref, selector } = s;
const { colorBlue } = useColors(s);

const colorPrimary = variable('color-primary', ref(colorBlue));

selector('.button', {
    backgroundColor: ref(colorPrimary),
});

export default s;
```

::

#title
Type-safe Composable CSS 

#description
Write type-safe, composable, future-proof Design Systems code using styleframe's powerful TypeScript CSS API.

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
    to: /
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
    to: /
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
    to: /
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
    to: /
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
    to: /
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
    to: /
    ---
    #title
    Intuitive [Developer Experience]{.text-primary}
    
    #description
    Get auto-complete, in-editor documentation, and powerful static analysis for your CSS.
    :::
:: 

<!-- 
Composability Section ----------------------------------------------------------------------------------------------
-->

::u-page-section
---
orientation: horizontal
links:
-   label: Explore the default theme
    color: neutral
    variant: outline
    to: /
    icon: i-lucide-palette
---

::browser-frame
---
title: styleframe.config.ts
---

```ts
import { styleframe } from 'styleframe';
import { useReset, useBorder, useBorderRadius, useBoxShadow, useColors, useGrid, useScale, useSpacing, useTypography } from '@styleframe/theme-default';

const s = styleframe();

useReset(s);
useBorder(s);
useBorderRadius(s);
useBoxShadow(s);
useColors(s);
useGrid(s);
useScale(s);
useSpacing(s);
useTypography(s);

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
    target: _blank
    to: /
    ---
    #title
    Infinitely [Customizable]{.text-primary}

    #description
    Make your Design System your own. Use the default theme as a starting point and customize it to fit your needs.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-blend
    target: _blank
    to: /
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
reverse: true
links:
-   label: Explore the default theme
    color: neutral
    variant: outline
    to: /
    icon: i-lucide-palette
---


::tabs
    :::tabs-item{.my-5 icon="i-lucide-settings" label="Configuration"}
        ::::browser-frame
        ---
        title: styleframe.config.ts
        ---

             ```ts
            import { compose } from 'styleframe';

            import lightTheme from './light.theme';
            import darkTheme from './dark.theme';
            
            export default compose(lightTheme, darkTheme);

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
            
            const s = styleframe('.dark-theme');
            const { variable } = s;

            variable(colorPrimary, '#0056b3');
            
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


::u-page-section{class="border-t border-b border-default"}
---
headline: Coming Soon
variant: primary
---

#title
Build faster with styleframe [Pro]{.text-primary}.

#description
A collection of premium design system themes, composables, component styles, and utils built on top of styleframe.

#links
    ::subscribe-modal
    ---
    cta: Join waitlist for styleframe Pro
    title: Join waitlist for styleframe Pro
    group: pro
    ---
    ::
::

