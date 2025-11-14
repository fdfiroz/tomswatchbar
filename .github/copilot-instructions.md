<!-- Copilot instructions for this Hydrogen + Remix (React Router) project -->
# Copilot: Project Guidance

Overview: This repo is a Shopify Hydrogen app using React Router (file-based routes via `@react-router/fs-routes`) and runs on Oxygen (or mini-oxygen locally). Key entry points are `server.js` (worker fetch handler) and `app/entry.server.jsx` / `app/entry.client.jsx` for SSR + hydration.

Key Commands:
- `npm run dev`: Start Hydrogen dev server (uses `shopify hydrogen dev --codegen`).
- `npm run build`: Production build (`shopify hydrogen build --codegen`).
- `npm run preview`: Preview the built app (`shopify hydrogen preview --build`).
- `npm run codegen`: Run GraphQL and route type generation (`shopify hydrogen codegen && react-router typegen`).

Environment & Runtime:
- Node >= 18 is required (see `package.json`).
- `SESSION_SECRET` must be set for session handling (`app/lib/context.js` throws if missing).
- Public/private storefront tokens and domain env vars are consumed in loaders (see `app/root.jsx` and `app/lib/context.js`).

Architecture & Data Flow (short):
- `server.js` creates a Hydrogen router context (`createHydrogenRouterContext` in `app/lib/context.js`) then uses `createRequestHandler` with the virtual server build (`virtual:react-router/server-build`).
- `createHydrogenRouterContext` opens `caches.open('hydrogen')` and initializes `AppSession` (cookie session stored via `app/lib/session.js`). Commit of session -> `Set-Cookie` in `server.js` when pending.
- Routes are file-based (see `app/routes.js` using `flatRoutes()`); top-level route logic and data fetching live in `app/root.jsx` (critical vs deferred loaders, `shouldRevalidate` behavior).

Project conventions & patterns:
- Imports use `~` alias for the app root (e.g. `~/lib/context`)—configured via `vite-tsconfig-paths` in `vite.config.js`.
- Root loader: critical data is awaited; non-critical data is deferred (`loadCriticalData` / `loadDeferredData` in `app/root.jsx`). Avoid throwing in deferred loaders.
- `shouldRevalidate` is explicitly set to `false` by default in `app/root.jsx` to avoid refetching root queries on navigation; alter carefully.
- Styles are imported with `?url` in `root.jsx` to avoid a known HMR bug (see comment in file).

Integration points:
- Shopify Storefront APIs via Hydrogen's `storefront` client (used across `lib/fragments.js` and graphql helpers in `app/graphql`).
- Session management: custom `AppSession` wrapping `createCookieSessionStorage` (see `app/lib/session.js`). Any change to cookie options should be reflected here.
- Local preview uses `@shopify/mini-oxygen` (see `vite.config.js` plugins).

Files to reference when making changes:
- `server.js` — worker fetch handler, session commit, storefrontRedirect handling
- `app/lib/context.js` — Hydrogen context creation, cache and session bootstrapping
- `app/lib/session.js` — cookie session implementation
- `app/root.jsx` — root loader, loader patterns, CSP nonce usage, `shouldRevalidate`
- `app/entry.server.jsx` & `app/entry.client.jsx` — SSR and hydration, CSP nonce handling
- `app/routes/` — route files and conventions
- `vite.config.js` — dev/build plugins and SSR optimization includes

When editing code or implementing features:
- Match the repo's loader/deferred pattern: keep critical data blocking and mark other queries deferred (see `loadCriticalData` / `loadDeferredData`).
- Preserve CSP nonce handling (use `createContentSecurityPolicy` / `NonceProvider` as shown in `app/entry.server.jsx`).
- If adding new server-side functionality that uses sessions or caches, update `app/lib/context.js` to include/initialize any new clients in `additionalContext`.

Examples (quick references):
- To add a new root-level query: update `loadCriticalData` in `app/root.jsx` and add fragments to `app/lib/fragments.js`.
- To change cookie options: modify `app/lib/session.js` (cookie name, sameSite, httpOnly, secrets).

If anything here is unclear or you want more examples, tell me which area (routes, context/session, build flow, or CSP) to expand.
