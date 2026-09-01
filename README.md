# Next.js Rendering Strategies Playground & Cheat Sheet

A comprehensive, hands-on Next.js project demonstrating and comparing **CSR**, **SSR**, **ISR**, and **SSG** with interactive live routes and real-time execution timestamps.

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Project Structure & Routes

| Route | Rendering Strategy | Description | Key Code Pattern |
| :--- | :--- | :--- | :--- |
| `/` | **Overview / Cheat Sheet** | Comparison table, explanations, links | App Router standard layout |
| `/csr` | **Client-Side Rendering** | Runs in browser via React hooks | `'use client'`, `useEffect`, `useState` |
| `/ssr` | **Server-Side Rendering** | Runs on server on every HTTP request | `export const dynamic = 'force-dynamic'` / `{ cache: 'no-store' }` |
| `/isr` | **Incremental Static Regeneration** | Static cache with background revalidation | `export const revalidate = 10` / `{ next: { revalidate: 10 } }` |
| `/ssg` | **Static Site Generation** | Pre-rendered once at build time | `{ cache: 'force-cache' }` (default) |
| `/api/timestamp` | **Server API Route** | Returns current ISO & locale server time | `NextResponse.json(...)` |

---

## 📊 Summary Comparison

| Strategy | When HTML is Rendered | SEO Quality | Initial TTFB | Server CPU Load | Typical Use Cases |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CSR** | In browser runtime | ⚠️ Poor (blank shell) | ⚡ Fast shell, slow data | None (Client-side) | Private dashboards, settings, admin panels |
| **SSR** | Server on every request | ✅ Excellent | ⏳ Depends on API speed | High under heavy load | Live stock prices, dynamic feeds, checkout |
| **ISR** | Build time + Background update | ✅ Excellent | ⚡ Blazing (CDN cache) | Low | E-commerce catalogs, news feeds, blogs |
| **SSG** | Build time only | ✅ Excellent | ⚡ Blazing (CDN cache) | Zero | Landing pages, marketing, documentation |
