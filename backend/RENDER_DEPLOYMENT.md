# Render Deployment

Create a Render Web Service for the backend. If deploying from the repository root, set the Render **Root Directory** to:

```bash
backend
```

## Build and Start Commands

Build Command:

```bash
npm install && npm run build
```

Start Command:

```bash
npm run start
```

## Environment Variables

Set these in the Render service environment:

```bash
PORT=5000
NODE_ENV=production
DB_HOST=<your-cloud-mysql-host>
DB_PORT=3306
DB_USER=<your-cloud-mysql-user>
DB_PASSWORD=<your-cloud-mysql-password>
DB_NAME=portfolio_db
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your-smtp-email>
EMAIL_PASS=<your-gmail-app-password>
EMAIL_TO=<recipient-email>
CLIENT_URL=https://sarj-portfolio.vercel.app
```

Use a Gmail app password for `EMAIL_PASS`. Do not use your regular Gmail password.
Never commit real credentials to the repository. Rotate any credential that was previously committed or shared.

## Frontend Connection

The Vercel app can submit contacts through this backend by setting the frontend environment variable:

```bash
BACKEND_CONTACT_API_URL=https://your-render-service.onrender.com
```

When `BACKEND_CONTACT_API_URL` is configured, the Next.js `/api/contact` route forwards contact submissions to the Render backend so messages are saved in MySQL and email notifications are sent through SMTP. When it is not configured, the route falls back to the Resend-only email sender using `RESEND_API_KEY` and `CONTACT_EMAIL`.

## MySQL Setup

1. Create a cloud MySQL database.
2. Run `portfolio_db.sql`.
3. Allow Render outbound connections in your database provider firewall.
4. Use the provider hostname, port, username, password, and database name in Render.
5. Confirm the database provider supports TLS for production traffic.

## SSL

The backend enables MySQL SSL automatically when `NODE_ENV=production` by passing TLS options to `mysql2/promise`. Keep `NODE_ENV=production` on Render and use a MySQL provider that supports TLS connections.

## Verification Checklist

1. Deploy the Render Web Service from the `backend` directory.
2. Confirm the service logs show database connection success.
3. Confirm SMTP verification succeeds, or verify that failures are logged without crashing startup.
4. Open `https://your-render-service.onrender.com/api/health`.
5. POST a valid contact payload to `/api/contact`.
6. Confirm a row is inserted into `contacts`.
7. Confirm the notification email is received. If it is not received, check Gmail app password settings; database storage should still succeed.
8. Set the frontend contact form endpoint to the Render `/api/contact` URL.
9. Confirm requests from any origin other than `CLIENT_URL` are rejected by CORS.
10. Confirm more than 5 contact submissions from the same IP within 15 minutes receive the rate-limit JSON response.
