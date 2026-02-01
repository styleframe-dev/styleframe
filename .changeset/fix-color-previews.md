---
"@styleframe/plugin": patch
"@styleframe/loader": patch
---

Improve color previews and HMR handling

- Fix caching configuration in loader to use fsCache and moduleCache options
- Add HMR refetch handling for .styleframe.css virtual imports
- Update SwatchCard styling with proper footer alignment and better contrast
