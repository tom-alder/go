# Netlify _headers File Troubleshooting

## Issue: Headers Not Showing

You're seeing `Strict-Transport-Security` (added automatically by Netlify) but not the other headers from `_headers` file.

## Possible Causes & Solutions

### 1. File Location
- ✅ The `_headers` file MUST be in the **root directory** of your published site
- ✅ It should be at the same level as `index.html`
- ✅ Make sure it's committed to your Git repo

### 2. Deployment
- Make sure you've **committed and pushed** the `_headers` file to GitHub
- Trigger a new deployment in Netlify (or wait for auto-deploy)
- Check Netlify deployment logs for any errors

### 3. File Formatting
- Headers must be indented with **2 spaces** (not tabs)
- There must be a **blank line** between path patterns
- The file should end with a newline

### 4. Netlify Configuration
Check your Netlify settings:
- Go to **Site settings** → **Build & deploy**
- Make sure **Publish directory** is set to `/` (root)
- If you have a build command, the `_headers` file needs to be in the output directory

### 5. Cache Issues
- Netlify caches headers
- Wait 5-10 minutes after deployment
- Try testing with a different URL or clear browser cache
- Netlify CDN cache might take a few minutes to update

### 6. Path Matching
The `_headers` file should work with:
- `/*` - matches all paths
- `/wt/*` - matches all paths under `/wt/`

I've added both patterns to cover all cases.

## Quick Fix Steps

1. **Verify file is committed:**
   ```bash
   git status
   git add _headers
   git commit -m "Add security headers"
   git push
   ```

2. **Trigger Netlify redeploy:**
   - Go to Netlify dashboard
   - Click **"Trigger deploy"** → **"Deploy site"**
   - Or wait for auto-deploy (if connected to GitHub)

3. **Wait 5-10 minutes** for changes to propagate

4. **Test again:**
   - https://securityheaders.com/?q=https://precious-nougat-201cdd.netlify.app/wt/

## Alternative: Use netlify.toml

If `_headers` file doesn't work, you can use `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), fullscreen=(self)"
    Content-Security-Policy = "default-src 'self'; script-src 'self' https://datafa.st https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://datafa.st; frame-ancestors 'self';"
    Cross-Origin-Embedder-Policy = "require-corp"
    Cross-Origin-Opener-Policy = "same-origin"
    Cross-Origin-Resource-Policy = "same-origin"
```

## Check Netlify Logs

1. Go to Netlify dashboard
2. Click **"Deploys"**
3. Click on the latest deployment
4. Check for any errors related to `_headers`

## Still Not Working?

If headers still don't appear after:
- Committing the file
- Redeploying
- Waiting 10+ minutes

Then create a `netlify.toml` file instead (see above), which is more reliable.

