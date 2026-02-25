/**
 * Catch-all route — renders the 404 UI for any path that doesn't match a real page.
 * Required because `output: "export"` (static export) can't do server-side 404 routing.
 * Next.js will pre-render this and serve it for all unknown routes via the host's fallback.
 */
export { default } from './404';
