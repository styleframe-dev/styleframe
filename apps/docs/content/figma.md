---
title: Figma Plugin - Design Tokens Sync
description: Styleframe is the source of truth for your design tokens. Sync variables between code and Figma using the W3C DTCG format, with full multi-mode support.
---

<!--
Hero Section ----------------------------------------------------------------------------------------------
-->

::gradient-page-hero

#title
Export Styleframe Design Tokens [to Figma]{.text-primary} and Back

#description
Sync your design tokens between Figma and code. Import and export W3C DTCG format JSON with full multi-mode support for light and dark themes, completely free.

#links
    :::u-button
    ---
    color: primary
    size: xl
    to: https://www.figma.com/community/plugin/1597716416772135340/styleframe
    trailing-icon: i-lucide-arrow-right
    target: _blank
    ---
    Install Figma plugin
    :::

    :::u-button
    ---
    color: neutral
    size: xl
    to: /docs/resources/figma-plugin
    variant: outline
    ---
    Read plugin documentation
    :::
::

<!--
Why Styleframe Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-default"}
#title
A First-Class Token Synchronization Layer

#description
Your code is your source of truth. Export it to the industry-standard Design Tokens Community Group format. Compatible with Figma, Style Dictionary, Tokens Studio, and other tools.

#features
    :::u-page-feature
    ---
    icon: i-lucide-code-2
    ---
    #title
    [Code-First]{.text-primary} Architecture

    #description
    Your Styleframe config is the single source of truth. Define tokens in TypeScript, export to Figma. When code changes, designers stay in sync.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-shield-check
    ---
    #title
    [Type-Safe]{.text-primary} Tokens

    #description
    Full TypeScript support means autocomplete, refactoring, and compile-time errors. Catch token mismatches before they reach production.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-sun-moon
    ---
    #title
    [Multi-Mode]{.text-primary} by Design

    #description
    Light, dark, and custom themes are modeled using DTCG modifiers. Modes remain explicit, structured, and code-friendly.
    :::
    
    :::u-page-feature
    ---
    icon: i-lucide-arrow-left-right
    ---
    #title
    True [Bidirectional]{.text-primary} Sync

    #description
    Import DTCG tokens into Figma or export Figma Variables back to JSON. Both directions preserve structure, aliases, and semantics.
    :::
    
    :::u-page-feature
    ---
    icon: i-lucide-terminal
    ---
    #title
    [Automation]{.text-primary}-Ready

    #description
    Export tokens from code via CLI for CI/CD, reviews, and version control. Built for modern developer workflows.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-circle-dollar-sign
    ---
    #title
    [Free]{.text-primary} Forever

    #description
    No subscription. No seat limits. The CLI and Figma plugin are free and open source. Your design system, your rules.
    :::
::

<!--
Import Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-default"}
---
orientation: horizontal
---

![Styleframe - Import Design Tokens into Figma](/assets/images/figma-import.png)

#title
[Import]{.text-primary} Design Tokens into Figma

#description
Drop a Styleframe DTCG JSON file into the plugin. Preview variables and modes before importing, then create a Figma variable collection with one click. All types mapped correctly.

#features
    :::u-page-feature
    ---
    icon: i-lucide-upload
    ---
    #title
    [Drag & Drop]{.text-primary}

    #description
    Drop your tokens.json file into the plugin. Preview everything before committing to the import.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-layers
    ---
    #title
    [Auto-Create]{.text-primary} Collections

    #description
    The plugin creates Figma collections with modes for Light, Dark, and any custom themes defined in your tokens.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-check-circle
    ---
    #title
    [Type Validation]{.text-primary}

    #description
    Color, dimension, number, and string types are validated before import. Invalid tokens are flagged, not silently dropped.
    :::
::

<!--
Export Section ----------------------------------------------------------------------------------------------
-->

::u-page-section
---
orientation: horizontal
reverse: true
---

![Styleframe - Export Design Tokens from Figma](/assets/images/figma-export.png)

#title
[Export]{.text-primary} Figma Variables to Styleframe

#description
Select a Figma variable collection and export it to the Styleframe W3C DTCG format. Copy the JSON or save it as a file. Aliases are preserved as proper token references.

#features
    :::u-page-feature
    ---
    icon: i-lucide-mouse-pointer-click
    ---
    #title
    [One-Click]{.text-primary} Export

    #description
    Select a collection, click export. The plugin handles type conversion, alias mapping, and mode organization automatically.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-copy
    ---
    #title
    [Clipboard]{.text-primary} Ready

    #description
    Copy the generated JSON directly to your clipboard. Paste into your codebase or save as a file for version control.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-braces
    ---
    #title
    [Reference]{.text-primary} Syntax

    #description
    Variable aliases become DTCG references ({token.path}). Token relationships are preserved across every export.
    :::

#links
    :::u-button
    ---
    color: neutral
    icon: i-lucide-external-link
    to: https://www.designtokens.org/
    target: _blank
    variant: outline
    ---
    Learn about DTCG Format
    :::
::

<!--
CLI Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-default"}
---
orientation: horizontal
headline: Developer Workflow
---

    ::::browser-frame
    ---
    title: Terminal
    ---

```bash
# Export Styleframe variables to DTCG format
npx styleframe figma export \
        --config styleframe.config.ts \
        --output tokens.json \
        --collection "Design Tokens"

# Output:
# Loading configuration from "styleframe.config.ts"...
# Extracting variables...
# Writing 42 variables to "tokens.json"...
# Exported 42 variables in DTCG format
```

    ::::


#title
Automate with the CLI

#description
Export design tokens directly from your Styleframe config. Run in CI/CD pipelines to keep Figma tokens in sync with every code change. No manual exports, no drift.

#features
    :::u-page-feature
    ---
    icon: i-lucide-git-branch
    ---
    #title
    [Git-Integrated]{.text-primary} Workflow

    #description
    Export tokens on every commit. Track changes in version control alongside your code. Review token updates in pull requests.
    :::

    :::u-page-feature
    ---
    icon: i-lucide-repeat
    ---
    #title
    [CI/CD]{.text-primary} Ready

    #description
    Add the export command to your build pipeline. Automatically sync tokens from your Styleframe config to Figma-compatible format.
    :::

#links
    :::u-button
    ---
    color: neutral
    icon: i-lucide-book-open
    to: /docs/getting-started/cli#figma
    variant: outline
    ---
    CLI Documentation
    :::
::

<!--
CTA Section ----------------------------------------------------------------------------------------------
-->

::u-page-section{class="border-t border-b border-default"}
---
variant: primary
---

#title
Sync Design Tokens to Figma in [Minutes]{.text-primary}

#description
Install the Figma plugin, export your Styleframe config, and sync your design tokens. No subscriptions, no setup complexity.

#links
    :::u-button
    ---
    color: primary
    size: xl
    to: https://www.figma.com/community/plugin/1597716416772135340/styleframe
    trailing-icon: i-lucide-arrow-right
    target: _blank
    ---
    Install Figma plugin
    :::

    :::u-button
    ---
    color: neutral
    size: xl
    to: /docs/resources/figma-plugin
    variant: outline
    ---
    Read plugin documentation
    :::
::
