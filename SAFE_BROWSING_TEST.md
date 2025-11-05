# Testing Your Site with Google Safe Browsing API

This guide will help you test your website using Google's Safe Browsing API to ensure it's not flagged for security issues.

## Quick Start

### Option 1: Browser-based Test (Easiest)

1. Open `test-safe-browsing.html` in your browser
2. Get an API key (see instructions below)
3. Enter your API key and URL
4. Click "Check URL"

### Option 2: Command Line Test (Node.js)

```bash
node test-safe-browsing.js YOUR_API_KEY https://go.strategybreakdowns.com/wt/
```

## Getting an API Key

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or select a project**
3. **Enable the Safe Browsing API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Safe Browsing API"
   - Click "Enable"
4. **Create an API Key**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key

**Important Notes:**
- The Safe Browsing API is **free for non-commercial use**
- For commercial applications, consider using [Web Risk API](https://cloud.google.com/web-risk)
- Keep your API key secure and don't commit it to version control

## Testing Your Site

### Test Your Production URL

```bash
node test-safe-browsing.js YOUR_API_KEY https://go.strategybreakdowns.com/wt/
```

### Test with Known Safe URL

```bash
node test-safe-browsing.js YOUR_API_KEY https://www.google.com
```

### Test with Known Unsafe URL (for testing)

Google provides test URLs:
- Malware: `http://testsafebrowsing.appspot.com/apiv4/ANY_PLATFORM/MALWARE/URL/`
- Social Engineering: `http://testsafebrowsing.appspot.com/apiv4/ANY_PLATFORM/SOCIAL_ENGINEERING/URL/`

## Understanding Results

- **✅ SAFE**: Your URL is not flagged - no action needed
- **⚠️ UNSAFE**: Your URL may be flagged - review the threat details
- **❌ ERROR**: Check your API key and network connection

## API Documentation

- [Google Safe Browsing API Reference](https://developers.google.com/safe-browsing/reference)
- [Safe Browsing API v5 Overview](https://developers.google.com/safe-browsing/v5/get-started)

## Troubleshooting

### "API key not valid" error
- Verify your API key is correct
- Ensure Safe Browsing API is enabled for your project
- Check API key restrictions (if any)

### "Network error" or timeout
- Check your internet connection
- Verify the API endpoint is accessible
- Try again after a few moments

### Empty response
- This is normal for Safe Browsing API v5 - empty response means the URL is safe
- The Node.js script handles this correctly

## Security Best Practices

1. **Don't commit API keys** to version control
2. **Use environment variables** for API keys in production
3. **Set API key restrictions** in Google Cloud Console:
   - Restrict by IP address
   - Restrict by HTTP referrer (for web apps)
   - Restrict to specific APIs

## Example: Using Environment Variables

```bash
export SAFE_BROWSING_API_KEY="your-api-key-here"
node test-safe-browsing.js $SAFE_BROWSING_API_KEY https://go.strategybreakdowns.com/wt/
```

## What Gets Checked?

The Safe Browsing API checks for:
- **Malware**: Sites that distribute malicious software
- **Social Engineering**: Phishing sites
- **Unwanted Software**: Sites that host unwanted software
- **Potentially Harmful Applications**: Suspicious applications

## Next Steps

If your site is flagged:
1. Review Google's [Safe Browsing diagnostic page](https://transparencyreport.google.com/safe-browsing/search)
2. Check if your site has been compromised
3. Submit a review request if you believe it's a false positive
4. Ensure your site follows security best practices

