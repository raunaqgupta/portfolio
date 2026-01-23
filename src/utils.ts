// Utility functions

import { DATE_FORMAT } from "./constants";

/**
 * Formats a date according to the site's standard format
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", DATE_FORMAT);
}

/**
 * Generates a canonical URL for a page
 */
export function getCanonicalUrl(path: string, siteUrl: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${cleanPath}`;
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generates a description from content or uses a fallback
 */
export function getDescription(
  description?: string,
  content?: string,
  fallback: string = "Personal website of Raunaq Gupta"
): string {
  if (description) return description;
  if (content) {
    // Extract first paragraph or truncate content
    const firstParagraph = content.split("\n\n")[0];
    return truncateText(firstParagraph.replace(/[#*`]/g, "").trim(), 160);
  }
  return fallback;
}
