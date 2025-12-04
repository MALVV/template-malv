# Supabase Redirect URLs Configuration

## Step-by-Step Guide

### 1. Access Supabase Dashboard

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project (or create a new one)

### 2. Configure Redirect URLs

1. Navigate to **Authentication** in the left sidebar
2. Click on **URL Configuration** (under Authentication settings)
3. You'll see two important fields:

#### Site URL
For development, set to:
```
http://localhost:3000
```

For production, set to your production domain:
```
https://your-domain.com
```

#### Redirect URLs (Add these URLs one by one)

**For Development (localhost):**
```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/callback
```

**For Production (replace with your domain):**
```
https://your-domain.com/auth/confirm
https://your-domain.com/auth/callback
```

### 3. Enable Email Confirmation

1. Still in **Authentication** settings
2. Go to **Providers**
3. Click on **Email**
4. Enable **Confirm email** toggle
5. Optionally customize the email template

### 4. Email Template Configuration

1. Go to **Authentication** → **Email Templates**
2. Select **Confirm signup** template
3. The confirmation link should automatically redirect to your configured URL
4. Make sure the template includes: `{{ .ConfirmationURL }}`

### 5. Testing Configuration

After configuration, test the flow:

1. Sign up with a test email at `/auth`
2. Check your email inbox
3. Click the confirmation link
4. You should be redirected to `/auth/confirm`
5. After confirmation, you'll be redirected to `/dashboard`

## Quick Copy-Paste URLs

Copy these URLs into the **Redirect URLs** field in Supabase (one per line):

```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/callback
https://your-production-domain.com/auth/confirm
https://your-production-domain.com/auth/callback
```

**Important:** Replace `your-production-domain.com` with your actual domain when deploying.

## Common Issues

### Issue: "Invalid redirect URL"
- Make sure the URL in the email matches exactly one of the URLs in your Redirect URLs list
- Check for trailing slashes (should not have them)
- Verify http vs https matches your configuration

### Issue: Link doesn't work
- Check that email confirmation is enabled in Supabase
- Verify the redirect URL in the email matches your configuration
- Check browser console for errors

### Issue: Redirects to wrong page
- Verify your Site URL is set correctly
- Check that `/auth/confirm` route exists in your application
- Ensure the callback route is properly configured

## Development vs Production

### Development
- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/auth/confirm`, `http://localhost:3000/auth/callback`

### Production
- Site URL: `https://your-domain.com`
- Redirect URLs: `https://your-domain.com/auth/confirm`, `https://your-domain.com/auth/callback`

**Remember:** Always add both development and production URLs to the Redirect URLs list so you can test in both environments.

