# @styleframe/runtime

## 3.1.0

### Minor Changes

- [#164](https://github.com/styleframe-dev/styleframe/pull/164) [`efd99f7`](https://github.com/styleframe-dev/styleframe/commit/efd99f70a30f9a42c6e1793ed777b1565fb47a82) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add className support for compound variants in recipes
  - Add optional `className` field to compound variants, appended to output when conditions match
  - Make `css` optional on compound variants, allowing className-only compound variants

- [#167](https://github.com/styleframe-dev/styleframe/pull/167) [`179c90d`](https://github.com/styleframe-dev/styleframe/commit/179c90d9f73dadbbeb9159ab9fbd7287ceba1f20) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add boolean support for recipe variant props
  - When a variant defines both `true` and `false` keys, the runtime now accepts boolean `true`/`false` values in addition to string `"true"`/`"false"`
  - Generated `.d.ts` type declarations include `| boolean` in the type union for boolean variants

### Patch Changes

- Updated dependencies [[`b506ea5`](https://github.com/styleframe-dev/styleframe/commit/b506ea5c3c36fa24fea19a69ee3fef7035397dda), [`efd99f7`](https://github.com/styleframe-dev/styleframe/commit/efd99f70a30f9a42c6e1793ed777b1565fb47a82)]:
  - @styleframe/core@3.3.0

## 3.0.0

### Major Changes

- [#117](https://github.com/styleframe-dev/styleframe/pull/117) [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Introduce global Styleframe single-instance architecture. Extension files (`*.styleframe.ts`) now share the same instance created in `styleframe.config.ts` instead of creating independent instances. This is a breaking change that affects how styles are imported and composed across files.

### Patch Changes

- Updated dependencies [[`266f961`](https://github.com/styleframe-dev/styleframe/commit/266f96143e9ffb47e0e6326d0e5e7cc9d974ab83), [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118)]:
  - @styleframe/core@3.0.0

## 2.0.0

### Major Changes

- [#63](https://github.com/styleframe-dev/styleframe/pull/63) [`ec430e1`](https://github.com/styleframe-dev/styleframe/commit/ec430e11502b3dba69c20ee10b24f0302008883c) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add styleframe runtime for recipes

### Patch Changes

- Updated dependencies [[`ec430e1`](https://github.com/styleframe-dev/styleframe/commit/ec430e11502b3dba69c20ee10b24f0302008883c)]:
  - @styleframe/core@2.4.0
