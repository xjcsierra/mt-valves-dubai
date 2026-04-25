# MT Valves &amp; Fittings UAE — Static Website

Catalogue website for MT Valves &amp; Fittings, Dubai operation. Built as a static site (no server, no database).

## What's inside

```
mt-valves-dubai/
├── index.html              ← Home page
├── about.html              ← About MT
├── where-to-buy.html       ← Channels (Amazon.ae · Noon · B2B)
├── certifications.html     ← CE, DVGW, WRAS, etc.
├── contact.html            ← Contact form
├── 404.html                ← Error page
├── catalogue/              ← 8 category pages
│   ├── ball-valves.html
│   ├── butterfly-valves.html
│   ├── check-valves.html
│   ├── gate-valves.html
│   ├── angle-valves.html
│   ├── strainers.html
│   ├── bibcocks.html
│   └── expansion-joints.html
├── product/                ← 224 individual product pages
│   └── (one HTML file per SKU)
├── assets/
│   ├── styles.css          ← Single shared stylesheet
│   └── favicon.svg
├── sitemap.xml             ← For Google indexing
├── robots.txt              ← Crawler rules
├── CNAME                   ← Custom domain (edit this!)
└── README.md               ← This file
```

**Total:** ~234 HTML files + 1 CSS + a few utility files. Around 4 MB total.

---

## Step 1 — Configure the form (5 minutes)

The contact form points to a placeholder endpoint. You need a free Formspree account so submissions arrive in your inbox.

1. Go to https://formspree.io and sign up with `dubai@mt-valves.ae` (or your email)
2. Click **+ New Form**, name it "MT Dubai Contact"
3. Copy the form ID — looks like `xpzvkglw` (8 letters)
4. Open `contact.html` in any text editor
5. Find this line near the top of the form:
   ```
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
   ```
6. Replace `YOUR_FORMSPREE_ID` with your real ID
7. Save

Free tier allows 50 submissions/month. After that the plan is $10/month.

---

## Step 2 — Replace placeholder phone numbers (2 minutes)

I used `+971 50 000 0000` as a placeholder for the Dubai number. Find &amp; replace it across all files when MT confirms the real one. Same for `971500000000` (used in WhatsApp links — same number, no spaces or +).

**Files to update:**
- All HTML files use the same template, so a global find &amp; replace in your editor catches everything in one pass

**Quick search &amp; replace (using VS Code or any editor):**
- Replace `+971 50 000 0000` → `+971 XX XXX XXXX` (whatever the real number is)
- Replace `971500000000` → `971XXXXXXXXX` (same number, no spaces)
- Replace `dubai@mt-valves.ae` → real email if different
- Replace `mt-valves-dubai.com` → real domain (if different)

---

## Step 3 — Deploy to GitHub Pages (15 minutes)

### 3.1 Create GitHub account (if you don't have one)

Go to https://github.com/signup. It's free.

### 3.2 Create the repository

1. Once logged in, click the **+** at top right → **New repository**
2. Repository name: `mt-valves-dubai` (or whatever you prefer)
3. **Make it Public** (required for free GitHub Pages — if you need private, GitHub Pages requires the Pro plan at $4/month)
4. Don't add README (we already have one)
5. Click **Create repository**

### 3.3 Upload the files

Easiest way with no Git knowledge:

1. On the new empty repo page click **"uploading an existing file"** (it's a link in the middle of the page)
2. Drag the **entire content** of the `mt-valves-dubai/` folder (NOT the folder itself — the files INSIDE it) into the upload area
3. Wait for the upload to complete (224 product files take ~1-2 min)
4. At the bottom, write a commit message like "Initial site upload"
5. Click **Commit changes**

### 3.4 Enable GitHub Pages

1. In your repo, click **Settings** (top tab)
2. Left sidebar → **Pages**
3. Under "Source" select: **Deploy from a branch**
4. Branch: **main** · Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes
7. Refresh the page — you'll see "Your site is live at `https://YOUR_USERNAME.github.io/mt-valves-dubai/`"

🎉 You have a live website.

---

## Step 4 — Custom domain (optional, ~$15/year)

If you want to use a real domain like `mt-valves-dubai.com` or `mt-valves.ae`:

### 4.1 Buy the domain

Recommended registrars:
- **Namecheap** — easiest, ~$10-15/year for `.com`
- **Cloudflare** — at cost (no markup), ~$8-10/year for `.com`
- **For `.ae`**: must be bought through an UAE-accredited registrar like **TASJEEL** or **AE Domain Administration** — requires UAE trade licence, ~$30/year

### 4.2 Configure DNS

In your domain registrar, add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `YOUR_USERNAME`.github.io |

### 4.3 Update CNAME file

The repo already has a `CNAME` file. Edit it:
1. In GitHub click on `CNAME` file
2. Click the pencil icon (edit)
3. Replace content with your domain (e.g. `mt-valves-dubai.com`)
4. Commit

### 4.4 Enable HTTPS in GitHub Pages

1. Settings → Pages
2. Custom domain: enter your domain (`mt-valves-dubai.com`)
3. Wait 5-10 min for DNS propagation
4. Tick **"Enforce HTTPS"** when it becomes available

---

## Step 5 — Submit to Google (10 minutes)

So Google indexes your site:

1. Go to https://search.google.com/search-console
2. Add your domain as property
3. Verify ownership (usually via DNS TXT record)
4. Submit your sitemap: `https://mt-valves-dubai.com/sitemap.xml`

Expect ~1-2 weeks for full indexing of all 234 pages.

---

## How to update content

### Change a price or stock figure

Open the relevant `product/SKU-name.html` file and edit the price/stock numbers. Commit changes in GitHub. Site is live again in ~30 seconds.

For bulk updates: it's better to re-run the build script with the updated Excel — message me and I'll regenerate.

### Add a new product

Two options:
1. **Manual** — copy any existing product HTML, edit fields, save in `product/` with a new filename. Add a link from the relevant category page.
2. **Bulk** — update the Excel and regenerate the whole site.

### Change phone, email or address

Use Find &amp; Replace across all files in your editor. The values appear identically in every page so a global replace works.

### Update the logo

Replace `assets/favicon.svg`. The full logo is embedded inline in the HTML files — to change it, you'd need to regenerate the site from the build script.

---

## Performance &amp; SEO notes

This site already follows good practices:

- ✅ Single CSS file (~30 KB) shared across all pages
- ✅ Lazy-loaded images on grids
- ✅ Semantic HTML (proper headings, breadcrumbs, etc.)
- ✅ Open Graph meta tags (good for sharing on LinkedIn, WhatsApp)
- ✅ Canonical URLs (no duplicate content issues)
- ✅ Sitemap.xml + robots.txt
- ✅ Mobile-responsive
- ✅ No external JavaScript dependencies
- ⚠️ Images served from `cloudfront.net/CMP8164/...` (MT's own CDN) — fast globally
- ⚠️ Web fonts loaded from Google Fonts — adds ~200ms first load, acceptable

For maximum speed, host on **Cloudflare Pages** instead of GitHub Pages (faster globally, especially for the UAE region). Migration is trivial — same files, different hosting.

---

## Cost summary

| Item | Cost |
|---|---|
| GitHub account | Free |
| GitHub Pages hosting | Free |
| SSL certificate | Free (auto via Let's Encrypt) |
| Formspree (50 submissions/month) | Free |
| Domain `.com` | ~$10/year |
| Domain `.ae` | ~$30/year |
| **Total first year** | **~$10-30** |

---

## Migrating to Shopify later

The day MT decides to start selling online, the migration path is straightforward:

1. The CSV `mt_shopify_products.csv` (already prepared) imports the 224 products into Shopify in 5 minutes
2. The static site continues to work as the marketing/SEO site
3. Or replaces gradually: Shopify becomes `shop.mt-valves-dubai.com`, the static site stays at `mt-valves-dubai.com`

The investment in this static site is not lost when you move to Shopify — it remains useful as the corporate/SEO domain.

---

## Questions or issues?

Contact me (the project owner) for build script updates, content changes, or design tweaks.

**Built**: April 2026
**Stack**: HTML5 + CSS3 (no JavaScript dependencies)
**Source data**: `stock_dubai_v22_PRESENTACION.xlsx`
**Logo**: official MT brand SVG
