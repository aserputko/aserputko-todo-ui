---
name: fsd
description: 'Feature-Sliced Design (FSD) architecture for this React + Vite + TypeScript app using only the app, pages and shared layers. Use when creating or moving files, adding a page, component, hook, API call, or utility, deciding where code belongs, fixing imports, reviewing folder structure, or when the user mentions FSD, Feature Slice Design, layers, slices, segments, or public API.'
---

# FSD (Feature-Sliced Design) — app / pages / shared

Only three layers are in use. Do NOT create `widgets/`, `features/` or `entities/` until the user asks.

## Layers (top to bottom)

```
src/
  app/      # initialization: providers, router, global styles, entry wiring
  pages/    # one slice per screen/route
  shared/   # reusable code with no business/domain knowledge
```

**Import rule:** a layer may import only from layers strictly below it.
`app` -> `pages` -> `shared`. Never upward, never sideways between pages.

| From        | May import                                          |
| ----------- | --------------------------------------------------- |
| `app`       | `pages`, `shared`                                   |
| `pages/<a>` | `shared` only (NOT `pages/<b>`)                     |
| `shared`    | `shared` only (other segments inside shared are OK) |

## `app`

Application-wide setup. No slices, only segments.

```
app/
  providers/   # QueryClient, theme, router providers
  router/      # route table
  styles/      # global css (index.css, tailwind entry)
  App.tsx
```

`src/main.tsx` stays as the Vite entry and only imports `app`.

## `pages`

One slice per route. Everything specific to the screen lives inside the slice.

```
pages/
  todo-list/
    ui/          # TodoListPage.tsx and page-local components
    model/       # page state, hooks, selectors, types
    api/         # requests used only by this page
    lib/         # page-local helpers
    index.ts     # public API
```

- Include only the segments that are needed.
- Components/hooks used by a single page stay in that page. Move to `shared` only when a second page needs them AND they have no page/domain knowledge.
- Slice names: kebab-case, named by the screen (`todo-list`, `todo-details`).

## `shared`

Generic, domain-agnostic code. No slices, only segments; segments may import each other.

```
shared/
  ui/       # shadcn components (button.tsx, ...) and generic UI kit
  lib/      # utils.ts (cn), formatters, generic hooks
  api/      # http client, base URL, interceptors, generic API types
  config/   # env, constants
  assets/   # images, fonts, icons
```

Rule: if it mentions "todo" or any business concept, it does NOT belong in `shared`.

## Public API

Each page slice exposes an `index.ts`; outside code imports only from it.

```ts
// good
import { TodoListPage } from '@/pages/todo-list';
// bad
import { TodoListPage } from '@/pages/todo-list/ui/TodoListPage';
```

For `shared`, import from the segment path (`@/shared/ui/button`, `@/shared/lib/utils`) — no single barrel for the whole layer, to keep tree-shaking and avoid cycles.

Inside a slice use relative imports; across layers use the `@/` alias.

## Decision flow: where does this code go?

1. App bootstrap, providers, routing, global styles? -> `app`
2. Used by one screen only? -> that `pages/<slice>` (pick segment: ui / model / api / lib)
3. Reusable and free of business knowledge? -> `shared/<segment>`
4. Reusable but business-specific (used by 2+ pages)? -> keep it in the owning page and import via its public API only if the layering allows; otherwise duplicate minimally or ask the user about introducing `features`/`entities`.

## Segments naming

`ui` (components), `model` (state, hooks, types, business logic), `api` (requests), `lib` (helpers), `config` (constants). Name segments by purpose, never by essence (`components/`, `hooks/`, `types/` are discouraged).

## Project-specific notes

- Alias `@/*` -> `src/*` is already configured in `tsconfig.app.json` / Vite.
- Existing `src/components/ui/*` -> migrate to `src/shared/ui/*`; `src/lib/utils.ts` -> `src/shared/lib/utils.ts`.
- shadcn `components.json` aliases must match the new layout (`ui` -> `@/shared/ui`, `utils` -> `@/shared/lib/utils`, `lib` -> `@/shared/lib`, `components` -> `@/shared/ui`, `hooks` -> `@/shared/lib`). Update them when moving files so `shadcn add` generates into `shared`.
- Move `src/index.css` to `src/app/styles/` and update the import and the `tailwind.css` path in `components.json`.

## Checklist before finishing

- [ ] No upward imports (`shared` -> `pages`, `pages` -> `app`)
- [ ] No page-to-page imports
- [ ] Cross-slice imports go through `index.ts`
- [ ] Nothing business-specific in `shared`
- [ ] No `widgets/`, `features/`, `entities/` folders created
- [ ] Imports updated after moving files; `tsc -b` and lint pass
