# CRICKET PRO — Base44 Dev Environment

## Overview
A premium cricket e-commerce website built with Vite + React + TypeScript + Tailwind CSS. No backend or database — cart and wishlist persist via localStorage. All product, article, and review data is static TypeScript in `src/data/`.

## Tech Stack
- **Frontend:** Vite 5, React 18, TypeScript, Tailwind CSS 3
- **Routing:** react-router-dom v6
- **Icons:** lucide-react
- **State:** React Context (CartContext, WishlistContext) with localStorage persistence
- **No backend** — all data is static. Checkout is a demonstration flow (no payment processing).

## Running the App
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
The app runs on port 3000 via Vite dev server with hot reload.

## Project Structure
- `src/data/` — static data (products, categories, articles, reviews, players, matches) and TypeScript types
- `src/context/` — CartContext and WishlistContext with localStorage persistence
- `src/components/` — reusable UI components (Header, Footer, ProductCard, CategoryCard, etc.)
- `src/pages/` — route pages (Home, Shop, ProductDetail, Cart, Checkout, News, Article, Guides, Contact, About, Wishlist)

## Key Notes
- The MRF cricket kit image is in `public/mrf-cricket-kit.jpg` (copied from the repo root image)
- Product visuals use CSS gradients + emoji icons (except the MRF kit which uses the real image)
- Tailwind safelist includes gradient color classes used dynamically in data files
- Match scores and customer reviews are clearly labeled as sample/demonstration data
- Contact details in the footer and contact page are editable placeholders
- No external secrets or API keys are required to run the app
