# Google Sheets Setup Guide

## You only need to do this once. Takes ~3 minutes.

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank spreadsheet**
3. Name it: **Al-Nima Appointments**
4. Leave it open — you'll need it in Step 2

---

## Step 2 — Open Apps Script

Inside your new Google Sheet:

1. Click **Extensions** (top menu)
2. Click **Apps Script**
3. A new tab opens with a code editor

---

## Step 3 — Paste the Script

1. **Select all** the existing code in the editor (`Cmd+A`)
2. **Delete it**
3. **Paste** the entire contents of [`apps_script_code.gs`](file:///Users/abdulmuspik/.gemini/antigravity-ide/brain/6e267ad1-6fc3-44d5-a9f9-094d1822a68e/apps_script_code.gs)
4. Click the **💾 Save** icon (or `Cmd+S`)
5. Name the project: **Al-Nima Form Handler** → click OK

---

## Step 4 — Deploy as Web App

1. Click **Deploy** (top-right blue button)
2. Click **New deployment**
3. Click the **⚙️ gear icon** next to "Select type" → choose **Web app**
4. Fill in:
   - **Description:** `Appointment form handler`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
5. Click **Deploy**
6. Google will ask you to **authorize** — click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to Al-Nima Form Handler (unsafe)** → **Allow**
7. You'll see a **Web app URL** like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
8. Click **Copy** — you need this URL!

---

## Step 5 — Paste the URL into the project

Open [`js/appointment.js`](file:///Users/abdulmuspik/projects/al-nima/js/appointment.js) and find line ~191:

```js
const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
```

Replace it with your actual URL:

```js
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
```

Save the file.

---

## Step 6 — Test It

### Quick test (browser):
Visit your Web App URL in a browser — you should see:
```
✅ Al-Nima Appointments Web App is running.
```

### Full form test:
1. Open `appointment-form.html` in your browser (or on your Netlify URL)
2. Fill in and submit the form
3. Check your Google Sheet — a new **"Appointments"** tab will appear with a blue header row and your test data

---

## ✅ Done!

Every form submission now goes directly into your Google Sheet. The sheet auto-creates on the first submission with all column headers.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Row not appearing | Check that you deployed with **Who has access: Anyone** |
| "URL not configured" error | Make sure you replaced the placeholder URL in `appointment.js` |
| Authorization error | Re-deploy and go through the Google authorization flow again |
| Old URL stopped working | Re-deploy as a **new deployment** and update the URL |

> [!WARNING]
> Every time you **edit the Apps Script code**, you must create a **new deployment** to pick up the changes. The existing URL will keep using the old version until you redeploy.
