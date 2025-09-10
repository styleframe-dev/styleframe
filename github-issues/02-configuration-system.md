# Implement Configuration System

## Overview
Create a configuration system using `c12` that loads `styleframe.config.ts` files exporting Styleframe instances.

## Description
The CLI documentation references a configuration file that exports a Styleframe instance. We need to implement configuration loading using `c12` for TypeScript support.

## Tasks
- [ ] Add `c12` dependency to CLI package
- [ ] Implement configuration loading with `c12`:
  - Support only TypeScript configs (`styleframe.config.ts`)
  - Load configuration that exports Styleframe instance
  - Handle TypeScript compilation via `c12`
- [ ] Add configuration validation to ensure exported value is a Styleframe instance
- [ ] Create default configuration template for `init` command:
  ```typescript
  import { styleframe } from '@styleframe/core';
  
  export default styleframe({
    // user options here
  });
  ```
- [ ] Integrate configuration loading with build pipeline
- [ ] Add helpful error messages for invalid configurations
- [ ] Write tests for configuration loading and validation
- [ ] Update CLI to use loaded Styleframe instance for builds

## Configuration Flow
1. CLI loads `styleframe.config.ts` using `c12`
2. Configuration file exports a Styleframe instance
3. CLI uses the instance's root and options for building
4. Generated CSS comes from the configured Styleframe instance

## Acceptance Criteria
- [ ] Users can create `styleframe.config.ts` that exports Styleframe instance
- [ ] `c12` properly loads and compiles TypeScript configuration
- [ ] Configuration validation ensures exported value is Styleframe instance
- [ ] CLI `init` command creates proper configuration template
- [ ] Build command uses loaded configuration correctly
- [ ] Clear error messages for configuration issues

## Priority
🔥 **High** - Required for CLI functionality and matches the documented approach.

## Labels
`enhancement`, `configuration`, `cli`, `c12`
