# Assignment 4 submission

Vitaliy Kulesh — 301559060 — COMP229 Web Application Development

## Required submission

- [Deployed portfolio](https://comp229-assignment3-portfolio.onrender.com/)
- [GitHub repository](https://github.com/vkulesh-netizen/COMP229-Assignment3-Portfolio)
- [Word snapshot report](Assignment4_Testing_Deployment_Report.docx)

## Testing and release evidence

- [Download the complete submission package](Assignment4_Submission_Package.zip)
- [Cypress E2E recording](Assignment4_Cypress_E2E_Recording.mp4)
- [Cypress screenshots and machine-readable results](Assignment4_Cypress_Evidence.zip)
- [Project source ZIP](Assignment4_SOURCE.zip)
- [Unit test source](../../client/tests/Contact.test.tsx)
- [Cypress test source](../../cypress/e2e/portfolio.cy.cjs)
- [CI workflow](../../.github/workflows/portfolio-ci.yml)
- [Successful CI run](https://github.com/vkulesh-netizen/COMP229-Assignment3-Portfolio/actions/runs/39884604140)
- [Merged release pull request](https://github.com/vkulesh-netizen/COMP229-Assignment3-Portfolio/pull/1)
- [Before deployment](01-live-before.png) and [after deployment](08-live-after.png)
- [Reproduction instructions](TESTING.md)

Six React unit tests and five Cypress E2E tests passed. API integration and production-build checks passed. Cypress recorded the real browser execution on an isolated MongoDB service in GitHub Actions; it is not a narrated slideshow. AI assisted test authoring.

The initial production JavaScript decreased from 185118 to 170988 bytes (7.6%). Gzip bytes decreased from 59888 to 55987 (6.5%). Hashed assets now receive one-year immutable caching. These measurements do not claim a Lighthouse score or network timing improvement.

Branch `assignment4-release` was merged into `main` as commit `4e8704357a921af34ad577820fa5f07ef6184841`. Render automatically deployed it, and the new homepage paragraph was verified on the public URL. Hosted health, three projects, six qualifications and rejection of anonymous project writes were verified.

After password recovery, the owner confirmed hosted administrator sign-in and temporary-record create, read, update and delete operations for Projects, Education and Contacts. The earlier credential-verification item is resolved. This owner-performed manual verification is separate from the recorded automated Cypress run. No secrets are included in the package.
