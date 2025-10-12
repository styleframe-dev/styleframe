<div align="center">
  <img src="https://www.styleframe.dev/_vercel/image?url=%2Flogotype-light.svg&w=1536&q=100" alt="Styleframe" width="320" height="120">
  

  
  **Type-safe, Composable CSS in TypeScript**
  
  Write type-safe, composable, future-proof Design Systems code using styleframe's powerful TypeScript CSS API.
  
  [![npm version](https://img.shields.io/npm/v/styleframe.svg)](https://www.npmjs.com/package/styleframe)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/styleframe-dev/styleframe/blob/main/LICENSE)
  [![Discord](https://img.shields.io/discord/1395724958919032943?label=Discord&logo=discord)](https://discord.gg/KCVwuGz44M)
  
  [Homepage](https://styleframe.dev) · [Documentation](https://styleframe.dev/docs)
</div>

---

# styleframe
  
## ✨ Features

- **🛡️ Type-safe CSS API** - Catch style bugs at compile time with full TypeScript support
- **🧩 Composable & Modular** - Build design systems from reusable, focused functions
- **🎨 Built-in Theming** - Create light/dark modes and custom themes effortlessly
- **⚡ Framework Agnostic** - Works with React, Vue, Svelte, Solid, Astro, and more
- **🔥 First-class DX** - IDE auto-complete, in-editor docs, and static analysis

## 🚀 Quick Start

### Installation

```bash
# npm
npm install styleframe

# pnpm
pnpm add styleframe

# yarn
yarn add styleframe

# bun
bun add styleframe
```

### Initialization

```bash
npx styleframe init
```

This creates a `styleframe.config.ts` file in your project.

## 💡 Usage

```typescript
import { styleframe } from 'styleframe';

const s = styleframe();
const { variable, ref, selector, theme } = s;

// Define design tokens
const colorPrimary = variable('color--primary', '#006cff');
const spacing = variable('spacing--md', '1rem');

// Create styles
selector('.button', {
    backgroundColor: ref(colorPrimary),
    padding: ref(spacing),
    borderRadius: '4px',
    color: 'white',
    
    '&:hover': {
        opacity: 0.9,
    },
});

// Add dark theme
theme('dark', (ctx) => {
    ctx.variable(colorPrimary, '#60a5fa');
});

export default s;
```

### Build

```bash
npx styleframe build
```

This generates optimized CSS from your configuration.

## 📚 Documentation

Read the documentation at [https://styleframe.dev](https://styleframe.dev).

## 🎯 Why styleframe?



## 🔗 Framework Integration

Styleframe works seamlessly with any framework:

- **Vite** - Native plugin support
- **React** - Perfect for component libraries
- **Vue** - Full SFC compatibility  
- **Svelte** - Works out of the box
- **Astro** - Static site ready
- **Solid** - Reactive styling

See the [installation guide](https://styleframe.dev/docs/getting-started/installation/vite) for framework-specific setup.

## 📖 Documentation

- **[Getting Started](https://styleframe.dev/docs/getting-started/introduction)** - Learn the basics
- **[API Reference](https://styleframe.dev/docs/api/variables)** - Complete API documentation
- **[Guides](https://styleframe.dev/docs/resources/guides)** - Step-by-step tutorials
- **[Examples](https://github.com/styleframe-dev/examples)** - Real-world examples

## 🤝 Community

- **[Discord](https://discord.gg/KCVwuGz44M)** - Chat with the community
- **[GitHub Issues](https://github.com/styleframe-dev/styleframe/issues)** - Report bugs or request features
- **[Discussions](https://github.com/styleframe-dev/styleframe/discussions)** - Ask questions and share ideas

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/styleframe-dev/styleframe.git

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build
pnpm build
```

## 📝 License

Styleframe is [MIT licensed](https://github.com/styleframe-dev/styleframe/blob/main/LICENSE).

## 💎 Styleframe Pro

Looking for advanced features? Check out [Styleframe Pro](https://styleframe.dev/pricing) for:

- Premium composables and design tokens
- Advanced theming capabilities
- Priority support
- Commercial licenses

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/styleframe-dev">Styleframe</a></sub>
</div>
