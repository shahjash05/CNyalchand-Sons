# C. Nyalchand & Sons — Future Changes & Roadmap

> This document tracks all planned improvements, pending features, and enhancements for the C. Nyalchand & Sons website.

---

## 🏗️ Phase 1 — Real Product Images (Priority: High)

The current product images are AI-generated placeholders. Replace them with real store photographs.

### What needs to be done

- [ ] Photograph all products in good lighting (natural light preferred)
  - Kurtas: Shaded, Silk, Cotton, Festive variants
  - Sherwanis: Blue, Gold, Navy, Festive
  - Bedsheets: All variants
  - Dhotis: Cotton, Gold Border, Silk
- [ ] Resize all images to **800×1000px** (portrait) for product cards
- [ ] Compress images using **TinyPNG** or **Squoosh** (keep under 200KB each)
- [ ] Replace all AI-generated `.png` files in the project folder with real photos
- [ ] Add a proper **hero banner photo** of the actual store front or interior
- [ ] Photograph the **store interior** for the About page

---

## 📧 Phase 2 — Working Enquiry / Contact Form (Priority: High)

Currently the contact form and enquiry modals show a success message but don't actually send anything.

### What needs to be done

- [ ] Set up **EmailJS** (free, no backend needed) to send enquiry emails directly from the browser
  - Go to [emailjs.com](https://www.emailjs.com), create a free account
  - Connect your Gmail (`sales@cnyalchand.com`)
  - Replace the fake form submit in `scripts.js` with a real `emailjs.send()` call
- [ ] The email should include: Customer name, phone, product name, and message
- [ ] Add a **WhatsApp quick enquiry button** (see Phase 3)
- [ ] Add basic **spam protection** (honeypot field or simple math CAPTCHA)

### EmailJS code change needed in `scripts.js`

```javascript
// Replace the setTimeout fake submit with:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  from_name: name,
  from_phone: phone,
  product: productTitle,
  message: message,
  to_email: 'sales@cnyalchand.com'
}).then(() => {
  // show success
});
```

---

## 💬 Phase 3 — WhatsApp Integration (Priority: High)

Indian customers strongly prefer WhatsApp over email forms.

### What needs to be done

- [ ] Add a **floating WhatsApp button** (bottom-right corner) on all pages
  - Links to `https://wa.me/91XXXXXXXXXX?text=Hello, I'm interested in...`
- [ ] In the **Enquiry Modal**, add a **"Chat on WhatsApp"** button alongside "Send Enquiry"
  - Pre-fill the message: `Hello, I'm interested in [Product Name]`
- [ ] On the **Contact page**, add a WhatsApp link next to the phone number
- [ ] Style the button with WhatsApp green (`#25D366`)

```html
<!-- Floating WhatsApp Button — add to all pages before </body> -->
<a href="https://wa.me/912222424546" class="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
  <i class="fa-brands fa-whatsapp"></i>
</a>
```

---

## 🛒 Phase 4 — Wishlist / Enquiry Cart (Priority: Medium)

Let customers save multiple items and submit one combined enquiry.

### What needs to be done

- [ ] Add an **"Add to Wishlist"** button (heart icon) on each product card
- [ ] Show a **wishlist counter badge** in the navigation
- [ ] Create a **Wishlist drawer** showing all saved items
- [ ] Allow bulk enquiry: submit all wishlist items in one WhatsApp/email message
- [ ] Store the wishlist in `localStorage` so it persists between page visits

---

## 🗂️ Phase 5 — More Product Category Pages (Priority: Medium)

The About page mentions these products that don't yet have dedicated pages:

- [ ] Create **`shawls.html`** — Shawls & Scarves collection
- [ ] Create **`lungi.html`** — Lungi & Cambric collection
- [ ] Create **`towels.html`** — Towels & Chadar collection
- [ ] Create **`poplin.html`** — Poplin & Cambric fabrics
- [ ] Add all new categories to **`products.html`**
- [ ] Add cards for new categories on the **home page**
- [ ] Update the hero slider with a new slide for the new categories

---

## 🔍 Phase 6 — Product Search (Priority: Medium)

- [ ] Add a **search bar** in the navigation
- [ ] On typing, filter visible product cards in real time
- [ ] Create a simple **search results page** that aggregates products from all categories
- [ ] Highlight the matching keyword in results

---

## 🗺️ Phase 7 — Store Info & Google Maps (Priority: Low)

- [ ] Update the **full street address** on the Contact page
- [ ] Add **store opening hours** (days and times)
- [ ] Add a **"Get Directions"** button that opens Google Maps on mobile
- [ ] Register on **Google My Business** so the store appears in local search results
- [ ] Update the embedded map pin to point to the exact store location

---

## 🌐 Phase 8 — Domain & Public Hosting (Priority: High)

The website currently only runs locally on `localhost`. To make it live:

- [ ] Buy a domain: **`cnyalchand.com`** or **`cnyalchandandsons.com`**
  - Recommended registrars: BigRock, GoDaddy, Namecheap
- [ ] Host for free on **Netlify** (easiest option)
  - Go to [netlify.com/drop](https://www.netlify.com/drop) and drag & drop the project folder
- [ ] Or use **GitHub Pages**:
  - Push project to a GitHub repo → Settings → Pages → Enable
- [ ] Connect the custom domain and enable **free HTTPS (SSL)**

---

## 📱 Phase 9 — Mobile UX Improvements (Priority: Medium)

- [ ] Test on real Android and iOS devices (not just browser DevTools)
- [ ] Make hero slider arrows larger and easier to tap on mobile
- [ ] Improve the Enquiry Modal form layout on small screens
- [ ] Add a **"Back to Top" button** for long product pages
- [ ] Ensure all tap targets are at least **44×44px**

---

## 🎨 Phase 10 — Design Enhancements (Priority: Low)

- [ ] Add a **seasonal/festive banner** (Diwali, Eid, Wedding Season promotions)
- [ ] Create a **"New Arrivals"** section on the homepage
- [ ] Add **fabric detail tags** on product cards (e.g., "100% Cotton", "Pure Silk")
- [ ] Add a **customer testimonials / reviews section** on the home page
- [ ] Add a **"Featured Product of the Week"** spotlight section

---

## 📊 Phase 11 — SEO & Analytics (Priority: Medium)

### SEO
- [ ] Add **Open Graph meta tags** so links look good on WhatsApp / Facebook
```html
<meta property="og:title" content="C. Nyalchand & Sons">
<meta property="og:image" content="https://yoursite.com/hero_banner.png">
<meta property="og:description" content="Premium Indian clothing in Mumbai">
```
- [ ] Create a **`sitemap.xml`** listing all pages
- [ ] Create a **`robots.txt`** file
- [ ] Register the site on **Google Search Console**

### Analytics
- [ ] Add **Google Analytics 4 (GA4)** tracking to all pages
  - Track which product pages get the most visits
  - Track enquiry form submissions as conversion events

---

## 🔧 Phase 12 — Code Quality & Maintenance (Priority: Low)

- [ ] Remove the old unused `kurta.png` file from the project folder
- [ ] Move all inline `style=""` attributes to proper CSS classes
- [ ] Add **JSDoc comments** to all functions in `scripts.js`
- [ ] Set up a **`.gitignore`** file before pushing to GitHub (exclude `.png` files if too large)
- [ ] Split `scripts.js` into smaller files as the site grows (e.g., `slider.js`, `modal.js`)

---

## 📋 Quick Summary Checklist

| # | Change | Priority | Effort |
|---|--------|----------|--------|
| 1 | Real product photos | 🔴 High | Medium |
| 2 | Working enquiry form (EmailJS) | 🔴 High | Small |
| 3 | WhatsApp button & integration | 🔴 High | Small |
| 4 | Wishlist / Enquiry cart | 🟡 Medium | Medium |
| 5 | More product category pages | 🟡 Medium | Medium |
| 6 | Product search bar | 🟡 Medium | Small |
| 7 | Correct store address & hours | 🟢 Low | Small |
| 8 | Domain & public hosting | 🔴 High | Small |
| 9 | Mobile UX improvements | 🟡 Medium | Small |
| 10 | Seasonal banners & design extras | 🟢 Low | Medium |
| 11 | SEO & Google Analytics | 🟡 Medium | Small |
| 12 | Code cleanup & maintenance | 🟢 Low | Small |

---

## ✅ Already Completed

- [x] Responsive mobile layout with hamburger menu
- [x] Dark mode toggle (persists across pages via localStorage)
- [x] Dynamic 3-slide hero banner with auto-advance, arrows, dots & touch swipe
- [x] Scroll reveal animations on all sections
- [x] 3D card tilt hover effect on product cards
- [x] Enquiry modal on all product pages (Kurtas, Sherwanis, Bedsheets, Dhotis)
- [x] Contact form with client-side validation & success message
- [x] Dedicated pages for all 4 main categories
- [x] AI-generated placeholder product images (10 images)
- [x] Google Maps embed on Contact page
- [x] Sticky nav with scroll shadow effect
- [x] Stats strip on homepage (50+ Years, 1000+ Products, 10k+ Customers)
- [x] Category icon pulse animation on hover
- [x] Footer with copyright

---

*Last updated: May 2026*
