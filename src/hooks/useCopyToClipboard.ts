import { useState, useCallback } from 'react';

/**
 * Hook for copying text to clipboard with temporary feedback
 * @param timeout Duration in milliseconds for feedback to display
 * @returns [copiedText, copyToClipboard] tuple
 */
export function useCopyToClipboard(timeout = 2000) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), timeout);
  }, [timeout]);

  return [copiedText, copyToClipboard] as const;
} 