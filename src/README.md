# Source Files Documentation

This directory contains utility files, type definitions, and documentation for the portfolio codebase.

## Utility Files

- **types.ts** - TypeScript type definitions used across the codebase (Breadcrumb, Action, SEOProps, PageProps)
- **constants.ts** - Site-wide constants (routes, URLs, categories, date formats)
- **utils.ts** - Utility functions (date formatting, text processing, URL generation, description generation)

## Documentation Files

- **issues.md** - Tracks all open issues that need to be addressed. Each issue has a title, severity, timestamp, heading, and description.
- **CHANGELOG.md** - Records all changes made to the codebase in reverse chronological order. Each change has a title, severity, timestamp, heading, and description.

## Usage

These files are imported throughout the codebase:

```typescript
import { ROUTES, SITE_URL } from "../constants";
import { formatDate } from "../utils";
import type { Breadcrumb, SEOProps } from "../types";
```

## Issue Tracking

When a new issue is identified:
1. Add it to `issues.md` with title, severity, timestamp, heading, and description
2. Once fixed, move the entry to `CHANGELOG.md` with the same format
3. Update the changelog entry with details of the fix
