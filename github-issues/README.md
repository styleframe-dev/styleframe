# Styleframe Project Completion Issues

This directory contains GitHub issues for completing the Styleframe project. Copy and paste these into GitHub Issues to track the remaining work.

## High Priority Issues (🔥)

### 1. Implement CLI Package
**File:** `01-cli-package.md`
- Create `@styleframe/cli` package with `init` and `build` commands
- Essential for user onboarding and matches documented functionality
- **Dependencies:** None

### 2. Implement Configuration System  
**File:** `02-configuration-system.md`
- Use `c12` to load TypeScript config files that export Styleframe instances
- Required for CLI functionality
- **Dependencies:** CLI package

### 7. Complete Core API Implementation
**File:** `07-core-api-improvements.md`
- Finalize at-rule system and token implementations
- Ensure API stability and comprehensive test coverage
- **Dependencies:** None (can work in parallel)

### 4. Set Up CI/CD Pipeline and GitHub Templates
**File:** `04-ci-cd-github-setup.md`
- GitHub Actions for testing, building, and publishing
- Issue and PR templates for contribution workflow
- **Dependencies:** None

### 8. Enhance Transpiler Package
**File:** `08-transpiler-enhancements.md`
- Improve CSS generation and optimization features
- Essential for producing quality output
- **Dependencies:** Core API completion

## Medium Priority Issues (📋📚📦)

### 3. Add Essential Project Documentation
**File:** `03-project-documentation.md`
- README.md, CONTRIBUTING.md, LICENSE, and package docs
- Important for project professionalism
- **Dependencies:** None

### 5. Prepare Packages for Publishing
**File:** `05-package-publishing.md`
- Configure packages for npm publishing with proper versioning
- **Dependencies:** CLI package, Core API completion

### 6. Create Examples and Starter Templates
**File:** `06-examples-templates.md`
- Framework examples and starter templates for user onboarding
- **Dependencies:** CLI package, Core API stability

## Recommended Implementation Order

1. **Core API Implementation** (#7) - Stabilize the foundation
2. **Transpiler Enhancements** (#8) - Ensure quality CSS output  
3. **CLI Package** (#1) - Enable user interaction
4. **Configuration System** (#2) - Complete CLI functionality
5. **CI/CD Setup** (#4) - Automate quality assurance
6. **Project Documentation** (#3) - Professional presentation
7. **Package Publishing** (#5) - Make packages available
8. **Examples & Templates** (#6) - Improve user onboarding

## Issue Creation Instructions

1. Copy the content from each `.md` file
2. Create a new GitHub issue in the styleframe repository
3. Paste the content as the issue description
4. Add the suggested labels to each issue
5. Assign to appropriate milestone if using milestones

## Notes

- All issues include detailed task breakdowns and acceptance criteria
- Issues are designed to be implementable by contributors
- Some issues can be worked on in parallel
- Documentation assumes the existing monorepo structure with pnpm + Turbo
