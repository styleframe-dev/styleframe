# Prepare Packages for Publishing

## Overview
Update package configurations and setup for publishing to npm registry.

## Description
All packages are currently at version 0.0.0 and need proper configuration for npm publishing. Need to establish versioning strategy and publishing workflow.

## Tasks

### Package Configuration Updates
- [ ] Update package.json files with proper metadata:
  - Set initial versions (suggest 0.1.0 for pre-release)
  - Add missing fields (keywords, author, repository)
  - Ensure proper license field
  - Add engines field for Node.js >= 22.0.0
- [ ] Configure package exports correctly:
  - Verify ESM/CJS dual publishing setup
  - Test imports work correctly
  - Add proper TypeScript declaration paths
- [ ] Add package README files explaining individual package purposes
- [ ] Configure build outputs and include/exclude patterns

### Publishing Setup
- [ ] Set up semantic versioning with conventional commits
- [ ] Configure changesets for version management (alternative to semantic-release)
- [ ] Add npm publishing automation in GitHub Actions
- [ ] Set up pre-release and stable release channels
- [ ] Configure package provenance for security

### Version Strategy
- [ ] Define versioning strategy across monorepo:
  - Independent versioning vs unified versioning
  - Pre-release channel strategy (alpha, beta, rc)
  - Breaking change handling
- [ ] Set up version synchronization between dependent packages

### Quality Gates
- [ ] Ensure all packages build successfully
- [ ] Verify test coverage meets requirements
- [ ] Add package size monitoring
- [ ] Validate TypeScript declarations are correct

## Package Readiness Checklist
For each package (`@styleframe/core`, `@styleframe/transpiler`, `@styleframe/cli`):
- [ ] Builds without errors
- [ ] Tests pass with good coverage
- [ ] TypeScript declarations generate correctly
- [ ] README.md exists and is comprehensive
- [ ] package.json has all required fields
- [ ] Exports are properly configured

## Acceptance Criteria
- [ ] All packages are ready for npm publishing
- [ ] Versioning strategy is documented and automated
- [ ] Publishing workflow is tested and reliable
- [ ] Package quality meets professional standards
- [ ] Dependencies between packages are properly managed

## Priority
📦 **Medium** - Important for project distribution, but dependent on CLI implementation.

## Labels
`publishing`, `npm`, `versioning`, `infrastructure`
