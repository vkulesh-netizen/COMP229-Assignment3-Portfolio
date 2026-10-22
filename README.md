# COMP229 Assignment 3 Portfolio

Vitaliy Kulesh — 301559060

Extends the original React portfolio design and Express/Mongoose backend with cookie-based JWT authentication, database-driven Projects and Education pages, role-based administration, and complete contact-message persistence.

## Run locally

1. Start MongoDB (use the Start MongoDB launcher supplied in the chat).
2. Open a terminal in this project folder.
3. Run npm install, then npm --prefix client install.
4. Copy .env.example to .env. Keep .env private and choose a random JWT_SECRET.
5. Run npm run seed to populate your existing portfolio content and create an admin. Seeding does not delete existing records or reset existing passwords.
6. Run npm run dev. Open http://localhost:5173.

Default local demonstration admin: admin@portfolio.local / Password123!
Set ADMIN_EMAIL and ADMIN_PASSWORD before the first seed for your own credentials. Passwords are hashed in MongoDB. Do not deploy the demonstration password.

Regular visitors can browse and submit Contact Me messages. Registered users have read-only portfolio access. Only admins can use Manage to create, update or delete portfolio records and read/manage contact submissions. Public POST /api/contact-messages is the dedicated contact submission endpoint; the CRUD endpoints require admin permissions for mutations.

## Demonstrate Assignment 3

- Sign up and sign in as a normal user; verify Manage is inaccessible.
- Sign out, then sign in as administrator and open Manage.
- Add, edit and delete Projects, Education and Contacts. Reload public pages to verify database changes.
- Send a contact message with a phone number and inspect it under Manage → Contacts.
- Refresh while logged in to verify the session persists. Sign out and verify protected requests fail without a session.

## Deployment

Use an Express-capable host with MongoDB Atlas. Build: npm install && npm run build. Start: npm start. Set NODE_ENV=production, MONGODB_URI, JWT_SECRET and CLIENT_ORIGIN to the live HTTPS origin. Express serves client/dist and the APIs from the same origin. A frontend-only Netlify/Vercel upload will not run the backend.

## Submission still required

Publish the site, push source to your GitHub repository, record the local and hosted walkthrough, and prepare a Word document containing real screenshots. Supply the live URL, repository URL, source ZIP, video URL, and screenshot document. No deployment or GitHub publication is performed by this source package.

Original Assignment 2 Postman collection is retained as a starting point. For protected CRUD requests, sign in as admin and supply its Bearer token or cookie; old anonymous mutation requests should now fail.
