#!/usr/bin/env node

/**
 * Google Safe Browsing API v5 Test Script
 * 
 * Usage:
 *   node test-safe-browsing.js <YOUR_API_KEY> <URL_TO_CHECK>
 * 
 * Example:
 *   node test-safe-browsing.js YOUR_API_KEY https://go.strategybreakdowns.com/wt/
 * 
 * Note: You need to:
 * 1. Get an API key from https://console.cloud.google.com/
 * 2. Enable "Safe Browsing API" for your project
 * 3. The API is free for non-commercial use
 */

const https = require('https');
const crypto = require('crypto');
const { URL } = require('url');

// Get API key and URL from command line arguments
const apiKey = process.argv[2];
const urlToCheck = process.argv[3];

if (!apiKey || !urlToCheck) {
  console.error('Usage: node test-safe-browsing.js <API_KEY> <URL_TO_CHECK>');
  console.error('');
  console.error('Example:');
  console.error('  node test-safe-browsing.js YOUR_API_KEY https://go.strategybreakdowns.com/wt/');
  console.error('');
  console.error('To get an API key:');
  console.error('  1. Go to https://console.cloud.google.com/');
  console.error('  2. Create a new project or select existing one');
  console.error('  3. Enable "Safe Browsing API"');
  console.error('  4. Go to Credentials → Create Credentials → API Key');
  process.exit(1);
}

/**
 * Canonicalize URL according to Google Safe Browsing spec
 * This is a simplified version - full spec is more complex
 */
function canonicalizeURL(url) {
  try {
    const parsed = new URL(url);
    
    // Remove fragment
    parsed.hash = '';
    
    // Normalize scheme to lowercase
    parsed.protocol = parsed.protocol.toLowerCase();
    
    // Normalize hostname to lowercase
    parsed.hostname = parsed.hostname.toLowerCase();
    
    // Remove default ports
    if ((parsed.protocol === 'http:' && parsed.port === '80') ||
        (parsed.protocol === 'https:' && parsed.port === '443')) {
      parsed.port = '';
    }
    
    // Remove trailing dot from hostname
    if (parsed.hostname.endsWith('.')) {
      parsed.hostname = parsed.hostname.slice(0, -1);
    }
    
    // Remove path if it's just '/'
    if (parsed.pathname === '/' && !parsed.search) {
      parsed.pathname = '';
    }
    
    return parsed.toString();
  } catch (e) {
    return url;
  }
}

/**
 * Generate host-suffix/path-prefix expressions from URL
 * Simplified version - full spec generates multiple expressions
 */
function generateExpressions(url) {
  const parsed = new URL(url);
  const expressions = [];
  
  // Full URL
  expressions.push(url);
  
  // Host + path
  if (parsed.pathname) {
    expressions.push(parsed.hostname + parsed.pathname);
  }
  
  // Host only
  expressions.push(parsed.hostname);
  
  return expressions;
}

/**
 * Generate SHA256 hash of a string
 */
function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

/**
 * Get first 4 bytes (8 hex characters) of hash as prefix
 */
function getHashPrefix(hash) {
  return hash.substring(0, 8);
}

/**
 * Check URL using Google Safe Browsing API v5
 */
async function checkURL(apiKey, url) {
  return new Promise((resolve, reject) => {
    // Canonicalize URL
    const canonicalUrl = canonicalizeURL(url);
    console.log(`Canonicalized URL: ${canonicalUrl}`);
    
    // Generate expressions and hash prefixes
    const expressions = generateExpressions(canonicalUrl);
    const hashPrefixes = expressions.map(expr => {
      const hash = sha256(expr);
      return getHashPrefix(hash);
    });
    
    console.log(`\nChecking ${hashPrefixes.length} hash prefix(es)...`);
    
    // Build API request URL
    // Note: v5 uses hashes.search endpoint
    const hashPrefixesParam = hashPrefixes.join('&hashPrefixes=');
    const apiUrl = `https://safebrowsing.googleapis.com/v5/hashes:search?key=${apiKey}&hashPrefixes=${hashPrefixesParam}`;
    
    console.log(`\nMaking request to Safe Browsing API...`);
    
    https.get(apiUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`\nAPI Error: HTTP ${res.statusCode}`);
          console.error('Response:', data);
          reject(new Error(`API returned status ${res.statusCode}`));
          return;
        }
        
        try {
          // The API returns protocol buffer format, but for simple testing
          // we can check if the response is empty (safe) or contains data (unsafe)
          if (data.length === 0 || data.trim() === '') {
            console.log('\n✅ Result: SAFE');
            console.log('Your URL is not flagged by Google Safe Browsing.');
            resolve({ safe: true, response: data });
          } else {
            console.log('\n⚠️  Result: POTENTIALLY UNSAFE');
            console.log('Your URL may be flagged by Google Safe Browsing.');
            console.log('\nResponse (protocol buffer format):');
            console.log(data);
            console.log('\nNote: To decode the full response, you may need a protocol buffer decoder.');
            resolve({ safe: false, response: data });
          }
        } catch (e) {
          console.error('\nError parsing response:', e.message);
          console.error('Raw response:', data);
          reject(e);
        }
      });
    }).on('error', (err) => {
      console.error('\nNetwork error:', err.message);
      reject(err);
    });
  });
}

// Run the check
console.log('='.repeat(60));
console.log('Google Safe Browsing API v5 Test');
console.log('='.repeat(60));
console.log(`\nURL to check: ${urlToCheck}`);

checkURL(apiKey, urlToCheck)
  .then((result) => {
    console.log('\n' + '='.repeat(60));
    console.log('Test completed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n' + '='.repeat(60));
    console.error('Test failed:', err.message);
    process.exit(1);
  });

