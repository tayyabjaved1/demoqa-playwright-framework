# Fixture and Test Lifecycle Guide

## Purpose

Fixtures provide reusable dependencies and manage setup/teardown around Playwright tests. Keep business assertions in specs and UI behavior in Page Objects.

## Current fixture entry point

- `src/fixtures/test.fixture.ts` is the shared fixture entry point.
- Specs should import the extended `test` and `expect` from this module when they need the framework-provided fixtures.

## Lifecycle expectations

1. Create test-scoped data for the current test.
2. Create persisted backend records only through a supported API or UI workflow.
3. Yield the resource to the test.
4. Clean up persisted resources in `finally` or fixture teardown.
5. Do not share mutable accounts or records between parallel tests unless the resource is explicitly designed for safe sharing.

## When changing fixtures

Document fixture name, type, scope, dependencies, setup behavior, teardown behavior, and whether cleanup can fail. Update `ARCHITECTURE.md`, this guide, and relevant examples when fixture behavior changes.

## Important distinction

A factory generates data objects. A fixture may create a persisted application resource and own its lifecycle. Do not describe in-memory factory output as a created backend record.
