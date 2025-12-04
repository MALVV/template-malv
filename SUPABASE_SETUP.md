# Supabase Configuration Guide

## 📋 Quick Setup Checklist

- [ ] Create Supabase project
- [ ] Get your project URL and anon key
- [ ] Configure redirect URLs (see below)
- [ ] Enable email confirmation
- [ ] Set environment variables
- [ ] Test email confirmation flow

## 🔗 Redirect URLs Configuration

### Step 1: Access URL Configuration

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Authentication** in the left sidebar
4. Click **URL Configuration**

### Step 2: Set Site URL

**For Development:**
```
http://localhost:3000
```

**For Production:**
```
https://your-production-domain.com
```

### Step 3: Add Redirect URLs

Copy and paste these URLs into the **Redirect URLs** field (add each on a new line):

```
http://localhost:3000/auth/confirm
http://localhost:3000/auth/callback
https://your-production-domain.com/auth/confirm
https://your-production-domain.com/auth/callback
```

**Note:** Replace `your-production-domain.com` with your actual domain when deploying.

### Step 4: Enable Email Confirmation

1. In **Authentication** → **Providers**
2. Click on **Email**
3. Toggle **Enable email confirmations** to ON
4. Save changes

### Step 5: Configure Email Template (Optional)

1. Go to **Authentication** → **Email Templates**
2. Select **Confirm signup**
3. Make sure it includes: `{{ .ConfirmationURL }}`
4. The redirect URL will be automatically appended

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database (Prisma)
DATABASE_URL=postgresql://user:password@localhost:5432/davincii?schema=public
```

## ✅ Testing

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3000/auth`
3. Sign up with a test email
4. Check your email and click the confirmation link
5. You should be redirected to `/auth/confirm` and then to `/dashboard`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Invalid redirect URL | Verify URLs match exactly (no trailing slashes) |
| Link expired | Request a new confirmation email |
| Not redirecting | Check browser console and Supabase logs |
| Email not received | Check spam folder, verify email provider settings |

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Redirect URLs Guide](https://supabase.com/docs/guides/auth/redirect-urls)
- See `SUPABASE_REDIRECT_SETUP.md` for detailed step-by-step instructions

