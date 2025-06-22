---
seo:
    title: Type-safe Composable CSS
    description: Write a composable, type-safe, future-proof Design System using styleframe's powerful TypeScript CSS API.
---

::u-page-hero
---
orientation: horizontal
---

::browser-frame
---
title: styleframe.config.ts
---

```ts
import { stylefame } from 'stylefame';

const s = stylefame();
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
Write a type-safe, composable, future-proof Design System using styleframe's powerful TypeScript CSS API.

#links
    :::u-button
    ---
    color: primary
    size: xl
    to: /getting-started/introduction
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


::u-page-section
---
headline: Coming Soon
orientation: horizontal
links:
-   label: Get notified about styleframe AI
    color: neutral
    variant: outline
    to: /
    icon: i-lucide-mail
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
    icon: i-lucide-settings
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
    icon: i-lucide-settings
    target: _blank
    to: /
    ---
    #title
    [AI]{.text-primary} natively built in

    #description
    Styleframe uses the latest language models to power AI workflows that build your Design System for you.
    :::

::


::u-page-section
---
variant: primary
links:
-   label: Discover styleframe Pro
    to: /
    trailingIcon: i-lucide-arrow-right
-   label: Explore templates
    to: /
    trailingIcon: i-lucide-arrow-right
    variant: outline
    color: neutral
---

#title
Build faster with styleframe [Pro]{.text-primary}.

#description
A collection of premium design system themes, composables, component styles, and utils built on top of styleframe.

::
