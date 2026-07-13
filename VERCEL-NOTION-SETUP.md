# Vercel + Notion Integration Setup Guide

This guide will help you deploy your website to Vercel and connect the appointment form to your Notion dashboard.

## Step 1: Create a Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "+ New integration"
3. Give it a name (e.g., "Al-Nima Appointments")
4. Select the workspace where you want to store appointments
5. Click "Submit"
6. Copy the "Internal Integration Token" (starts with `secret_`)

## Step 2: Create a Notion Database

1. In your Notion workspace, create a new page
2. Add a database (Table view recommended)
3. Name it "Appointment Requests"
4. Add these properties to your database:

   | Property Name | Property Type |
   |--------------|---------------|
   | Patient Name | Title |
   | Phone Number | Phone |
   | Department | Select |
   | Hospital | Select |
   | Appointment Date | Date |
   | Preferred Time | Text |
   | Status | Select |
   | Submitted At | Date |

5. For the "Status" property, add these options:
   - New
   - Contacted
   - Confirmed
   - Completed
   - Cancelled

6. Share the database with your integration:
   - Click the "..." menu in the top right of your database
   - Click "Add connections"
   - Select your integration (e.g., "Al-Nima Appointments")

7. Get your Database ID:
   - Copy the database URL
   - Format: `https://notion.so/workspace/DATABASE_ID?v=...`
   - The DATABASE_ID is the 32-character string (with dashes)
   - Example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts to link your project

### Option B: Deploy via Git Integration

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to https://vercel.com/new
3. Import your repository
4. Vercel will auto-detect the settings
5. Click "Deploy"

## Step 4: Configure Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these two variables:

   ```
   NOTION_TOKEN = secret_your_integration_token_here
   NOTION_DATABASE_ID = your_database_id_here
   ```

5. Make sure to add them for all environments (Production, Preview, Development)
6. Click "Save"

## Step 5: Redeploy

After adding environment variables:
1. Go to "Deployments" tab
2. Click the "..." menu on the latest deployment
3. Click "Redeploy"
4. Or push a new commit to trigger automatic redeployment

## Step 6: Test the Form

1. Visit your deployed Vercel URL
2. Scroll to "Book Your Consulting" section
3. Fill out the form
4. Submit
5. Check your Notion database - a new entry should appear
6. You'll see a success notification on the website

## How It Works

```
User fills form → JavaScript captures data → POST to /api/submit-appointment 
→ Vercel Function processes → Creates entry in Notion → Success response
```

## Vercel Configuration

The project is already configured for Vercel:
- API routes are in `/api` folder (Vercel auto-detects these)
- Dependencies are in `package.json`
- No additional `vercel.json` needed for basic setup

## Troubleshooting

**Form submission fails:**
- Check Vercel function logs: Dashboard → Your Project → Functions
- Verify environment variables are set correctly
- Ensure Notion database is shared with your integration

**Notion API errors:**
- Verify property names match exactly (case-sensitive)
- Check that Database ID is correct (32 characters with dashes)
- Ensure integration token is valid and starts with `secret_`

**CORS errors:**
- The API function already includes CORS headers
- If issues persist, check browser console for specific errors

## Alternative: Simple Email Notifications

If Notion integration seems complex, you can use Vercel's built-in email service or integrate with:
- SendGrid
- Resend
- Mailgun

Let me know if you'd like to set up email notifications instead!

## Monitoring Appointments

In your Notion database, you can:
- Filter by Status to see new appointments
- Sort by Submitted At to see latest first
- Create different views (Calendar view, Kanban board)
- Set up Notion automations to send you notifications
- Export data to CSV for analysis
