# Reproduce the Assignment 4 tests

Use Node 22 or newer. Install dependencies with `npm ci` and `npm --prefix client ci`.

## Unit tests

Run `npm run test:unit`. Results are written to `test-results/unit-results.json`. React Testing Library and jsdom exercise Contact and Home, with fetch mocked to test success, pending and failure states.

## API integration

Start local MongoDB on port 27017 and run `npm test`. This script uses and drops only the isolated database `Assignment3Verification`; never point it at production.

## Cypress E2E

The GitHub Actions workflow handles setup automatically. To reproduce locally in PowerShell, start MongoDB, then run:

```powershell
$env:MONGODB_URI='mongodb://127.0.0.1:27017/PortfolioCypressA4'
npm run seed
npm --prefix client run build
$env:NODE_ENV='production'
$env:PORT='3004'
$env:JWT_SECRET='local-isolated-test-secret-only'
npm start
```

In a second terminal, run `npm run test:e2e`. The tests do not create production records. Contact failure is intentionally intercepted; navigation, health and protected requests use the real backend. Screenshots and actual videos are written to `cypress/screenshots` and `cypress/videos`. The CI artifact preserves these and the JUnit results. Windows sandbox restrictions prevented local Cypress startup in this session; the included successful run executed on GitHub's Ubuntu runner.

The recording is short because the five tests completed in approximately five seconds. Test source and machine-readable output are included for inspection.

## Performance and deployment

Build with `npm --prefix client run build`. Compare the initial index JavaScript bytes, not the sum of all lazy chunks. The saved before/after JSON, build log and cache-header results document the measurements. Render deploys the existing `main` branch automatically. The report contains the original live homepage, merged pull request and refreshed live homepage.
