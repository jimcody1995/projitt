# SEO Quick Start Guide

Quick reference for using the SEO features implemented in Projitt.

## ⚡ Quick Setup (5 minutes)

### 1. Set Environment Variable
Create `.env.local` file:
```bash
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 2. Verify Files Generated
After running `npm run dev` or `npm run build`, these should be accessible:
- `/sitemap.xml` - Your sitemap
- `/robots.txt` - Robots configuration
- `/manifest.json` - PWA manifest

### 3. Test Your Setup
```bash
# Check if files are accessible
curl http://localhost:3001/sitemap.xml
curl http://localhost:3001/robots.txt
curl http://localhost:3001/manifest.json
```

---

## 📝 Adding SEO to New Pages

### For Server Components (Recommended)
```typescript
// app/your-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Your page description (150-160 characters)',
};

export default function YourPage() {
  return <div>Your content</div>;
}
```

### Using SEO Utilities
```typescript
// app/your-page/page.tsx
import { generateMetadata } from '@/lib/seo-utils';

export const metadata = generateMetadata({
  title: 'Your Page Title',
  description: 'Your page description',
  path: '/your-page',
  keywords: ['keyword1', 'keyword2'],
});

export default function YourPage() {
  return <div>Your content</div>;
}
```

---

## 🎨 Adding Custom Structured Data

```typescript
// In your page component
export default function YourPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://projitt.com' },
      { '@type': 'ListItem', position: 2, name: 'Your Page', item: 'https://projitt.com/your-page' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div>Your content</div>
    </>
  );
}
```

---

## 🖼️ Optimizing Images

### Using Next.js Image Component
```typescript
import Image from 'next/image';

// For static images
<Image
  src="/images/logo.png"
  alt="Descriptive alt text"
  width={200}
  height={50}
  priority // Use for above-the-fold images
/>

// For responsive images
<Image
  src="/images/banner.jpg"
  alt="Descriptive alt text"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

---

## 📊 Monitoring Performance

### View Core Web Vitals
Web Vitals are automatically logged to the console in development mode.

### Integration with Analytics

**Google Analytics:**
Uncomment the GA code in `app/components/seo/web-vitals.tsx`:
```typescript
if (window.gtag) {
  window.gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_label: metric.id,
    non_interaction: true,
  });
}
```

**Custom Analytics:**
```typescript
fetch('/api/analytics', {
  method: 'POST',
  body: JSON.stringify(metric),
  headers: { 'Content-Type': 'application/json' },
});
```

---

## 🔍 Testing Your SEO

### 1. Google Rich Results Test
Visit: https://search.google.com/test/rich-results
Enter your URL to test structured data

### 2. Open Graph Preview
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

### 3. Lighthouse Audit
```bash
# In Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit for SEO and Performance
```

### 4. PageSpeed Insights
Visit: https://pagespeed.web.dev/
Enter your URL for comprehensive analysis

---

## ✅ Pre-Launch Checklist

- [ ] `NEXT_PUBLIC_BASE_URL` is set correctly
- [ ] All pages have unique titles and descriptions
- [ ] Images have descriptive alt text
- [ ] Sitemap is accessible
- [ ] Robots.txt is configured
- [ ] Structured data validates without errors
- [ ] Open Graph images are set
- [ ] Core Web Vitals are in green zone
- [ ] Mobile responsiveness tested
- [ ] HTTPS is enabled in production

---

## 🚨 Common Issues

### Sitemap not generating
- Ensure you've run `npm run build`
- Check that `app/sitemap.ts` exists
- Verify no TypeScript errors

### Metadata not appearing
- Check if component is a server component
- Client components can't export metadata
- Use layout.tsx for client component pages

### Images not optimizing
- Verify next.config.js has images config
- Check image paths are correct
- Ensure images are in public folder

---

## 📈 SEO Best Practices

### Title Tags
✅ **Good:** "Employee Management - Projitt HR System"
❌ **Bad:** "Page" or "Untitled"

### Meta Descriptions
✅ **Good:** "Manage employee records, track attendance, and process payroll efficiently with Projitt's comprehensive HR management platform."
❌ **Bad:** "Welcome to our website" or duplicate descriptions

### URLs
✅ **Good:** `/employees/manage`
❌ **Bad:** `/page?id=123&action=view`

### Headings
✅ **Good:** Single H1, then H2, H3 in order
❌ **Bad:** Multiple H1s or skipping heading levels

---

## 🔗 Useful Links

- [Full SEO Documentation](./SEO_IMPLEMENTATION.md)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Console](https://search.google.com/search-console)
- [Schema Markup Validator](https://validator.schema.org/)

---

**Need Help?** Check the full [SEO Implementation Guide](./SEO_IMPLEMENTATION.md)

