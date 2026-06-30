# BuilderShift

A community landing page for CS students who believe the build is the brand.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Build for production:
   `npm run build`

The site is a Vite + React + Tailwind app backed by [InstantDB](https://www.instantdb.com) for auth and data.

## Environment Variables

Create a `.env` file in the project root (already gitignored):

```
VITE_INSTANT_APP_ID=<your-instant-app-id>
INSTANT_APP_ID=<your-instant-app-id>
INSTANT_ADMIN_TOKEN=<your-instant-admin-token>
```

The `VITE_INSTANT_APP_ID` is used by the client. The `INSTANT_*` vars are used by the Instant CLI.

## InstantDB Setup

The InstantDB app, schema, and permissions are already configured. To manage them:

```bash
# Pull latest schema/perms from Instant
npx instant-cli pull --yes

# Push schema changes
npx instant-cli push schema --yes

# Push permission changes
npx instant-cli push perms --yes
```

## Google OAuth Setup

Authentication uses InstantDB's built-in Google OAuth (Web Redirect flow).

### 1. Create a Google OAuth Client

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) > Credentials
2. Configure the OAuth consent screen (External)
3. Create an OAuth client ID (Application type: Web application)
4. Add `https://api.instantdb.com/runtime/oauth/callback` as an Authorized redirect URI
5. Add `http://localhost:5173` (and your production domain) to Authorized JavaScript origins
6. Save your **Client ID** and **Client Secret**

### 2. Register the client with Instant

```bash
npx instant-cli auth client add \
  --type google --app-type web --name google-web \
  --client-id <your-client-id> --client-secret <your-client-secret>
```

### 3. Register your redirect origin

```bash
# For local development
npx instant-cli auth origin add --type website --url http://localhost:5173

# For production (replace with your domain)
npx instant-cli auth origin add --type website --url https://yourdomain.com
```

The client name `google-web` in the CLI command must match `GOOGLE_CLIENT_NAME` in `src/components/AuthModal.tsx`.
