# API Test Data and Client Guide

## Current API integration

The starter contains a Book Store API client at `src/api/bookstore.client.ts` and an API spec at `src/modules/bookstore/tests/bookstore-api.spec.ts`.

## Conventions for new API coverage

- Keep endpoint calls in API clients, not directly in Page Objects.
- Keep request/response types close to the client or in `src/data/types/` when shared.
- Keep generated request data in factories/builders.
- Validate status codes and meaningful response fields.
- Avoid hard-coded secrets. Use environment variables for credentials and tokens.
- Track created resource identifiers and clean them up when the API supports deletion.
- Document endpoints, auth requirements, request shape, response shape, retry/rate-limit behavior, and cleanup limitations.

When an API client changes, update this guide and the relevant module/test catalog entries.
