# Module Catalog

Only modules with code in the repository are marked `Implemented`. Planned modules must not be represented as completed automation.

| Module | Current implementation | Coverage | Status | README |
|---|---|---|---|---|
| Elements | Text Box Page Object and spec | Submit values and verify output | Implemented (partial) | [src/modules/elements/README.md](../src/modules/elements/README.md) |
| Forms | Practice Form Page Object and spec | Dynamic student data and form submission | Implemented (partial) | [src/modules/forms/README.md](../src/modules/forms/README.md) |
| Book Store | API client and API spec | Account/token and collection workflow | Implemented (partial) | [src/modules/bookstore/README.md](../src/modules/bookstore/README.md) |
| Factory checks | Factory behavior specs | Uniqueness, overrides and builder behavior | Implemented | [src/modules/factories/README.md](../src/modules/factories/README.md) |
| Alerts, Frames & Windows | Not yet implemented | Planned | Planned | — |
| Widgets | Not yet implemented | Planned | Planned | — |
| Interactions | Not yet implemented | Planned | Planned | — |

All implemented modules' Page Objects now follow the `BasePage` readiness contract
(`path` / `waitForLoaded()` / `open()`) and the role/label/placeholder selector
policy — see `docs/ARCHITECTURE.md` §5a and §6.

## Module conventions

Each implemented module should keep its own Page Objects, components, factories (only when domain-specific data is needed), and tests together under `src/modules/<module>/`.

Add `src/modules/<module>/README.md` when a module is introduced. It should describe scope, navigation, Page Objects, test data, dependencies, cleanup, test commands, known limitations, and coverage links. Update this catalog whenever module status or scope changes.
