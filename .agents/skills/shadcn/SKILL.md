---
name: shadcn
description: Use when the user asks to add or adapt shadcn/ui components, apply shadcn patterns to a component, or work with a shadcn registry. Keep shadcn-specific conventions scoped to the requested integration.
---

# shadcn/ui in b-r.io

This project currently uses its own React components and Tailwind CSS design tokens rather than shadcn/ui. Treat shadcn as an optional source of compositional and accessibility patterns, not as the project's default component system.

## Workflow

1. Inspect the existing component, tokens, and established interaction patterns first. Reuse project components when they already meet the need.
2. Only add shadcn/ui or registry code when the user requests it or the task clearly calls for a shadcn integration. Do not initialize shadcn, add dependencies, or migrate existing UI as a side effect of consulting this skill.
3. If integrating a shadcn component, check the current official documentation and CLI for its API. Confirm that its primitive library, icon set, aliases, and Tailwind version match this repo before copying code.
4. Adapt imported examples to this project's semantic color and spacing tokens, component conventions, and accessibility requirements. Avoid introducing a second visual system.
5. Read and review every added or changed file. Preserve keyboard behavior, visible focus, reduced-motion support, and the existing responsive layout.

## Useful shadcn principles

- Compose focused components instead of building large, tightly coupled UI blocks.
- Prefer semantic theme tokens and consistent spacing over one-off visual values.
- Use the component's documented composition and accessibility APIs instead of recreating interaction behavior by hand.
- Keep variants and component APIs explicit; use project utilities for conditional class composition.

## References

- Official skill and workflow: [shadcn/ui skill](https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/SKILL.md)
- Official component documentation: [ui.shadcn.com/docs](https://ui.shadcn.com/docs)
