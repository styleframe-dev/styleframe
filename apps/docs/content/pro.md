---
title: styleframe Pro - Premium Design System Tools
description: Build beautiful, fluid responsive design systems in minutes with styleframe Pro's premium composables, advanced features, and mathematical precision.
---

<!--
Hero Section ----------------------------------------------------------------------------------------------
-->

::gradient-page-hero

#title
Build Faster with styleframe [Pro]{.text-primary}

#description
Create beautiful, fluid responsive design systems with mathematical precision. Premium composables and advanced features that eliminate breakpoints and scale seamlessly across all devices.

#links
    :::u-button
    ---
    color: primary
    size: xl
    to: /pricing
    trailing-icon: i-lucide-arrow-right
    ---
    Get it now
    :::
::

<!--
Features Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-b border-default"}
#title
Premium Features for Professional Design Systems

#features
    :::u-page-feature
    ---
    icon: i-lucide-waves
    target: _blank
    to: /docs/design-tokens/fluid-design
    ---
    #title
    [Fluid Responsive]{.text-primary} Design
    
    #description
    Create designs that scale smoothly across all viewport sizes using mathematical precision. No more breakpoints.
    :::


    :::u-page-feature
    ---
    icon: i-lucide-sparkles
    target: _blank
    to: /docs/design-tokens/fluid-design
    ---
    #title
    [Premium]{.text-primary} Composables
    
    #description
    Advanced design system tools built on styleframe's type-safe API. Production-ready, fully tested.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-infinity
    ---
    #title
    [Unlimited]{.text-primary} Projects

    #description
    Use styleframe Pro on unlimited personal and commercial projects. Build websites, apps, and client work.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-shield-check
    ---
    #title
    [Commercial]{.text-primary} License

    #description
    Includes commercial usage rights for client projects, SaaS applications, and commercial websites.
    :::


    :::u-page-feature
    ---
    icon: i-lucide-zap
    target: _blank
    to: /docs/design-tokens/fluid-design/clamp
    ---
    #title
    [Performance]{.text-primary} Optimized
    
    #description
    Smaller CSS bundles mean faster page loads. All of our composables are optimized for best performance.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-book-open
    target: _blank
    to: /docs/design-tokens/fluid-design
    ---
    #title
    [Complete]{.text-primary} Documentation
    
    #description
    In-depth guides, examples, and best practices. Get up and running in minutes with clear instructions.
    :::
:: 

<!-- 
Fluid Design Showcase Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-default"}
#title
What's included in styleframe Pro?

#description
Starting with fluid responsive design — the foundation of modern, scalable design systems — with many more premium composables on the way. Build layouts and typography that adapt seamlessly using mathematical precision.
::

::u-page-section
---
orientation: horizontal
headline: Pro Feature
links:
-   label: Learn about Fluid Responsive Design
    color: neutral
    variant: outline
    to: /docs/design-tokens/fluid-design
    icon: i-lucide-waves
---

::browser-frame
---
title: styleframe.config.ts
---

```ts
import { styleframe } from 'styleframe';
import { useFluidViewport, useFluidClamp } from '@styleframe/pro';
import { useSpacing } from '@styleframe/theme';

const s = styleframe();

// Set up fluid viewport range
useFluidViewport(s, {
    minWidth: 320,  // Mobile
    maxWidth: 1440  // Desktop
});

// Create fluid spacing that scales smoothly
const { spacingSm, spacingMd, spacingLg } = useSpacing(s, {
    sm: useFluidClamp(s, { min: 8, max: 16 }),
    md: useFluidClamp(s, { min: 16, max: 32 }),
    lg: useFluidClamp(s, { min: 24, max: 48 }),
});

export default s;
```

::

#title
Seamless Scaling Without Breakpoints

#description
Styleframe Pro's fluid responsive design system eliminates the complexity of traditional responsive design. Based on Utopia's mathematical principles, create layouts and typography that adapt perfectly to any viewport width.

#features
    :::u-page-feature
    ---
    icon: i-lucide-minimize-2
    target: _blank
    to: /docs/design-tokens/fluid-design
    ---
    #title
    [Reduce]{.text-primary} Complexity

    #description
    Replace dozens of media queries with single fluid values. Simpler code, easier maintenance, fewer bugs.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-circle-check-big
    target: _blank
    to: /docs/design-tokens/fluid-design
    ---
    #title
    [Perfect]{.text-primary} Consistency

    #description
    Mathematical scales ensure harmonious proportions. Every size relates to every other size predictably.
    :::
::

<!--
Pricing Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-b border-default"}
---
variant: primary
---

#title
Simple, Transparent Pricing

#description
One-time purchase. Unlimited projects. Lifetime access. Free in development mode.

#default
:::u-card{class="max-w-5xl mx-auto"}

::::community-pricing-plan{.mb-8}
::::

::::pro-pricing-plans
::::

::::pro-free-in-development{.mt-8}
::::

:::
::
