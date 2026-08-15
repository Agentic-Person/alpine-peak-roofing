/**
 * Serializes a schema object for embedding in a server-rendered
 * <script type="application/ld+json"> tag.
 *
 * These tags must be emitted as literal markup rather than through next/script.
 * next/script defers even beforeInteractive JSON-LD into the hydration payload
 * (self.__next_s), so the structured data only becomes real <script> tags once
 * JavaScript runs. AI crawlers such as GPTBot, PerplexityBot and ClaudeBot do
 * not execute JavaScript, so schema injected that way is invisible to them.
 *
 * The `<` escape keeps a string value containing "</script>" from closing the
 * tag early. < is valid JSON and parses back to "<".
 */
export function jsonLdHtml(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
