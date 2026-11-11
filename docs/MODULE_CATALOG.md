# Module Catalog

Only modules with code in the repository are marked `Implemented`. Planned modules must not be represented as completed automation.

| Module | Current implementation | Coverage | Status | README |
|---|---|---|---|---|
| Elements | Text Box Page Object and spec | Submit values and verify output | Implemented (partial) | [src/specs/elements/README.md](../src/specs/elements/README.md) |
| Forms | Practice Form Page Object and spec | Dynamic student data and form submission | Implemented (partial) | [src/specs/forms/README.md](../src/specs/forms/README.md) |
| Book Store | API client and API spec | Account/token and collection workflow | Implemented (partial) | [src/specs/bookstore/README.md](../src/specs/bookstore/README.md) |
| Factory checks | Factory behavior specs | Uniqueness, overrides and builder behavior | Implemented | [src/specs/factories/README.md](../src/specs/factories/README.md) |
| Alerts, Frames & Windows | Not yet implemented | Planned | Planned | — |
| Widgets | Not yet implemented | Planned | Planned | — |
| Interactions | Not yet implemented | Planned | Planned | — |

All implemented modules' Page Objects now follow the `BasePage` readiness contract
(`path` / `waitForLoaded()` / `open()`) and the role/label/placeholder selector
policy — see `docs/ARCHITECTURE.md` §5a and §6.

## Module conventions

Each implemented module keeps its Page Objects/components under `src/pages/<module>/` and its specs (plus that module's `README.md`) under `src/specs/<module>/` — layer-first, matching core-pw-e2e-tests' convention. Factories (only when domain-specific data is needed) live in the shared `src/data/factories/`, not inside the module folder.

Add `src/specs/<module>/README.md` when a module is introduced. It should describe scope, navigation, Page Objects, test data, dependencies, cleanup, test commands, known limitations, and coverage links. Update this catalog whenever module status or scope changes.
