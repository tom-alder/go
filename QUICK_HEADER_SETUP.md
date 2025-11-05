# Quick Reference: Security Headers Values

Use these exact values when configuring headers in Cloudflare or your CDN:

## Required Headers (from securityheaders.com)

### 1. Strict-Transport-Security
```
max-age=31536000; includeSubDomains; preload
```

### 2. X-Frame-Options
```
SAMEORIGIN
```
*(Note: securityheaders.com recommends SAMEORIGIN, but we used DENY in meta tags. SAMEORIGIN is better for HTTP headers as it allows your site to be embedded in iframes on your own domain, which can be useful for some integrations.)*

### 3. X-Content-Type-Options
```
nosniff
```

### 4. Referrer-Policy
```
strict-origin-when-cross-origin
```

### 5. Permissions-Policy
```
geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), fullscreen=(self)
```

### 6. Content-Security-Policy
```
default-src 'self'; script-src 'self' https://datafa.st https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://datafa.st; frame-ancestors 'self';
```

### 7. Cross-Origin-Embedder-Policy (Upcoming)
```
require-corp
```

### 8. Cross-Origin-Opener-Policy (Upcoming)
```
same-origin
```

### 9. Cross-Origin-Resource-Policy (Upcoming)
```
same-origin
```

## Cloudflare Quick Setup Steps

1. Log into Cloudflare Dashboard
2. Select domain: `go.strategybreakdowns.com`
3. Navigate to: **Rules** → **Transform Rules** → **Modify Response Header**
4. Click **Create rule**
5. For each header above:
   - **Rule name**: `Add [Header Name]`
   - **Matching condition**: `(http.host eq "go.strategybreakdowns.com")`
   - **Header name**: Use the header name exactly as shown
   - **Value**: Use the value exactly as shown
   - **Operation**: Set static
6. Save and Deploy
7. Wait 5-10 minutes
8. Test at: https://securityheaders.com/?q=https://go.strategybreakdowns.com

## Expected Result

After setup, you should see:
- **Rating**: A or B (instead of F)
- **All 6 required headers**: ✅ Present
- **3 upcoming headers**: ✅ Present (bonus points)

