# Configuration Guide

## Runtime requirements

- Node.js 20 or later
- npm
- Playwright-managed browser binaries (Chromium for the current CI workflow)

## Environment

Copy `.env.example` to `.env` when environment-specific values are required. Never commit real credentials, access tokens, or production secrets.

## Common commands

```bash
npm install
npx playwright install chromium
npm run typecheck
npm test
npm run test:smoke
npm run test:regression
npm run test:api
npm run report
npm run docs:check
```

## Configuration changes

When changing `playwright.config.ts`, `package.json`, `.env.example`, browser projects, retries, workers, reporters, or CI workflows, update this guide and the root README in the same pull request.
