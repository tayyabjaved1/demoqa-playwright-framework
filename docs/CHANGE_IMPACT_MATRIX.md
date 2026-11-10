# Change Impact Matrix

Use this checklist before opening a pull request.

| I changed... | Check these areas | Expected evidence |
|---|---|---|
| Factory/generator/builder/type | Factory guide, factory catalog, examples, factory tests | New behavior, fields, constraints and uniqueness documented |
| Spec file | Test catalog, traceability, module README if relevant | Scenario, tags, preconditions and assertions accurately listed |
| Page Object/component | Module catalog, module README, test authoring guide if convention changed | Public methods, locator strategy and usage example documented |
| Fixture | Architecture, fixture guide, authoring examples | Scope, setup, teardown, dependencies and cleanup documented |
| API client | API guide and relevant module guide | Endpoint, payload, auth, response and cleanup behavior documented |
| Config/CI/dependencies | README and configuration guide | New env vars, commands, versions and pipeline behavior documented |
| Removal/deprecation | All references, catalogs, examples and changelog | No stale links or claims; replacement/migration noted |

## Removal-specific checks

- [ ] Remove deleted scenarios from `TEST_CATALOG.md` and `TRACEABILITY.md`.
- [ ] Remove or mark removed factories and modules in their catalogs.
- [ ] Search the repository for old names, paths, commands, and environment variables.
- [ ] Remove stale examples and links.
- [ ] Record breaking changes and migration steps in `CHANGELOG.md`.
