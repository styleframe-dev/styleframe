# Set Up CI/CD Pipeline and GitHub Templates

## Overview
Implement GitHub Actions workflows for automated testing, building, and publishing, plus GitHub issue/PR templates.

## Description
The project needs automated CI/CD pipeline for quality assurance and streamlined contribution process with proper templates.

## Tasks

### GitHub Actions Workflows
- [ ] Create `.github/workflows/ci.yml` for:
  - Run tests on Node.js 22+ and multiple OS (Ubuntu, macOS, Windows)
  - Run linting (oxlint) and formatting checks (biome)
  - Type checking with TypeScript
  - Build all packages with turbo
  - Test coverage reporting
  - Cache pnpm and node_modules properly
- [ ] Create `.github/workflows/release.yml` for:
  - Automated package publishing to npm
  - Semantic versioning with conventional commits
  - Release notes generation
  - Triggered on main branch or release tags

### GitHub Templates
- [ ] Create `.github/ISSUE_TEMPLATE/bug_report.yml` with:
  - Styleframe version
  - Node.js version
  - Package manager version
  - Minimal reproduction
  - Expected vs actual behavior
- [ ] Create `.github/ISSUE_TEMPLATE/feature_request.yml` with:
  - Problem description
  - Proposed solution
  - Alternative solutions considered
  - API design considerations
- [ ] Create `.github/ISSUE_TEMPLATE/documentation.yml` for doc improvements
- [ ] Create `.github/pull_request_template.md` with:
  - Change description
  - Testing checklist
  - Breaking changes section
  - Documentation updates

### Repository Configuration
- [ ] Create `.github/CODEOWNERS` file
- [ ] Set up branch protection rules (via issue description)
- [ ] Configure automatic dependency updates with Renovate or Dependabot
- [ ] Set up proper labels for issue categorization

## Acceptance Criteria
- [ ] CI runs on every PR with comprehensive checks
- [ ] Failed CI blocks PR merging
- [ ] Release workflow publishes packages automatically
- [ ] Issue templates guide users to provide necessary information
- [ ] PR template ensures consistent contribution quality

## Branch Protection Rules (Manual Setup)
- Require PR reviews (1+ reviewer)
- Require status checks to pass
- Require branches to be up to date
- Include administrators in restrictions
- Allow force pushes (for maintainers)

## Priority
⚡ **High** - Essential for maintaining code quality and project scalability.

## Labels
`ci/cd`, `github`, `automation`, `infrastructure`
