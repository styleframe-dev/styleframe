---
layout: example
seo:
  title: Pricing
  description: Write composable, type-safe, future-proof Design Systems code using
    styleframe's powerful TypeScript CSS API.
---

<!--
Hero Section ----------------------------------------------------------------------------------------------
-->

::u-page-hero
---
orientation: horizontal
---
  :::browser-frame{title="styleframe.config.ts"}
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
  :::

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
  target: _blank
  to: https://github.com/styleframe-dev/styleframe
  variant: outline
  ---
  Star on GitHub
  :::
::
