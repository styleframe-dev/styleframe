---
title: Utility Scanner - Automatic CSS Generation
description: Write utility classes directly in your markup. Styleframe's utility scanner detects them and generates only the CSS you use at build time — type-safe, framework-agnostic, with full HMR support.
---

<!--
Hero Section ----------------------------------------------------------------------------------------------
-->

::gradient-page-hero

#title
Next Generation [Utility-First]{.text-primary} Integration

#description
If you've used Tailwind JIT, you already know the workflow. Write utility classes in your markup, and the utility scanner generates only the CSS you use at build time. The difference: your classes are backed by type-safe factories and your own design tokens — with complete control over syntax, naming, and generation behavior.

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
    size: xl
    to: /docs/getting-started/tooling/scanner
    variant: outline
    ---
    Read utility scanner docs
    :::
::

<!--
Why Use the Scanner Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-default"}
#title
Write Classes. The Utility Scanner Handles the Rest

#description
Use utility classes directly in your templates — no need to pre-define every value. The scanner reads your source files, detects your classes, and generates only the CSS you actually use.

#features
    :::u-page-feature
    ---
    icon: i-lucide-pencil-off
    ---
    #title
    [Zero]{.text-primary} Registration

    #description
    Use utility classes directly in your markup without pre-defining every value. The scanner detects and registers them for you.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-zap
    ---
    #title
    [Only Used]{.text-primary} CSS

    #description
    Unused utilities produce no output. Your stylesheet contains exactly what your templates reference — nothing more, nothing less.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-brackets
    ---
    #title
    [Arbitrary]{.text-primary} Values

    #description
    Need a one-off value? Use bracket syntax like `_padding:[2.5rem]`. No need to register a design token for every edge case.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-layers
    ---
    #title
    [Stacked]{.text-primary} Modifiers

    #description
    Chain modifiers freely. `_dark:hover:color:primary` just works — detected and generated automatically.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-settings
    ---
    #title
    [Your Syntax]{.text-primary}, Your Rules

    #description
    Unlike fixed utility catalogs, you define the factories behind your classes. Control naming conventions, allowed values, and generation behavior — the scanner adapts to your system.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-refresh-cw
    ---
    #title
    [Instant]{.text-primary} HMR

    #description
    Template changes trigger incremental rescans during development. Only changed files are re-processed — your feedback loop stays instant.
    :::
::

<!--
Write Classes Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-default"}
---
orientation: horizontal
---

    ::::browser-frame
    ---
    title: Button.vue
    ---

```html
<template>
    <div class="_display:flex _gap:1rem _padding:lg">
        <button class="_background:primary
                       _hover:background:secondary
                       _padding:md
                       _font-weight:bold">
            Click me
        </button>
        <span class="_color:muted _font-size:sm">
            Detected and generated automatically.
        </span>
    </div>
</template>
```

    ::::

#title
Write Classes in Your [Templates]{.text-primary}

#description
Use utility classes in your markup like you would with Tailwind. The scanner reads your source files, extracts every `_property:value` class, and generates the matching CSS at build time.

#features
    :::u-page-feature
    ---
    icon: i-lucide-file-code
    ---
    #title
    [12+]{.text-primary} File Types

    #description
    Vue, React, Svelte, Astro, MDX, PHP, ERB, Twig, Blade, and plain HTML — each with a specialized extractor optimized for its syntax.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-puzzle
    ---
    #title
    [Custom]{.text-primary} Extractors

    #description
    Working with an unsupported file type? Write a custom extractor function in a few lines and plug it in.
    :::
::

<!--
Generated CSS Section ----------------------------------------------------------------------------------------------
-->

::u-page-section
---
orientation: horizontal
reverse: true
---

    ::::browser-frame
    ---
    title: Output CSS
    ---

```css
/* Only the utilities your templates reference */

._padding\:lg {
        padding: var(--spacing-lg);
}

._background\:primary {
        background: var(--color-primary);
}

._hover\:background\:secondary:hover {
        background: var(--color-secondary);
}

/* Arbitrary values generate literal CSS */
._padding\:\[2\.5rem\] {
        padding: 2.5rem;
}
```

    ::::

#title
See Exactly What [Gets Generated]{.text-primary}

#description
Design tokens resolve to CSS custom properties. Arbitrary bracket values produce literal CSS. Modifiers wrap declarations in the correct pseudo-selectors and media queries. 

What you write is what you get — predictable, readable output.
::


<!--
CTA Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-b border-default"}
---
variant: primary
---

#title
Start Writing Utility Classes [Today]{.text-primary}

#description
Enable the scanner, register your factories, and let your templates drive your CSS output. Type-safe, JIT, and built on your own design tokens.

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
    size: xl
    to: /docs/getting-started/tooling/scanner
    variant: outline
    ---
    Read utility scanner docs
    :::
::
