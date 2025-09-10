# Complete Core API Implementation

## Overview
Finalize and enhance the core Styleframe API based on recent changes and ensure comprehensive test coverage.

## Description
Based on the current git status, there are ongoing changes to the core API. This issue tracks completing the implementation and ensuring API stability.

## Current Status
Recent changes indicate work on:
- `atRule` functionality (removed keyframes, added at-rule support)
- Token system refinements (`declarations`, `ref`, `selector`, etc.)
- Type definitions and guards
- Transpiler improvements

## Tasks

### Complete At-Rule Implementation
- [ ] Finalize at-rule API design (replacing keyframes)
- [ ] Implement support for:
  - `@media` queries (enhance existing media token)
  - `@keyframes` via at-rule system
  - `@supports` feature queries
  - `@container` container queries
  - `@layer` cascade layers
- [ ] Add comprehensive tests for at-rule functionality
- [ ] Update documentation to reflect at-rule changes

### Enhance Token System
- [ ] Complete `ref` token implementation for cross-references
- [ ] Improve `declarations` token for better CSS property handling
- [ ] Enhance `selector` token with pseudo-selectors and combinators
- [ ] Finalize `theme` token integration
- [ ] Add validation for token relationships

### Type System Improvements
- [ ] Complete type guard implementations
- [ ] Enhance TypeScript inference for better DX
- [ ] Add runtime validation for token types
- [ ] Improve error messages for type mismatches

### API Consistency
- [ ] Audit API for consistent naming conventions
- [ ] Ensure all tokens follow same creation patterns
- [ ] Add deprecation warnings for old APIs if needed
- [ ] Document breaking changes and migration path

### Test Coverage
- [ ] Achieve 90%+ test coverage for core package
- [ ] Add integration tests between different token types
- [ ] Test edge cases and error conditions
- [ ] Add performance benchmarks

### Documentation Updates
- [ ] Update API docs to reflect recent changes
- [ ] Add examples for new at-rule functionality
- [ ] Create migration guide if breaking changes exist
- [ ] Add TypeScript usage examples

## Acceptance Criteria
- [ ] All token types are fully implemented and tested
- [ ] At-rule system is complete and documented
- [ ] API is consistent and follows established patterns
- [ ] Test coverage meets quality standards
- [ ] Breaking changes are properly documented
- [ ] TypeScript experience is excellent

## Priority
🔥 **High** - Core functionality must be stable before CLI and publishing.

## Labels
`core`, `api`, `typescript`, `breaking-change`
