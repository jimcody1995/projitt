# SEO Implementation Guide

This document outlines the comprehensive SEO optimizations implemented in the Projitt HR Management System.

## 📋 Table of Contents

1. [Meta Tags & Metadata](#meta-tags--metadata)
2. [Structured Data (JSON-LD)](#structured-data-json-ld)
3. [Sitemap & Robots.txt](#sitemap--robotstxt)
4. [Performance Optimizations](#performance-optimizations)
5. [Core Web Vitals Monitoring](#core-web-vitals-monitoring)
6. [Image Optimization](#image-optimization)
7. [Security Headers](#security-headers)
8. [PWA Support](#pwa-support)
9. [Best Practices](#best-practices)

---

## 🏷️ Meta Tags & Metadata

### Root Layout Metadata
**Location:** `app/layout.tsx`

Enhanced metadata includes:
- **Title Template**: `%s | Projitt` for consistent branding
- **Open Graph**: Full OG tags for social media sharing
- **Twitter Cards**: Twitter-specific metadata
- **Keywords**: Relevant HR management keywords
- **Robots**: Search engine indexing directives
- **Viewport**: Responsive meta tags

### Page-Specific Metadata
Pages can export their own metadata using Next.js Metadata API:

```typescript
// Example: app/(protected)/recruitment/page.tsx
export const metadata: Metadata = {
  title: 'Recruitment',
  description: 'Manage job postings, applications, interviews, and assessments.',
};
```

### Environment Variables
Set `NEXT_PUBLIC_BASE_URL` in your environment:
```bash
NEXT_PUBLIC_BASE_URL=https://projitt.com
```

---

## 📊 Structured Data (JSON-LD)

### Implemented Schemas
**Location:** `app/components/seo/structured-data.tsx`

1. **Organization Schema** - Company information
2. **WebSite Schema** - Website details with SearchAction
3. **WebApplication Schema** - Software application features
4. **BreadcrumbList Schema** - Navigation breadcrumbs

### SEO Utilities
**Location:** `lib/seo-utils.ts`

Helper functions for generating:
- Page metadata with SEO optimizations
- Breadcrumb schemas
- Article schemas
- FAQ schemas
- Software application schemas

**Usage Example:**
```typescript
import { generateMetadata } from '@/lib/seo-utils';

export const metadata = generateMetadata({
  title: 'Dashboard',
  description: 'HR metrics and analytics',
  path: '/dashboard',
  keywords: ['dashboard', 'analytics', 'metrics'],
});
```

---

## 🗺️ Sitemap & Robots.txt

### Dynamic Sitemap
**Location:** `app/sitemap.ts`

- Automatically generates `sitemap.xml`
- Includes all public and protected routes
- Configurable change frequency and priority
- Updates with current date

**URL:** `https://your-domain.com/sitemap.xml`

### Robots.txt
**Location:** `app/robots.ts`

- Allows all crawlers with specific rules
- Disallows API routes and private paths
- Points to sitemap location
- Special rules for Googlebot and Bingbot

**URL:** `https://your-domain.com/robots.txt`

---

## ⚡ Performance Optimizations

### Next.js Config
**Location:** `next.config.js`

#### Image Optimization
- AVIF and WebP format support
- Responsive image sizes
- Minimum cache TTL: 60 seconds
- SVG support with CSP

#### Code Splitting
- Automatic vendor chunk splitting
- Package import optimization for:
  - lucide-react
  - date-fns
  - react-day-picker
  - @tanstack/react-table
  - recharts
  - apexcharts

#### Compression
- Gzip compression enabled
- ETag generation disabled for better caching
- Powered-by header removed for security

---

## 📈 Core Web Vitals Monitoring

### Web Vitals Component
**Location:** `app/components/seo/web-vitals.tsx`

Tracks performance metrics:
- **CLS** (Cumulative Layout Shift)
- **FID** (First Input Delay)
- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)
- **TTFB** (Time to First Byte)
- **INP** (Interaction to Next Paint)

#### Integration Examples

**Google Analytics:**
```javascript
if (window.gtag) {
  window.gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_label: metric.id,
    non_interaction: true,
  });
}
```

**Custom Analytics API:**
```javascript
fetch('/api/analytics', {
  method: 'POST',
  body: JSON.stringify(metric),
  headers: { 'Content-Type': 'application/json' },
});
```

---

## 🖼️ Image Optimization

### Current Implementation
Images are configured for optimization but remain as `<img>` tags to preserve existing styles.

### Next.js Image Component
To use optimized images:

```typescript
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Projitt Logo"
  width={200}
  height={50}
  priority // for above-the-fold images
/>
```

### Best Practices
- Use `priority` for critical images (above the fold)
- Specify `width` and `height` to prevent layout shift
- Use `loading="lazy"` for below-the-fold images
- Prefer WebP/AVIF formats

---

## 🔒 Security Headers

**Location:** `next.config.js` - `headers()` function

Implemented security headers:
- **X-DNS-Prefetch-Control**: Enable DNS prefetching
- **Strict-Transport-Security**: HTTPS enforcement
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME sniffing protection
- **X-XSS-Protection**: XSS attack prevention
- **Referrer-Policy**: Control referrer information
- **Permissions-Policy**: Feature access control

---

## 📱 PWA Support

### Web App Manifest
**Location:** `app/manifest.ts`

Features:
- App name and description
- Theme colors
- Display mode (standalone)
- App icons (multiple sizes)
- Language and orientation settings

**URL:** `https://your-domain.com/manifest.json`

---

## 🎯 Best Practices

### 1. Metadata Management
- Always provide unique titles and descriptions for each page
- Keep titles under 60 characters
- Keep descriptions between 150-160 characters
- Include relevant keywords naturally

### 2. Structured Data
- Use appropriate schema types for content
- Validate schemas with Google's Rich Results Test
- Keep schemas up to date with content changes

### 3. Performance
- Monitor Core Web Vitals regularly
- Optimize images before upload
- Use code splitting for large components
- Minimize JavaScript bundle size

### 4. Content Optimization
- Use semantic HTML elements
- Maintain proper heading hierarchy (H1 → H6)
- Add alt text to all images
- Ensure content is crawlable (not in JavaScript)

### 5. Mobile Optimization
- Test on multiple devices and screen sizes
- Ensure touch targets are at least 48x48px
- Use responsive images
- Optimize for mobile-first indexing

### 6. Accessibility
- Use proper ARIA labels
- Maintain sufficient color contrast
- Ensure keyboard navigation works
- Provide text alternatives for media

---

## 🔧 Configuration Checklist

- [ ] Set `NEXT_PUBLIC_BASE_URL` environment variable
- [ ] Add Google Analytics ID (if using)
- [ ] Add verification codes for search engines
- [ ] Configure social media URLs in structured data
- [ ] Create app icons for PWA (192x192, 512x512)
- [ ] Test sitemap.xml generation
- [ ] Test robots.txt accessibility
- [ ] Verify Open Graph images
- [ ] Set up analytics integration
- [ ] Test Core Web Vitals monitoring

---

## 🚀 Deployment

### Build Command
```bash
npm run build
```

### Production Checklist
- [ ] Environment variables configured
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Manifest accessible at `/manifest.json`
- [ ] All meta tags rendering correctly
- [ ] Structured data validated
- [ ] Performance metrics acceptable
- [ ] Security headers active
- [ ] HTTPS enabled

---

## 📚 Additional Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## 📞 Support

For questions or issues with SEO implementation, please refer to:
- Next.js documentation
- Google Search Console
- Web.dev performance guides

---

**Last Updated:** October 29, 2025
**Version:** 1.0.0

