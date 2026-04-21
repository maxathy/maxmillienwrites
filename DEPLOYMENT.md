# Deployment & Carrd Cutover Runbook

Operator-grade runbook for deploying `maxmillienwrites.com` to Firebase and retiring the Carrd site without losing SEO or breaking live traffic. Execute top-to-bottom; every step is verifiable.

**State of the world:**
- Firebase project: `maxmillienwrites` (see `.firebaserc`)
- Hosting config: `firebase.json` → SPA rewrites, `/api/contact` → Cloud Function
- CI: `.github/workflows/deploy.yml` → deploys on push to `main`
- Contact function: `functions/src/contact.ts` → sends via Resend to `max.millien@puretome.com`
- Domain custody: `maxmillienwrites.com` DNS is at **Squarespace**, currently pointed at **Carrd**

---

## 0 · Prerequisites (one-time)

Run from your laptop, not CI:

```bash
# Node 24 (matches .nvmrc and the Cloud Functions runtime)
node --version   # expect v24.x

# Firebase CLI
npm install -g firebase-tools
firebase --version   # expect >= 13

# Auth
firebase login
firebase projects:list | grep maxmillienwrites
```

If `firebase projects:list` doesn't show `maxmillienwrites`, the project hasn't been created yet. Create it at https://console.firebase.google.com/ — project ID must be exactly `maxmillienwrites` to match `.firebaserc`. Spark (free) plan is enough for static hosting, but **Cloud Functions require the Blaze (pay-as-you-go) plan** with a billing account attached. Traffic will be well under the free tier; you won't be charged at your volume, but billing must be enabled.

---

## 1 · Resend (transactional email)

The contact form sends from `contact@maxmillienwrites.com` to `max.millien@puretome.com`. Before the form works in production:

### 1a · Verify the sending domain

1. Log in to https://resend.com/domains.
2. Click **Add Domain** → enter `maxmillienwrites.com`.
3. Resend gives you 3–4 DNS records (SPF/TXT, DKIM, optional DMARC).
4. Add them at **Squarespace Domains → maxmillienwrites.com → DNS Settings → Custom Records**. These are TXT/CNAME records — they don't affect the A records you'll change at cutover.
5. Wait 5–30 minutes; click **Verify** in Resend. All rows should turn green.

### 1b · Get the API key

1. Resend → **API Keys** → **Create API Key** → scope `Sending access` only.
2. Copy the key (starts with `re_`). You will paste it into Firebase Secret Manager in step 2b.

---

## 2 · First manual deploy (laptop → Firebase)

The goal here is to validate the whole pipeline end-to-end before wiring up CI.

### 2a · Dry-run build locally

```bash
cd /home/max/_source/maxmillienwrites

npm ci
(cd functions && npm ci)
npm run typecheck
npm run build           # produces dist/
(cd functions && npm run build)   # produces functions/lib/
firebase emulators:start --only hosting,functions
```

Visit http://localhost:5000. Smoke-test:
- All nav routes render, no console errors
- `/author` shows the warm palette + serif type
- `/contact` form submit → the emulator logs a function invocation (emails won't send from the emulator without the secret, but the call should succeed schema-side)

`Ctrl-C` to stop.

### 2b · Set the Resend secret

```bash
firebase functions:secrets:set RESEND_API_KEY
# paste the re_... key at the prompt, press Enter
firebase functions:secrets:access RESEND_API_KEY   # confirm it saved
```

### 2c · Deploy

```bash
firebase deploy --only hosting,functions
```

Expected output ends with `+  Deploy complete!` and two URLs:
- `https://maxmillienwrites.web.app` (hosting)
- The function URL for `contact` (us-central1)

Visit the `.web.app` URL. Verify:
- Site loads identically to localhost
- No 404s in DevTools → Network
- `/api/contact` rewrite works: open DevTools, submit a test message from `/contact` → the POST should 200 and you should receive the email at `max.millien@puretome.com`

If the contact form returns 502, the Resend domain isn't verified yet — wait it out.

---

## 3 · GitHub Actions (automated deploys)

Once 2c works, wire CI so `git push origin main` ships automatically.

### 3a · Create a Firebase Service Account

1. Go to the [Firebase Console](https://console.firebase.google.com/) → **Project Settings** → **Service accounts**.
2. Click **Manage service account permissions**. This opens the Google Cloud Console.
3. Click **+ CREATE SERVICE ACCOUNT**.
4. Name it `github-actions-deploy`.
5. Grant the following roles:
   - **Firebase Admin** (Provides full access to Firebase resources like Hosting and Firestore)
   - **Cloud Functions Admin** (Required to manage and deploy Cloud Functions)
   - **Cloud Build Editor** (Required for the build process of Cloud Functions)
   - **Artifact Registry Administrator** (Required to store function container images)
   - **Service Account User** (Required to allow the deployment process to assume the function's identity)
6. After creation, find the service account in the list, go to **Keys** tab → **Add Key** → **Create new key** → **JSON**.
7. Save the downloaded JSON file.

### 3b · Add to GitHub

Repo → **Settings → Secrets and variables → Actions → New repository secret**:
- Name: `FIREBASE_SERVICE_ACCOUNT_JSON`
- Value: *(paste the entire contents of the JSON file you downloaded)*

### 3c · Test

Push any trivial change to `main` (e.g. bump a copy string). Watch **Actions** tab — `Deploy` workflow should go green in ~3–5 min. Re-verify the `.web.app` URL after the run.

**If the workflow fails on `firebase deploy`:**
- `Error: HTTP Error 403` → the service account is missing required roles. Re-verify the roles detailed in step 3a.
- `Error: Failed to load function definition` → secret not set in the environment; re-run step 2b (secrets are per-project, not per-deploy)

---

## 4 · Custom domain on Firebase

Firebase Hosting will serve your custom domain once you complete their verification flow.

### 4a · Add the domain in Firebase

1. Firebase Console → **Hosting** → **Add custom domain**
2. Enter `maxmillienwrites.com`, continue
3. Firebase gives you a **TXT record** for domain ownership verification
4. Add the TXT record in **Squarespace DNS**. Wait 5–15 min; click **Verify** in Firebase

### 4b · Get the A records (don't apply yet — these go live at cutover)

After verification, Firebase will show you **two A records** (usually `199.36.158.100` and one more). **Copy both IPs** into a note. You'll paste these into Squarespace DNS only when you're ready to flip traffic off Carrd.

### 4c · Add the www subdomain too

In the same flow, add `www.maxmillienwrites.com`. Firebase will give you a CNAME (usually pointing at `<project>.web.app`) or the same two A records. Apply at cutover time.

---

## 5 · Pre-cutover checklist

Do not flip DNS until every box is checked (mirrors PRD-003 §6):

- [ ] Hero graph renders (or fallback is acceptable)
- [ ] `/stack` renders real content, no placeholder
- [ ] `/contact` form submits; you received the bounce email
- [ ] All three OSS GitHub repos exist publicly under `github.com/maxathy` (no 404s)
- [ ] OSS deep-dive pages render real content
- [ ] `/author` renders with real cover image and final book summary
- [ ] `/resume` spacing polished + PDF downloads with correct mime type
- [ ] Lighthouse ≥95 Performance / 100 Accessibility / 100 SEO on `/`, `/stack`, `/contact`, `/author`, `/resume`
- [ ] Every external link opens in new tab and returns 200
- [ ] Latest GitHub Actions run is green
- [ ] Resend domain status = verified
- [ ] You have the Firebase A records copied
- [ ] You have a working backup of current Carrd DNS settings (screenshot)

---

## 6 · DNS cutover (Carrd → Firebase)

**Timing:** do this when you have ~30 min of attention free. Don't start late in the day. DNS propagation is usually minutes on Squarespace but up to 24h on pessimistic resolvers.

### 6a · Capture current state

Before changing anything, screenshot the current **Squarespace DNS → Custom Records** page. This is your rollback snapshot.

### 6b · Update A records

In Squarespace DNS:
1. Delete the existing A records that point at Carrd (usually `76.76.21.x` or similar — confirm against your screenshot before deleting)
2. Add the two A records from Firebase (step 4b):
   - Host: `@`, Type: `A`, Value: `<IP 1>`
   - Host: `@`, Type: `A`, Value: `<IP 2>`
3. For `www`: add the CNAME or A records from step 4c

**Do not touch:** the MX records (email), the Resend TXT/CNAME records (step 1a), or any other records you didn't recognize. If in doubt, leave it.

### 6c · Wait for propagation + SSL

- DNS propagation: 5–30 min typically
- Firebase auto-provisions a Let's Encrypt SSL cert as soon as it sees the domain resolving to their IPs. This takes another 15–60 min after DNS resolves.
- Check status at Firebase Console → **Hosting → Domains**. Status goes `Needs setup` → `Pending` → `Connected`.

### 6d · First live check

```bash
# From terminal — shouldn't need anything fancy
dig maxmillienwrites.com +short
# expect the two Firebase IPs, not Carrd

curl -sI https://maxmillienwrites.com | head -5
# expect HTTP/2 200 + x-powered-by: Firebase (or similar)
```

Open https://maxmillienwrites.com in an incognito window (no cache, no logged-in state). Verify:
- Page renders
- URL bar shows the padlock (SSL valid)
- Contact form submits successfully (CORS is already allowlisted for the apex + www origins in `functions/src/contact.ts:8-12`)

---

## 7 · Carrd decommission

**Wait 48–72 hours** after cutover before touching Carrd. If something's wrong with the new site and you haven't deleted Carrd yet, rollback is one-DNS-change away.

After the wait:
1. Log in to Carrd → **Settings** → downgrade to free or cancel the Pro subscription
2. Unpublish the Carrd site (Settings → Publish → Unpublish) — this breaks the old `maxmillienwrites.carrd.co` URL if you want it gone
3. Export a backup of your Carrd content (Carrd → Settings → Export) in case you want it for the archive
4. Remove the custom domain association in Carrd's domain settings (so Carrd stops thinking it owns it)

---

## 8 · Post-cutover tasks

### 8a · Google Search Console

1. https://search.google.com/search-console → **Add property** → `https://maxmillienwrites.com`
2. Verify via DNS TXT (easiest — paste into Squarespace; can coexist with everything else)
3. Submit the sitemap: `https://maxmillienwrites.com/sitemap.xml`
4. Watch the **Coverage** and **Performance** reports over the next 2–4 weeks. Track the "max millien" query — the old Carrd positioning should phase out as Google re-crawls

### 8b · Monitoring (optional but cheap)

- **Uptime**: https://betterstack.com/uptime or https://uptimerobot.com — free tier, ping every 5 min
- **Error tracking**: Sentry or LogRocket free tier, if you care about JS errors in the wild
- **Resend usage**: check Resend dashboard monthly for any delivery failures

### 8c · Carrd's inbound Google result

The old `maxmillienwrites.com` Carrd page will stay in Google's index for 1–4 weeks after cutover. Google will eventually re-crawl and replace the snippet with the new content. No action required, but don't panic if the old title/description lingers for a bit.

---

## 9 · Rollback plan

If something goes catastrophically wrong post-cutover and you need to revert:

1. Squarespace DNS → restore the A records from your screenshot (step 6a)
2. Wait 5–30 min for DNS
3. Carrd's A records resolve again → site is back
4. Open an issue / debugging session in the Firebase-hosted version offline

This is why you wait 48–72h before deleting Carrd (§7).

---

## 10 · Ongoing: how to deploy changes

After cutover, the flow is:

```bash
# local work
git checkout -b feat/whatever
# ... edit, typecheck, build locally ...
git push origin feat/whatever
# open a PR, merge to main
# GitHub Actions auto-deploys
```

**Emergency manual deploy** (if CI is broken):
```bash
firebase deploy --only hosting
# or for functions-only
firebase deploy --only functions:contact
```

**Rotating the Resend key:**
```bash
firebase functions:secrets:set RESEND_API_KEY   # paste new key
firebase deploy --only functions:contact        # restart with new secret
# then revoke the old key in Resend dashboard
```

---

## Appendix · Common failure modes

| Symptom | Likely cause | Fix |
|---|---|---|
| `firebase deploy` fails with `Error: HTTP 403` | Missing service account roles or incorrect secret | Verify IAM roles in Google Cloud Console and ensure `FIREBASE_SERVICE_ACCOUNT_JSON` is valid JSON |
| Contact form returns 502 | Resend domain not verified, or API key wrong | Resend dashboard → verify domain; re-run `firebase functions:secrets:set` |
| Contact form returns CORS error | Origin not in allowlist | Check `functions/src/contact.ts:8-12`; add the origin if it's a new domain |
| Site loads but shows old Carrd content | DNS not propagated yet | `dig` the domain; wait 5–30 min; clear browser cache |
| SSL error on the live domain | Firebase hasn't issued the cert yet | Check Firebase Console → Hosting → Domains; status should be `Connected`. Wait up to 60 min after DNS resolves |
| GitHub Action green but site not updating | Service worker cache, or you deployed `functions` only | Hard refresh (Cmd-Shift-R); confirm Actions workflow hit the hosting step |
| 404 on deep link like `/author` after cutover | SPA rewrite not applied | Confirm `firebase.json:13-15` has the `**` → `/index.html` rewrite and CI re-deployed |

---

## TL;DR order of operations

1. Resend domain verified + API key copied (§1)
2. Local build + emulator test (§2a)
3. Secret set + first manual deploy (§2b, §2c)
4. CI token + GitHub secret + test push (§3)
5. Firebase custom domain added + verified (§4)
6. Pre-cutover checklist all green (§5)
7. DNS flip at Squarespace (§6)
8. 48-hour wait, then Carrd deletion (§7)
9. Search Console + monitoring (§8)
