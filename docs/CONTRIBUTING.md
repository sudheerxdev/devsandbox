# DevSandbox Contributing Guidelines

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Follow the [Setup Guide](./SETUP.md)
4. Create a feature branch

## Development Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive names:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 2. Make Your Changes

- Keep commits small and focused
- Write clear commit messages
- Follow code style guidelines
- Add tests for new functionality

### 3. Run Quality Checks

```bash
npm run lint          # Check code quality
npm run format        # Format code
npm run type-check    # Check TypeScript types
npm run test          # Run tests
```

### 4. Commit and Push

```bash
git add .
git commit -m "feat: add awesome feature"
git push origin feature/your-feature-name
```

### 5. Create Pull Request

- Use a descriptive title
- Reference related issues
- Describe your changes
- Include screenshots if applicable

## Coding Standards

### TypeScript/JavaScript

- Use strict mode
- Use const/let, avoid var
- Use arrow functions
- Add JSDoc comments for functions
- Keep functions focused and small

**Example**:
```typescript
/**
 * Analyzes a code repository
 * @param repositoryUrl - URL of the repository
 * @returns Analysis result
 */
export async function analyzeRepository(repositoryUrl: string): Promise<AnalysisResult> {
  // Implementation
}
```

### Python

- Follow PEP 8 style guide
- Use type hints
- Add docstrings
- Keep functions focused

**Example**:
```python
def analyze_repository(repository_url: str) -> AnalysisResult:
    """
    Analyze a code repository.
    
    Args:
        repository_url: URL of the repository to analyze
        
    Returns:
        AnalysisResult object with analysis data
    """
    # Implementation
```

### React Components

- Use functional components
- Use hooks
- Keep components focused
- Add prop types/interfaces

**Example**:
```typescript
interface DashboardProps {
  title?: string;
}

export function Dashboard({ title = 'Dashboard' }: DashboardProps) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

## Testing

### Unit Tests

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e
```

### Coverage Goals

- Aim for >80% coverage
- Test critical paths
- Test error cases

## Documentation

- Update README.md for significant changes
- Add code comments for complex logic
- Update ARCHITECTURE.md if structure changes
- Include JSDoc/docstring comments

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Tests
- `chore` - Maintenance

### Example
```
feat(analysis): add dependency graph generation

Implement new service for generating dependency graphs
from code AST. Includes cycle detection and visualization
support.

Fixes #123
```

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers
6. Address feedback
7. Squash commits if requested
8. Merge when approved

## Reporting Issues

### Security Issues

For security vulnerabilities, please email security@devsandbox.dev instead of using issues.

### Bug Reports

Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Error messages/logs

**Template**:
```
## Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happened

## Environment
- OS: 
- Node version:
- Browser:
```

### Feature Requests

- Clear description of feature
- Use case and motivation
- Proposed implementation (optional)
- Alternative solutions

## Review Process

Code reviews ensure:
- Quality standards are met
- Tests are adequate
- Documentation is clear
- No security issues

Reviewers will provide feedback within 2-3 business days.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to DevSandbox! 🚀
