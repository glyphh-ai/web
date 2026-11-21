"use client";

import { useEffect } from 'react';

/** Marks <html> while a docs page is mounted so the page scrollbar can be themed. */
export default function DocsHtmlClass() {
  useEffect(() => {
    document.documentElement.classList.add('docs-html');
    return () => document.documentElement.classList.remove('docs-html');
  }, []);
  return null;
}
