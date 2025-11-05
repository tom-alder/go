# GitHub Pages Security Headers Setup Guide

## Current Situation

You're hosting on **GitHub Pages**, which does NOT support custom HTTP headers natively. This is why securityheaders.com shows all headers as missing.

## Solutions (Choose One)

### Option 1: Use Cloudflare in Front of GitHub Pages (RECOMMENDED)

If you're already using Cloudflare or can set it up:

1. **Point your domain to Cloudflare:**
   - Add your domain to Cloudflare
   - Point DNS to Cloudflare
   - GitHub Pages will continue to host, but Cloudflare will add headers

2. **Configure Security Headers in Cloudflare:**
   - Go to Cloudflare Dashboard → Rules → Transform Rules → Modify Response Header
   - Create 9 separate rules (one for each header) following the instructions in `SECURITY_RECOMMENDATIONS.md`

3. **Enable Cloudflare SSL/HSTS:**
   - SSL/TLS → Encryption mode: "Full" or "Full (strict)"
   - SSL/TLS → Edge Certificates → Enable "Always Use HTTPS"
   - SSL/TLS → Edge Certificates → Enable "HTTP Strict Transport Security (HSTS)"

### Option 2: Switch to Netlify Hosting

Netlify supports the `_headers` file I've created:

1. **Sign up for Netlify** (free tier available)
2. **Connect your GitHub repo** to Netlify
3. **Deploy** - Netlify will automatically read the `_headers` file
4. **Update DNS** to point to Netlify instead of GitHub Pages

The `_headers` file is already in your repo and will work automatically!

### Option 3: Use a Cloudflare Worker

Create a Cloudflare Worker that adds headers to all responses. This requires more technical setup.

## Quick Cloudflare Setup (If Using Cloudflare)

Since I see Fastly headers in your response, you might already be using a CDN. If it's Cloudflare:

1. Log into Cloudflare Dashboard
2. Select your domain `go.strategybreakdowns.com`
3. Go to **Rules** → **Transform Rules** → **Modify Response Header**
4. Click **Create rule**
5. Add each header separately:

**Rule Name**: `Add Security Headers - HSTS`
- **When incoming requests match**: `(http.host eq "go.strategybreakdowns.com")`
- **Then**: Set header
  - **Header name**: `Strict-Transport-Security`
  - **Value**: `max-age=31536000; includeSubDomains; preload`
  - **Operation**: Set static

Repeat for each header:
- `X-Frame-Options` → `SAMEORIGIN`
- `X-Content-Type-Options` → `nosniff`
- `Referrer-Policy` → `strict-origin-when-cross-origin`
- `Permissions-Policy` → `geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), fullscreen=(self)`
- `Content-Security-Policy` → `default-src 'self'; script-src 'self' https://datafa.st https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://datafa.st; frame-ancestors 'self';`
- `Cross-Origin-Embedder-Policy` → `require-corp`
- `Cross-Origin-Opener-Policy` → `same-origin`
- `Cross-Origin-Resource-Policy` → `same-origin`

## Testing After Setup

After implementing headers:
1. Wait 5-10 minutes for changes to propagate
2. Test at: https://securityheaders.com/?q=https://go.strategybreakdowns.com
3. You should see an A or B rating instead of F

## Notes

- Meta tags in HTML (which we already added) are a fallback, but HTTP headers are what security tools check
- GitHub Pages will NOT read the `_headers` file - it only works with Netlify
- If you're using Cloudflare, you must add headers via Transform Rules or Workers
- The CSP header matches what we have in the HTML meta tag

