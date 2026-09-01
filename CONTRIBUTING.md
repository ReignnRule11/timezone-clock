# Timezone Clock — Contributing Guide

Thanks for your interest in contributing to Timezone Clock! This guide will help you get started.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/timezone-clock.git
   cd timezone-clock
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Start Development Server
```bash
npm run dev
```

### Run Linter
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

### Build for Production
```bash
npm run build
```

## Code Style Guidelines

- Use **functional components** with React Hooks
- Write **meaningful commit messages**
- Keep components **small and focused** (single responsibility)
- Use **CSS modules** or **scoped CSS** to avoid conflicts
- Add **comments** for complex logic
- Write **accessible HTML** with proper ARIA labels

## Adding New Features

### Adding a New Timezone

1. Add to `src/constants/timezones.js`:
   ```javascript
   export const ALL_TIMEZONES = [
     // ... existing timezones
     'Your/Timezone',
   ];
   
   export const TIMEZONE_CITY_MAP = {
     // ... existing mappings
     'Your/Timezone': 'City Name',
   };
   ```

2. Test by searching for the timezone in the UI

### Adding a New Component

1. Create component in `src/components/`
2. Create corresponding styles in `src/styles/`
3. Import and use in `App.jsx`
4. Follow the existing pattern and naming conventions

## Commit Message Convention

Use clear, descriptive commit messages:

```bash
# Feature
git commit -m "feat: Add timezone search functionality"

# Bug fix
git commit -m "fix: Correct DST calculation for Australia/Sydney"

# Style/formatting
git commit -m "style: Format code with Prettier"

# Documentation
git commit -m "docs: Update README with deployment instructions"
```

## Pull Request Process

1. **Update** your branch:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Push** your changes:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create** a Pull Request on GitHub with:
   - Clear title and description
   - Reference to any related issues
   - Screenshots (if UI changes)
   - Testing notes

4. **Address** any feedback from reviewers

## Testing

- Test across **multiple browsers** (Chrome, Firefox, Safari, Edge)
- Test on **mobile devices** or use browser dev tools
- Test **theme switching** and **time format toggle**
- Test **timezone addition/removal**
- Test **local storage persistence**

## Reporting Issues

Found a bug? Create an issue with:

1. **Clear description** of the problem
2. **Steps to reproduce** the issue
3. **Expected vs actual** behavior
4. **Browser and OS** information
5. **Screenshots** if applicable

## Questions?

Reach out:
- **WhatsApp:** [+234 902 143 0871](https://wa.me/2349021430871)
- **LinkedIn:** [Justus Okoro](https://www.linkedin.com/in/justus-okoro-358025199)
- **GitHub Issues:** [Open an issue](https://github.com/ReignnRule11/timezone-clock/issues)

---

**Thank you for contributing! 🎉**
