# Netlify Deployment Guide

## Quick Start - Automatic Deployment

### Step 1: Connect Repository to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in (or create an account)
2. Click **"New site from Git"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the **JKKNIU-Research-Society** repository
6. Choose the **testing-branch** (or your desired branch)

### Step 2: Configure Build Settings

Netlify will auto-detect the build configuration from `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Base directory:** (leave empty or set to `Frontend`)

### Step 3: Environment Variables (if needed)

In Netlify Dashboard → Site settings → Build & deploy → Environment:
- `NODE_ENV` = `production` (already set in netlify.toml)
- `NODE_VERSION` = `18.18.0` (already set in netlify.toml)

### Step 4: Deploy!

1. Click **Deploy site**
2. Netlify will automatically:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build the project (`npm run build`)
   - Deploy the `dist` folder to Netlify's CDN

### Step 5: Enable Continuous Deployment

Once the initial deploy is complete, every push to your branch will automatically trigger a new deployment:

- Push to `testing-branch` → Automatic build and deploy
- Deploy preview for pull requests (optional)

## Configuration Files

### `netlify.toml`
- **Build command:** Runs `npm run build`
- **Publish directory:** Serves from `dist` folder
- **SPA Routing:** Redirects all routes to `index.html` for React Router
- **Cache headers:** Optimizes performance for assets and index
- **Security headers:** Protects against common web vulnerabilities

### `.nvmrc`
- Specifies Node.js version `18.18.0` for consistent builds

### `.gitignore`
- Already configured to ignore `node_modules`, `dist`, and sensitive files

## Deployment Flow

```
Push to GitHub (testing-branch)
        ↓
Netlify receives webhook
        ↓
Clone repository
        ↓
Install dependencies (npm install)
        ↓
Run build command (npm run build)
        ↓
Generate dist/ folder
        ↓
Deploy to Netlify CDN
        ↓
Live site updated
```

## What Happens During Build

1. **Install Dependencies:** `npm ci` (or `npm install`)
2. **Type Check:** `tsc` (TypeScript compilation)
3. **Build:** `vite build` (Vite creates optimized dist folder)
4. **Output:** 
   - HTML: ~0.48 KB
   - CSS: ~22.27 KB (gzipped: ~4.38 KB)
   - JavaScript: ~267 KB (gzipped: ~73.72 KB)

## Testing Before Deploy

### Local Build Test
```bash
npm run build
npm run preview
```

### Check Build Output
```bash
ls dist/
```

Expected files:
- `dist/index.html`
- `dist/assets/index-*.css`
- `dist/assets/index-*.js`

## Monitoring Deployments

### In Netlify Dashboard:

1. **Deploys** tab - View all deployments
2. **Deploy previews** - Test PRs before merging
3. **Build logs** - Debug any build failures
4. **Analytics** - Monitor site performance

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Build fails with "npm: command not found" | Check `.nvmrc` - should be `18.18.0` |
| 404 errors on page refresh | SPA redirect in `netlify.toml` is working correctly |
| Old assets still showing | Clear browser cache, Netlify CDN clears automatically |
| Build timeout | Increase timeout in Netlify settings or optimize build |

## Environment Variables

Add sensitive data in Netlify Dashboard (not in code):

1. Site settings → Build & deploy → Environment
2. Add key-value pairs
3. Rebuild site after adding variables

Examples:
- API endpoints
- Authentication tokens
- Feature flags

## Domain Setup

### Connect Custom Domain

1. Netlify Dashboard → Site settings → Domain management
2. Click **Add domain**
3. Follow DNS configuration steps
4. SSL certificate auto-issued (takes ~24 hours)

### Subdomain (if using existing domain)

Update your domain registrar's DNS records to point to Netlify nameservers

## Branch Deployments

Deploy different branches to different URLs:

1. Netlify Dashboard → Site settings → Build & deploy → Deploy contexts
2. Configure branch deploys:
   - `main` → Production site
   - `testing-branch` → Staging site
   - `develop` → Development site

## Rollback to Previous Deploy

1. Netlify Dashboard → Deploys
2. Click on any previous deployment
3. Click **Restore**

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite + Netlify Guide](https://docs.netlify.com/frameworks-and-platforms/frameworks/vite/)
- [SPA Routing on Netlify](https://docs.netlify.com/routing/overview/)
- [Environment Variables on Netlify](https://docs.netlify.com/configure-builds/environment-variables/)

## Support

For deployment issues:
1. Check Netlify build logs
2. Verify `netlify.toml` configuration
3. Test locally: `npm run build && npm run preview`
4. Contact Netlify support with build log details
