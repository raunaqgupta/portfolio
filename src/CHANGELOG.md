# Changelog

This file shows all changes made to the codebase in reverse chronological order. Each change has a title, severity, timestamp, heading, and description.

---

## Codebase Reorganization: Moved Files from .ai to src
**Severity:** Low  
**Timestamp:** 2026-01-23T14:20:00Z  
**Heading:** Project Structure

**Description:**  
Moved all files from `src/.ai/` directory directly to `src/` directory. Renamed `IMPROVEMENTS.md` to `issues.md` and updated file formats. Updated all import paths to reflect new file locations. Deleted `.ai` folder.

---

## TypeScript: Enhanced Type Safety
**Severity:** Medium  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** TypeScript Improvements

**Description:**  
Created comprehensive type definitions in `types.ts` for Breadcrumb, Action, SEOProps, and PageProps. Added TypeScript interfaces to all layout and page components. Enhanced tsconfig.json with stricter settings: enabled strict mode, noUnusedLocals, noUnusedParameters, and noImplicitReturns.

---

## Code Quality: Created Utility Functions and Constants
**Severity:** Medium  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Code Quality

**Description:**  
Created `utils.ts` with utility functions: `formatDate()` for consistent date formatting, `getCanonicalUrl()` for generating canonical URLs, `truncateText()` for text truncation, and `getDescription()` for smart description generation. Created `constants.ts` with site-wide constants including routes, URLs, categories, and date formats. This eliminates magic strings and code duplication.

---

## Error Handling: Added Comprehensive Error Handling
**Severity:** High  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Error Handling

**Description:**  
Added try-catch blocks around all `getCollection` calls throughout the codebase. Added null checks for entries and redirect to 404 page when entry is missing. Added error handling for collection article lookups with fallback values. All errors are logged with console.error for debugging.

---

## Code Quality: Removed Commented Code
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Code Quality

**Description:**  
Removed all commented-out code including: breadcrumbs code in pageLayout.astro, category filter code in blog.astro, and case studies display code in resume.astro. Cleaned up codebase for better maintainability.

---

## Accessibility: Enabled Breadcrumbs and Added Alt Text
**Severity:** Medium  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Accessibility Improvements

**Description:**  
Uncommented and enabled breadcrumbs component in pageLayout.astro. Breadcrumbs now display on all pages that provide them. Added descriptive alt text to all gallery images in gallery.astro component. Added `loading="lazy"` attribute for performance.

---

## SEO: Comprehensive SEO Enhancements
**Severity:** High  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** SEO Enhancements

**Description:**  
Enhanced head.astro component with support for dynamic meta descriptions, Open Graph tags (title, description, image, type, site_name), Twitter Card meta tags, canonical URLs, and article-specific meta tags (published_time, modified_time, author). Updated all pages to pass SEO metadata to layouts. Dynamic descriptions are generated from content when not provided. Proper canonical URLs added for all pages. Article type set for blog posts and case studies.

---

## Bug Fix: Fixed Broken HTML Attribute
**Severity:** High  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Critical Bug Fixes

**Description:**  
Fixed malformed `id` attribute in portfolio.astro (line 35) that contained a newline character. Changed from `id="\n      work-experience"` to `id="work-experience"`.

---

## Bug Fix: Added Missing Alt Text to Gallery Images
**Severity:** High  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Critical Bug Fixes

**Description:**  
Added missing alt text to gallery images in gallery.astro component. Gallery images now have descriptive alt text (e.g., "Gallery image 1", "Gallery image 2") for accessibility compliance. Also added `loading="lazy"` attribute for performance.

---

## Bug Fix: Fixed Button Event Handler
**Severity:** High  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Critical Bug Fixes

**Description:**  
Fixed incorrect button event handler in button.astro. Changed from `onclick={url}` (which is invalid) to `data-action={url}` with `type="button"` attribute. This ensures proper button behavior and accessibility.

---

## Bug Fix: Fixed Invalid HTML Attribute
**Severity:** High  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Critical Bug Fixes

**Description:**  
Removed invalid `closedby="any"` attribute from `<dialog>` element in modal.astro. This attribute is not part of the HTML specification and was causing validation errors.

---

## Bug Fix: Removed Debug Code
**Severity:** Medium  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** Critical Bug Fixes

**Description:**  
Removed `console.log("Next button clicked")` debug statement from modal.astro component. Debug code should not be present in production builds.

---

## UI/UX: Enhanced 404 Page
**Severity:** Low  
**Timestamp:** 2026-01-23T14:16:00Z  
**Heading:** UI/UX Enhancements

**Description:**  
Enhanced 404.astro page with better structure, proper SEO metadata, robots noindex tag, and a link back to home page. Improved user experience for error pages.
