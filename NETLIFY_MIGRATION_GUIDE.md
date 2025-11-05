# Complete Guide: Switching from GitHub Pages to Netlify

## Why Switch to Netlify?

- ✅ Netlify automatically reads the `_headers` file (security headers will work immediately)
- ✅ Same free hosting as GitHub Pages
- ✅ Better performance and CDN
- ✅ Automatic HTTPS and SSL certificates
- ✅ Simple deployment from GitHub

## Step-by-Step Migration

### Step 1: Sign Up for Netlify

1. Go to https://app.netlify.com/signup
2. Sign up with your GitHub account (easiest option)
3. Authorize Netlify to access your GitHub repositories

### Step 2: Connect Your Repository

1. In Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select your repository: `websites-and-traffic` (or whatever it's named)
4. Configure build settings:
   - **Branch to deploy**: `main` (or your default branch)
   - **Build command**: Leave empty (static site, no build needed)
   - **Publish directory**: `/` (root directory)
5. Click **"Deploy site"**

### Step 3: Verify Site Works

1. Netlify will give you a temporary URL like: `https://random-name-12345.netlify.app`
2. Visit that URL to confirm your site loads correctly
3. Check that the `_headers` file is working by testing:
   - https://securityheaders.com/?q=https://YOUR-NETLIFY-URL.netlify.app
   - You should see security headers now!

### Step 4: Add Your Custom Domain

1. In Netlify dashboard, go to your site
2. Click **"Domain settings"** (or **"Add custom domain"**)
3. Enter: `go.strategybreakdowns.com`
4. Netlify will show you DNS configuration instructions

### Step 5: Update DNS Records

You need to update DNS where your domain is registered (likely where you bought `strategybreakdowns.com`).

#### Option A: If Using a Subdomain (go.strategybreakdowns.com)

**In your domain registrar's DNS settings:**

1. Find the DNS management section (might be called "DNS Settings", "DNS Records", or "Name Servers")
2. **Remove** the old CNAME record pointing to GitHub Pages:
   - Old: `go` → `strategybreakdowns.github.io` (or similar)
   - Delete this record
3. **Add** a new CNAME record:
   - **Type**: CNAME
   - **Name/Host**: `go`
   - **Value/Target**: `YOUR-SITE-NAME.netlify.app` (Netlify will tell you the exact value)
   - **TTL**: 3600 (or default)

**OR** Netlify might give you specific instructions. Follow those exactly.

#### Option B: If Using Root Domain (strategybreakdowns.com)

This is more complex. You'd need to:
1. Remove the A records pointing to GitHub Pages IPs
2. Add Netlify's DNS records (they'll provide these)

### Step 6: Wait for DNS Propagation

1. DNS changes can take 5 minutes to 48 hours (usually 5-30 minutes)
2. Check propagation: https://www.whatsmydns.net/#CNAME/go.strategybreakdowns.com
3. You'll know it's working when `go.strategybreakdowns.com` loads your site

### Step 7: Configure SSL in Netlify

1. Netlify automatically provisions SSL certificates
2. Go to **Domain settings** → **HTTPS**
3. Enable **"Force HTTPS"** (redirects HTTP to HTTPS)
4. Wait for SSL certificate to be issued (usually automatic, takes 5-60 minutes)

### Step 8: Verify Everything Works

1. Visit: https://go.strategybreakdowns.com
2. Test security headers: https://securityheaders.com/?q=https://go.strategybreakdowns.com
3. You should now see an **A or B rating** instead of F!

### Step 9: Update GitHub Pages (Optional)

1. In your GitHub repo, go to **Settings** → **Pages**
2. Either:
   - Disable GitHub Pages (since you're using Netlify now)
   - OR keep it as backup (no harm in leaving it)

## Common DNS Providers

### If using GoDaddy:
1. Go to **My Products** → **DNS** → **Manage DNS**
2. Find your CNAME record for `go`
3. Edit it to point to Netlify's provided URL

### If using Namecheap:
1. Go to **Domain List** → Click **Manage** → **Advanced DNS**
2. Find your CNAME record
3. Edit host to `go` and value to Netlify's URL

### If using Cloudflare:
1. Go to **DNS** → **Records**
2. Edit the CNAME record for `go`
3. Change target to Netlify's URL

### If using Google Domains:
1. Go to **DNS** → **Custom resource records**
2. Edit the CNAME record
3. Update the data field to Netlify's URL

## Troubleshooting

### Site doesn't load after DNS change:
- Wait longer (DNS can take up to 48 hours, but usually much faster)
- Clear your browser cache
- Try incognito/private browsing mode
- Check DNS propagation: https://www.whatsmydns.net/

### SSL certificate not working:
- Wait 5-60 minutes for Netlify to provision the certificate
- Make sure DNS is fully propagated first
- Check Netlify dashboard → Domain settings → HTTPS

### Security headers still not showing:
- Make sure the `_headers` file is in your repo root
- Wait a few minutes after deployment
- Test the Netlify URL first (not your custom domain)
- Check Netlify logs for any errors

## What Happens to GitHub Pages?

- Your GitHub repo stays the same
- You can disable GitHub Pages or leave it as backup
- All your code stays in GitHub
- Netlify deploys automatically from GitHub

## Need Help?

If you get stuck:
1. Check Netlify's deployment logs
2. Verify DNS propagation status
3. Check that `_headers` file is in your repo root
4. Netlify support is very helpful - reach out if needed

## Expected Timeline

- **Netlify setup**: 5-10 minutes
- **DNS propagation**: 5-30 minutes (sometimes up to 48 hours)
- **SSL certificate**: 5-60 minutes
- **Total**: Usually working within 30-60 minutes

