# @styleframe/scanner

Content scanning and utility class extraction for the Styleframe CSS-in-TypeScript framework. This package scans source files across a project to detect usage of Styleframe utility classes, parses them into structured objects, matches them against registered utilities, and supports file watching with caching for fast incremental rebuilds.

## When to Use This Package

- Scan project files to find all Styleframe utility classes in use
- Parse utility class strings (`_hover:margin:sm`) into structured `ParsedUtility` objects
- Match parsed utilities against a Styleframe root instance to resolve factories and modifiers
- Extract utility classes from multiple file formats (HTML, JSX, Vue, Svelte, Astro, etc.)
- Watch files for changes and re-scan incrementally with content-hash caching

## Installation

```ts
import {
  createScanner,
  quickScan,
  createContentScanner,
  parseUtilityClass,
  extractUtilityClasses,
  generateUtilityClassName,
  matchUtilities,
  filterUtilities,
  createCache,
  hashContent,
  createChangeHandler,
  debounce,
} from "@styleframe/scanner";
```

**Peer dependencies:** `@styleframe/core`, `@styleframe/license`
**Dependencies:** `fast-glob`

## Architecture

### Utility Class Format

Styleframe utility classes follow the pattern: `_[modifiers:]name[:value]`

| Example | Name | Value | Modifiers |
|---------|------|-------|-----------|
| `_margin:sm` | `margin` | `sm` | `[]` |
| `_hover:margin:sm` | `margin` | `sm` | `["hover"]` |
| `_dark:hover:background:primary` | `background` | `primary` | `["dark", "hover"]` |
| `_margin:[16px]` | `margin` | `[16px]` | `[]` (arbitrary) |
| `_hidden` | `hidden` | `default` | `[]` |

### Scanning Pipeline

1. **File discovery** — `fast-glob` resolves glob patterns to file paths
2. **Content extraction** — Format-specific extractors pull class-like strings from each file type
3. **Parsing** — `parseUtilityClass()` converts raw strings into `ParsedUtility` objects
4. **Matching** — `matchUtilities()` resolves parsed utilities against registered factories
5. **Caching** — Content hashing skips re-parsing unchanged files
6. **Watching** — Debounced change handlers accumulate file changes for batch processing

### Supported File Formats

| Format | Extraction Patterns |
|--------|-------------------|
| HTML/HTM | `class="..."` attributes |
| JSX/TSX | `className="..."` strings, `className={...}` expressions |
| Vue SFC | Template `class`, `:class` bindings, script sections |
| Svelte | `class="..."`, `class={...}`, `class:directive`, script sections |
| Astro | HTML and JSX patterns, frontmatter scripts |
| MDX | HTML and JSX patterns |
| JS/TS | String literals (single, double, template) |
| PHP/ERB/Twig/Blade | HTML-like patterns |

## API Reference

### createScanner(config)

Create a scanner instance for file-based scanning with caching and watching support.

```ts
const scanner = createScanner({
  content: ["./src/**/*.{tsx,jsx,html,vue}"],
  cwd: process.cwd(),
  extractors: [/* custom extractors */],
  utilities: {
    pattern: /custom-regex/g,
    parse: (className) => ({ /* ParsedUtility */ }),
    selector: (name, value, modifiers) => ".custom-selector",
  },
});

// Scan all matching files
const results = await scanner.scan();

// Scan a single file
const fileResult = await scanner.scanFile("/path/to/file.tsx");

// Scan raw content directly
const parsed = scanner.scanContent('<div class="_margin:sm _padding:lg">', "file.html");

// Match parsed utilities against a Styleframe root
const matches = scanner.match(parsed, root);

// Watch for changes (returns cleanup function)
const cleanup = scanner.watch((result) => { /* handle changes */ });

// Invalidate cache
scanner.invalidate("/path/to/file.tsx"); // Single file
scanner.invalidate();                     // All files
```

### quickScan(content, filePath?, utilities?)

One-off content scan without creating a full scanner instance. Returns parsed utilities directly.

```ts
const parsed = quickScan('<div class="_margin:sm _hover:background:primary">', "file.html");
// [{ raw: "_margin:sm", name: "margin", value: "sm", ... }, ...]
```

### createContentScanner(extractors?, utilities?)

Create a reusable scan function for content-only scanning (no file I/O).

```ts
const scanFn = createContentScanner();
const parsed = scanFn('<div class="_padding:md">', "file.html");
```

### parseUtilityClass(className)

Parse a single utility class string into a structured object. Returns `null` for invalid inputs.

```ts
parseUtilityClass("_hover:margin:sm");
// { raw: "_hover:margin:sm", name: "margin", value: "sm", modifiers: ["hover"], isArbitrary: false }

parseUtilityClass("_margin:[16px]");
// { raw: "_margin:[16px]", name: "margin", value: "[16px]", modifiers: [], isArbitrary: true, arbitraryValue: "16px" }

parseUtilityClass("_hidden");
// { raw: "_hidden", name: "hidden", value: "default", modifiers: [], isArbitrary: false }

parseUtilityClass("invalid");
// null (no underscore prefix)
```

### extractUtilityClasses(content, pattern?)

Extract all utility class strings from content using a regex pattern (defaults to `UTILITY_CLASS_PATTERN`).

```ts
const classes = extractUtilityClasses('class="_margin:sm _padding:lg"');
// ["_margin:sm", "_padding:lg"]
```

### generateUtilityClassName(name, value, modifiers?)

Generate a utility class name from its components.

```ts
generateUtilityClassName("margin", "sm");
// "_margin:sm"

generateUtilityClassName("margin", "sm", ["hover"]);
// "_hover:margin:sm"

generateUtilityClassName("background", "primary", ["dark", "hover"]);
// "_dark:hover:background:primary"
```

### matchUtilities(parsed, root)

Match an array of parsed utilities against a Styleframe root instance. Returns matches with factory references and existence flags.

```ts
const matches = matchUtilities(parsedUtilities, styleframeRoot);
// [{ parsed, factory, modifierFactories, exists }, ...]
```

Each match contains:
- `parsed` — The original `ParsedUtility`
- `factory` — The `UtilityFactory` from the root (or `null` if not found)
- `modifierFactories` — Array of resolved `ModifierFactory` objects
- `exists` — Whether the value key exists in the factory's registered values

### filterUtilities(root, usedClasses, selectorFn?)

Filter a Styleframe root's utilities to only those referenced in the used class set.

```ts
const filtered = filterUtilities(root, usedClassesSet);
```

### createCache()

Create a content-hash cache for scan results.

```ts
const cache = createCache();
const hash = hashContent(fileContent);

// Check and retrieve in one call
const cached = cache.getIfValid(filePath, hash);
if (!cached) {
  const result = /* scan file */;
  cache.set(filePath, result, hash);
}

cache.invalidate(filePath);  // Single file
cache.clear();               // All entries
```

### hashContent(content)

Generate a hash string from content for cache validation. Uses a 32-bit hash combined with content length.

```ts
const hash = hashContent("file contents here");
```

### createChangeHandler(callback, options?)

Create a debounced change handler that accumulates file paths before invoking the callback.

```ts
const { onChange, flush } = createChangeHandler(
  (changedFiles) => {
    // changedFiles: Set<string>
    // Re-scan changed files
  },
  { debounce: 100 } // Default: 100ms
);

// Call onChange when files change (e.g., from a file watcher)
onChange("/path/to/changed-file.tsx");

// Force immediate processing
flush();
```

### debounce(fn, delay)

General-purpose debounce utility.

```ts
const debouncedFn = debounce(() => { /* ... */ }, 200);
```

## Types

```ts
interface ScannerConfig {
  content: string[];                     // Glob patterns for files to scan
  extractors?: Extractor[];             // Custom content extractors
  cwd?: string;                         // Base directory (default: process.cwd())
  utilities?: ScannerUtilitiesConfig;   // Custom utility syntax
}

interface ScannerUtilitiesConfig {
  pattern?: RegExp;                     // Custom extraction regex
  parse?: UtilityClassParseFn;          // Custom parser function
  selector?: UtilitySelectorFn;         // Custom selector generator
}

interface ScanResult {
  files: Map<string, FileScanResult>;   // Per-file results
  allClasses: Set<string>;              // All unique class names
  allParsed: ParsedUtility[];           // All parsed utilities
}

interface FileScanResult {
  path: string;
  classes: Set<string>;                 // Raw class names found
  parsed: ParsedUtility[];              // Parsed utilities
  lastScanned: number;                  // Timestamp
}

interface ParsedUtility {
  raw: string;                          // Original class string
  name: string;                         // Utility name
  value: string;                        // Value key or "[...]"
  modifiers: string[];                  // Modifier names (sorted)
  isArbitrary: boolean;                 // Whether value is in brackets
  arbitraryValue?: string;              // Extracted bracket content
}

interface UtilityMatch {
  parsed: ParsedUtility;
  factory: UtilityFactory | null;       // From @styleframe/core
  modifierFactories: ModifierFactory[]; // Resolved modifier factories
  exists: boolean;                      // Value exists in factory
}

interface ScannerCache {
  get(filePath: string): FileScanResult | null;
  set(filePath: string, result: FileScanResult, hash: string): void;
  isValid(filePath: string, hash: string): boolean;
  getIfValid(filePath: string, hash: string): FileScanResult | null;
  invalidate(filePath: string): void;
  clear(): void;
}

interface Extractor {
  extensions: string[];
  extract: (content: string) => string[];
}
```

## Constants

```ts
import { UTILITY_CLASS_PATTERN, ARBITRARY_VALUE_PATTERN, DEFAULT_EXTENSIONS, DEFAULT_IGNORE_PATTERNS } from "@styleframe/scanner";
```

| Constant | Value |
|----------|-------|
| `UTILITY_CLASS_PATTERN` | `/_[a-zA-Z][a-zA-Z0-9-]*(?::[a-zA-Z0-9._-]+\|:\[[^\]]+\])*/g` |
| `ARBITRARY_VALUE_PATTERN` | `/^\[(.+)\]$/` |
| `DEFAULT_EXTENSIONS` | html, htm, vue, svelte, jsx, tsx, js, ts, astro, mdx, php, erb, twig, blade.php |
| `DEFAULT_IGNORE_PATTERNS` | `**/node_modules/**`, `**/.git/**`, `**/dist/**`, `**/build/**`, `**/.next/**`, `**/.nuxt/**`, `**/coverage/**` |

## Best Practices

1. **Use `createScanner()` for file-based workflows** — It manages glob resolution, caching, and watching. Use `quickScan()` or `createContentScanner()` only for one-off content scanning without file I/O.

2. **Provide specific glob patterns** — Narrow `content` patterns reduce scan time. Prefer `./src/**/*.tsx` over `**/*`.

3. **Use the cache for incremental updates** — The scanner's built-in cache uses content hashing to skip re-parsing unchanged files. Call `invalidate()` only for changed files, not the entire cache.

4. **Integrate with external file watchers** — The `watch()` method and `createChangeHandler()` are designed for integration with Vite HMR, chokidar, or similar watchers. They do not create their own watchers.

5. **Use `matchUtilities()` after scanning** — Scanning extracts and parses classes; matching resolves them against the Styleframe root. Both steps are needed for utility registration.

6. **Custom extractors for unsupported formats** — If your project uses a file format not covered by the built-in extractors, provide a custom `Extractor` with the appropriate `extensions` and `extract` function.

7. **Arbitrary values use bracket syntax** — Users write `_margin:[16px]` for one-off values. The scanner parses the bracket content into `arbitraryValue` for direct CSS use.

## Source Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Re-exports all public API |
| `src/scanner.ts` | Scanner creation (`createScanner`, `quickScan`, `createContentScanner`) |
| `src/parser.ts` | Utility class parsing (`parseUtilityClass`, `extractUtilityClasses`, `generateUtilityClassName`) |
| `src/extractor.ts` | Format-specific content extractors for all supported file types |
| `src/matcher.ts` | Utility matching against Styleframe root (`matchUtilities`, `filterUtilities`) |
| `src/cache.ts` | Content-hash caching (`createCache`, `hashContent`) |
| `src/watcher.ts` | File watching utilities (`createChangeHandler`, `debounce`, glob matching) |
| `src/constants.ts` | Regex patterns and default configurations |
| `src/types.ts` | TypeScript type definitions |
