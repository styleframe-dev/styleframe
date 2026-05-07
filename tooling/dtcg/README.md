# @styleframe/dtcg

Spec-conformant DTCG (Design Tokens Community Group) format parser, validator, and serializer for Styleframe.

Implements the W3C Community Group reports:

- [Design Tokens Format Module 2025.10](https://www.designtokens.org/format/)
- [Design Tokens Color Module 2025.10](https://www.designtokens.org/color/)
- [Design Tokens Resolver Module 2025.10](https://www.designtokens.org/resolver/)

## Features

- Parse and validate `.tokens.json` documents
- Parse and resolve `.resolver.json` documents (sets, modifiers, resolution order)
- All eight primitive token types (`color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, `string`)
- All six composite token types (`border`, `strokeStyle`, `transition`, `shadow`, `gradient`, `typography`)
- All 14 color spaces from the Color Module (`srgb`, `srgb-linear`, `hsl`, `hwb`, `lab`, `lch`, `oklab`, `oklch`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `xyz-d50`, `xyz-d65`)
- Transitive alias resolution with circular reference detection
- `$type` and `$deprecated` inheritance through nested groups
- Vendor extension namespace validation (reverse-DNS)
- Framework-agnostic — no runtime, no DOM, no filesystem assumptions

## Install

```sh
pnpm add @styleframe/dtcg
```

## Usage

```ts
import { parse, resolveAliases, applyInheritance, validate } from "@styleframe/dtcg";

const doc = parse(jsonString);
const errors = validate(doc);
const inherited = applyInheritance(doc);
const resolved = resolveAliases(inherited);
```

See [AGENTS.md](./AGENTS.md) for the full API reference.
