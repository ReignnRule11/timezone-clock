# Timezone Clock — Deployment Guide

## 🚀 Production Deployment

This guide covers deploying Timezone Clock to various platforms.

---

## GitHub Pages (Free Hosting)

### Prerequisites
- GitHub account
- Repository pushed to GitHub

### Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Configure GitHub Pages:**
   - Go to repository **Settings**
   - Navigate to **Pages** section
   - Set **Source** to `main` branch
   - Set directory to `/root`
   - Save

3. **Update `vite.config.js`** (if needed):
   ```javascript
   export default defineConfig({
     base: '/timezone-clock/',  // Match your repo name
     // ... rest of config
   });
   ```

4. **Access your site:**
   ```
   https://ReignnRule11.github.io/timezone-clock
   ```

---

## Vercel (Recommended)

### Prerequisites
- Vercel account ([vercel.com](https://vercel.com))
- GitHub repository

### Option 1: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts:**
   - Link to your Git repository
   - Confirm settings
   - Deploy

### Option 2: Git Integration (Recommended)

1. **Sign in** to [vercel.com](https://vercel.com)
2. **Click** "New Project"
3. **Import** your GitHub repository
4. **Configure:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Deploy** — Vercel handles the rest!

### Custom Domain (Vercel)

1. Go to **Project Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatic

---

## Netlify

### Prerequisites
- Netlify account ([netlify.com](https://netlify.com))
- GitHub repository

### Steps

1. **Sign in** to Netlify
2. **Click** "Add new site → Import an existing project"
3. **Choose** GitHub and authorize
4. **Select** your repository
5. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Deploy** — Netlify starts automatically!

### Environment Variables (if needed)

1. Go to **Site settings → Build & deploy → Environment**
2. Add any required variables
3. Redeploy

---

## AWS S3 + CloudFront

### Prerequisites
- AWS account
- AWS CLI installed and configured

### Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://timezone-clock-prod
   ```

3. **Upload files:**
   ```bash
   aws s3 sync dist/ s3://timezone-clock-prod/ --delete
   ```

4. **Enable static website hosting:**
   - Go to S3 bucket **Properties**
   - Enable **Static website hosting**
   - Set index document to `index.html`
   - Set error document to `index.html`

5. **Create CloudFront distribution:**
   - Set origin to your S3 bucket
   - Configure cache behaviors
   - Deploy

---

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

### Build and Run

```bash
# Build image
docker build -t timezone-clock .

# Run container
docker run -p 80:80 timezone-clock
```

---

## Environment-Specific Builds

### Production
```bash
NODE_ENV=production npm run build
```

### Staging
```bash
NODE_ENV=staging npm run build
```

### Development
```bash
NODE_ENV=development npm run dev
```

---

## Performance Optimization

### Before Deployment

1. **Optimize build:**
   ```bash
   npm run build
   ```

2. **Check bundle size:**
   ```bash
   npm install -g webpack-bundle-analyzer
   vite-plugin-visualizer
   ```

3. **Enable compression:**
   - Gzip compression (automatic on most platforms)
   - Brotli for better compression

### CDN Configuration

- Enable **caching** for static assets
- Set **cache headers:**
  - HTML: 0 seconds (no-cache)
  - JS/CSS: 1 year (immutable)
  - Images: 1 year (immutable)

---

## Monitoring & Analytics

### Google Analytics

1. Add to `index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_ID');
   </script>
   ```

2. Replace `GA_ID` with your tracking ID

### Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```javascript
// In main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

---

## SSL/HTTPS

- **Vercel/Netlify**: Automatic SSL ✅
- **GitHub Pages**: Automatic SSL ✅
- **AWS CloudFront**: Automatic SSL ✅
- **Custom server**: Use Let's Encrypt (certbot)

---

## Troubleshooting

### Build fails on deployment?

1. Check Node.js version matches locally
2. Clear cache: `npm cache clean --force`
3. Reinstall: `rm -rf node_modules && npm install`
4. Check `vite.config.js` configuration

### Site not loading after deploy?

1. Check base path in `vite.config.js`
2. Verify HTML routing (SPA configuration)
3. Check browser console for errors
4. Clear browser cache

### Performance issues?

1. Check bundle size
2. Enable gzip/brotli compression
3. Optimize images
4. Use CDN for static assets
5. Enable caching headers

---

## Quick Deploy Checklist

- [ ] Run tests locally
- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] Responsive design works
- [ ] Theme toggle works
- [ ] Time format toggle works
- [ ] Timezone addition/removal works
- [ ] Local storage persistence works
- [ ] All 50+ timezones available
- [ ] Mobile experience tested
- [ ] Accessibility checked

---

## Support

Need help? Reach out:

- **WhatsApp:** [+234 902 143 0871](https://wa.me/2349021430871)
- **LinkedIn:** [Justus Okoro](https://www.linkedin.com/in/justus-okoro-358025199)
- **GitHub Issues:** [Open an issue](https://github.com/ReignnRule11/timezone-clock/issues)

---

**Happy deploying! 🚀**
