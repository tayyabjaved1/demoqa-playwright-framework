# Documentation as Code Policy

## Purpose

Documentation is maintained as part of the product, not as a one-time handover. A code change is not complete until the relevant documentation, examples, and coverage records describe the new behavior.

## Source of truth

- Executable behavior and types are authoritative for implementation details.
- `docs/` explains architecture, conventions, workflows, and test coverage.
- Each module has a section in `docs/MODULE_CATALOG.md` for module-specific setup, workflows, and known limitations — centralized, not a README per module (matching core-pw-e2e-tests' approach).
- `docs/TEST_CATALOG.md` and `docs/TRACEABILITY.md` describe the current automated scenarios. Removed tests must be removed from these records in the same change.
- `docs/CHANGELOG.md` records notable framework and coverage changes.

Do not document behavior that the code does not implement. If implementation and documentation disagree, resolve the mismatch in the same pull request.

## Required update matrix

| Change | Required documentation |
|---|---|
| New/changed/removed test spec | `docs/TEST_CATALOG.md`, `docs/TRACEABILITY.md`; update that module's `docs/MODULE_CATALOG.md` section when module behavior or setup changes |
| New/changed/removed factory, generator, builder, trait or schema | `docs/DATA_FACTORY_GUIDE.md`, `docs/FACTORY_CATALOG.md`; update examples/types when public factory behavior changes |
| New/changed/removed module or Page Object/component | `docs/MODULE_CATALOG.md` (summary table row + module section); update test catalog if coverage changes |
| Fixture or test lifecycle change | `docs/ARCHITECTURE.md`, `docs/FIXTURE_GUIDE.md`, and relevant authoring examples |
| API client/endpoint/helper change | `docs/API_GUIDE.md`; update module and test catalog if usage or coverage changes |
| Playwright/npm/env/CI configuration change | `README.md`, `docs/CONFIGURATION.md`; update workflow docs if CI behavior changes |
| Architecture boundary or shared core change | `docs/ARCHITECTURE.md` and relevant specialized guide |
| Breaking change | All affected guides plus `docs/CHANGELOG.md` with migration instructions |

## Pull request workflow

1. Identify the behavior being added, changed, or removed.
2. Update implementation and tests.
3. Update every documentation file listed in the change matrix.
4. Update test catalog and traceability entries when scenarios are added, changed, renamed, skipped, or removed.
5. Add a concise entry to `docs/CHANGELOG.md` for meaningful user-facing changes.
6. Run `npm run typecheck`, relevant tests, and `npm run docs:check`.
7. In the PR description, explain which docs changed. If no docs change is needed, explain why and use the `docs-not-required` label only for genuinely non-behavioral changes (formatting, comments, internal refactors with no public workflow impact).

## Documentation quality rules

- Keep examples executable or clearly label them as pseudocode.
- Use paths and commands that exist in the current repository.
- Never claim a test is implemented unless a corresponding spec exists.
- Keep coverage status explicit: `Implemented`, `Planned`, `Blocked`, or `Removed`.
- Include data ownership, cleanup behavior, uniqueness guarantees, and limitations for every new factory.
- Update links when files are renamed or removed.
- Prefer updating an existing guide over creating duplicate overlapping guides.

## Automation boundary

The `docs:check` script is a guardrail. It detects common source-code changes and requires the corresponding documentation files to be included in the same diff. It cannot judge whether prose is accurate or complete; reviewers remain responsible for semantic review.
