# Issues

This file tracks all issues that need to be addressed in the codebase. Each issue should have a title, severity, timestamp, heading, and description.

## Open Issues

### Performance: Image Optimization Needed
**Severity:** Medium  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Performance Optimizations

**Description:**  
External images (R2 URLs) are not using Astro's Image component for optimization. Consider using `@astrojs/image` or similar for optimization. Add `width` and `height` attributes to prevent layout shift.

---

### Accessibility: Skip-to-Content Link Missing
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Accessibility Improvements

**Description:**  
Consider adding a skip-to-content link for better keyboard navigation accessibility. This helps users with screen readers and keyboard-only navigation.

---

### Code Quality: Duplicate Code in Blog Pages
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Code Quality

**Description:**  
Blog, internal, and case study pages have similar structure. Consider creating a shared component or layout variant to reduce code duplication and improve maintainability.

---

### Documentation: README Enhancement Needed
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Documentation

**Description:**  
Current README is minimal. Should add: project description, tech stack overview, development workflow, deployment instructions, and content structure guide.

---

### Testing: No Test Suite
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Testing Infrastructure

**Description:**  
No test suite exists. Consider adding: unit tests for utilities, component tests, E2E tests for critical paths, and content validation tests.

---

### Configuration: Missing Package.json Scripts
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Configuration

**Description:**  
Missing useful scripts in package.json: `type-check`, `lint`, `format`. Consider adding these for better developer experience.

---

### Security: Content Security Policy Missing
**Severity:** Medium  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Security

**Description:**  
No Content Security Policy (CSP) headers configured. Consider adding security headers to improve site security.

---

### UI/UX: Loading States Missing
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** UI/UX Enhancements

**Description:**  
No loading indicators for dynamic content. Consider skeleton screens or loading states to improve perceived performance.

---

### Analytics: No Analytics or Monitoring
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Analytics & Monitoring

**Description:**  
No analytics or error tracking configured. Consider adding privacy-friendly analytics (e.g., Plausible, Fathom) and error tracking (e.g., Sentry).

---

### Content: Schema Validation Could Be Stricter
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Content Management

**Description:**  
Content schemas are good, but could be more strict. Consider adding validation for required fields based on category to catch content errors earlier.

---

## Resolved Issues

*All resolved issues have been moved to CHANGELOG.md*
