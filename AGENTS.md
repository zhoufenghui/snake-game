# Agent Guidelines for snake-game

## Project Overview

This is a simple snake game built with vanilla JavaScript using Vite as the build tool. The project uses ES modules and modern JavaScript features.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

**Note:** This project does not currently have testing, linting, or type checking configured.

## Code Style Guidelines

### JavaScript/ES Modules

- Use ES6 modules with `export` and `import` statements
- Do not use semicolons (following project convention)
- Use single quotes for strings, double quotes for HTML template literals
- Use 2 spaces for indentation
- Use arrow functions for callbacks and short functions
- Use camelCase for variables and function names: `counter`, `setupCounter`, `getScore`
- Use PascalCase for constructors/classes if needed
- Keep functions small and focused on single responsibility

### Import/Export Style

```javascript
// Good - named exports
export function setupCounter(element) { }

// Good - importing named exports
import { setupCounter } from './counter.js'

// Good - default imports for resources
import './style.css'
import logo from './logo.svg'
```

### HTML and DOM Manipulation

- Use template literals for HTML strings
- Use `querySelector` and `querySelectorAll` for DOM selection
- Prefer textContent over innerHTML when setting plain text
- Use event listeners for interactivity

```javascript
// Good
document.querySelector('#app').innerHTML = `<div>${content}</div>`
element.addEventListener('click', handler)
```

### CSS Styling

- Use kebab-case for class names and IDs: `.logo`, `#app`
- Use CSS custom properties (variables) for theme colors
- Include both light and dark mode via `prefers-color-scheme`
- Use semantic element selectors when appropriate
- Keep styles organized by component or feature

### File Organization

- Keep source files in `src/` directory
- Place static assets in `src/` (imported via Vite) or `public/` (copied as-is)
- Name files descriptively: `counter.js`, `style.css`
- Use `.js` extension for module files

### Error Handling

- Wrap code that may throw errors in try-catch blocks
- Provide meaningful error messages
- Consider error boundaries or user feedback for critical errors

### Best Practices

- Prefer explicit code over implicit magic
- Use meaningful variable and function names
- Add comments only for complex logic (none needed for obvious code)
- Keep functions under 30 lines when possible
- Extract reusable logic into separate functions
- Avoid global state; prefer function parameters or closures

### Game Development Specifics

- Use requestAnimationFrame for smooth animations
- Separate game logic from rendering
- Use canvas or DOM based on performance needs
- Implement game loops with proper timing
- Handle user input with event listeners

### Module Resolution

- Use relative imports with file extensions: `import { fn } from './module.js'`
- Absolute imports from root: `import { fn } from '/src/module.js'`
- Asset imports: Vite handles SVG, CSS, and other asset imports automatically

## Testing

No test framework is currently configured. When adding tests:
1. Choose a framework (Vitest recommended for Vite projects)
2. Add test configuration to package.json scripts
3. Run tests with `npm run test`
4. Run specific tests with framework-specific patterns

## Build Process

The build process uses Vite with default configuration. Build outputs go to `dist/` directory. When making changes that affect the build:

1. Test in development mode first (`npm run dev`)
2. Build locally to verify (`npm run build`)
3. Preview build (`npm run preview`)

## Notes

- This project uses Vite 8.0.0-beta.13
- No type checking is configured (TypeScript not in use)
- No linting is configured (ESLint, Prettier not in use)
- Follow the existing code style when making changes
- Keep the simple, vanilla JavaScript approach
