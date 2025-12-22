# Deployment Setup Checklist

## Pre-Deployment Verification

### ✅ Local Build Test
```bash
# Verify build works locally
npm run build

# Check build output
ls -la dist/

# Expected files:
# - index.html (~0.5 KB)
# - assets/index-*.css (~22 KB)
# - assets/index-*.js (~267 KB)
```

### ✅ Build Configuration
- [x] `netlify.toml` created with:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - SPA routing configured (redirects to index.html)
  - Cache headers for optimal performance
  - Security headers configured

- [x] `.nvmrc` created with Node.js version 18.18.0

- [x] `.gitignore` configured to ignore:
  - `node_modules/`
  - `dist/`
  - `.env` files

- [x] `package.json` has all required scripts:
  - `npm run dev` - Development server
  - `npm run build` - Production build
  - `npm run lint` - Code linting
  - `npm run preview` - Preview production build

### ✅ Code Quality
- [x] TypeScript configured (`tsconfig.json`)
- [x] ESLint configured (`.eslintrc.cjs`)
- [x] No TypeScript compilation errors
- [x] No unused imports
- [x] Responsive design tested

### ✅ Git Repository
- [x] Repository initialized
- [x] All files committed
- [x] `testing-branch` pushed to GitHub

## Netlify Setup - Step by Step

### Option 1: Automatic Setup (Recommended)

1. **Sign Up / Login to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign in with GitHub account

2. **Connect Repository**
   - Click "New site from Git"
   - Choose GitHub as provider
   - Authorize Netlify
   - Select `mehedinaeem/JKKNIU-Research-Society`

3. **Configure Build Settings**
   - **Base directory:** Leave empty (or `Frontend` if monorepo)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node.js version:** 18.18.0 (auto-detected from .nvmrc)
   - Click "Deploy site"

4. **Done!**
   - Netlify auto-generates a site URL
   - Every push to `testing-branch` automatically deploys

### Option 2: Using Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy manually
netlify deploy --prod

# Or setup continuous deployment
netlify init
```

## GitHub Actions (Optional - for additional CI/CD)

### Setup GitHub Secrets

1. Go to GitHub repo → Settings → Secrets and variables → Actions

2. Add these secrets:
   ```
   NETLIFY_AUTH_TOKEN: [your-netlify-auth-token]
   NETLIFY_SITE_ID: [your-netlify-site-id]
   ```

3. Get these values from:
   - **NETLIFY_AUTH_TOKEN:** Netlify → User settings → Applications → Personal access tokens
   - **NETLIFY_SITE_ID:** Netlify Dashboard → Site settings → API ID

### Workflow Triggers

The `.github/workflows/deploy.yml` file will:
- ✅ Run on every push to `testing-branch` or `main`
- ✅ Run TypeScript type check
- ✅ Run ESLint
- ✅ Build project
- ✅ Deploy to Netlify automatically
- ✅ Comment on PRs with deploy preview

## Environment Variables

### Development Environment
Create `.env.local` in project root:
```
VITE_API_URL=http://localhost:8000/api
VITE_ENV=development
```

### Production Environment (Netlify)
1. Go to Netlify Dashboard → Site settings → Build & deploy → Environment
2. Add production variables:
   ```
   VITE_API_URL=https://api.jkkniu.edu.bd
   VITE_ENV=production
   ```

## Post-Deployment Tasks

### Verify Deployment

1. **Check Site URL**
   - Netlify provides automatic URL (e.g., `https://xxx.netlify.app`)
   - Click link to verify site loads

2. **Test Functionality**
   - Homepage loads properly
   - Navigation works (all links functional)
   - Responsive design works (test on mobile)
   - Forms display correctly
   - No console errors

3. **Check Performance**
   - Netlify Dashboard → Analytics
   - Monitor load times and errors
   - Use Lighthouse for performance audit

### Connect Custom Domain

1. **Buy Domain** (if needed)
   - Recommended registrars: Namecheap, GoDaddy, Google Domains

2. **Connect to Netlify**
   - Netlify Dashboard → Site settings → Domain management
   - Click "Add domain"
   - Enter custom domain (e.g., `research.jkkniu.edu.bd`)
   - Update DNS records at registrar

3. **SSL Certificate**
   - Netlify auto-issues Let's Encrypt certificate
   - Takes ~24 hours
   - No additional cost

### Monitor Deployments

1. **Netlify Dashboard**
   - View deployment history
   - Check build logs for issues
   - Monitor site uptime

2. **GitHub Actions**
   - View workflow runs
   - Check logs for any failures
   - PR comments show deploy previews

## Troubleshooting

### Build Fails

**Check:**
1. Netlify build logs (Netlify Dashboard → Deploys → [deployment] → View deploy log)
2. Local build: `npm run build`
3. Node.js version matches `.nvmrc`
4. Dependencies installed: `npm ci`

**Common fixes:**
- Clear npm cache: `npm cache clean --force`
- Reinstall deps: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

### Site Shows 404 Errors

**Solution:** SPA routing already configured in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
This tells Netlify to serve `index.html` for all routes, letting React Router handle routing.

### Old Content Still Showing

**Solutions:**
1. Hard refresh browser: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Clear browser cache
3. Netlify cache clears automatically, may take 5-10 minutes
4. Force rebuild: Netlify Dashboard → Deploys → Trigger deploy

### Environment Variables Not Working

1. Verify in Netlify: Site settings → Environment
2. Redeploy after adding variables
3. Check variable names (must start with `VITE_` for Vite)
4. Access in code: `import.meta.env.VITE_VAR_NAME`

## Rollback / Revert

### Rollback to Previous Deploy

1. Netlify Dashboard → Deploys tab
2. Find desired deployment
3. Click "Restore" button
4. Confirmation - previous version now live

### Revert Git Commit

```bash
git revert [commit-hash]
git push origin testing-branch
# Netlify auto-deploys new commit
```

## Maintenance

### Regular Tasks

- **Weekly:** Monitor Netlify analytics
- **Monthly:** Review build logs for warnings
- **Quarterly:** Update npm dependencies: `npm update`
- **Quarterly:** Security audit: `npm audit`

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest

# Test build
npm run build

# Commit and push
git add .
git commit -m "Update dependencies"
git push origin testing-branch
```

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/start/library/start-data-flow)
- [Netlify CLI Reference](https://cli.netlify.com/)

## Support Contacts

**For Netlify issues:**
- Netlify Support: support@netlify.com
- Documentation: https://docs.netlify.com

**For Project issues:**
- Repository: https://github.com/mehedinaeem/JKKNIU-Research-Society
- Issues: GitHub Issues tab

---

**Deployment Status:** ✅ Ready for production deployment to Netlify!
