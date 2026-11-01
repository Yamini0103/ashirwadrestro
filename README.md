# ASHIRWAD RESTAURANT

Single-page website for **ASHIRWAD RESTAURANT** — a 100% pure-veg North Indian restaurant at 8, Navlakha Road, Janki Nagar, Indore (MP 452001).

Tagline: *Swaad Jo Dil Ko Chhu Jaaye* — Pure Veg, Pure Royal.

## What's in the site

- **Hero** — animated opening with a rotating brand ring, drifting dish photos and a mouse-following glow
- **Our Story** — letter-by-letter scroll reveal, animated stat counters and an interactive kitchen image
- **A Journey of Flavour** — pinned horizontal strip of kitchen scenes (spices, tandoor, naan, desserts)
- **Signature Specials** — dish cards that open into a detail dialog with price and a call button
- **Menu** — searchable, category-tabbed list of every dish and price
- **Thali, Gallery, Reviews, Why Us, Visit Us** — gallery lightbox, review marquee, map, and a contact form
- **Mobile bar** — sticky Call and WhatsApp buttons on small screens

All contact values (phone `9981401199`, WhatsApp link) live in `src/data/restaurant.ts` so the number appears in one place.

## Tech

React + TanStack Start (Vite), Tailwind CSS v4, framer-motion and Lenis for scroll motion, Radix UI dialogs, Vitest for tests.

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd ashirwadrestro
npm i
npm run dev
```

Then open the local URL the dev server prints.

```sh
npm run build      # production build
npx vitest run     # test suite
```

## Layout

```
src/
  assets/       dish and kitchen photography
  components/   Site.tsx (page sections), motion.tsx (scroll/animation helpers), ui/ (primitives)
  data/         restaurant.ts (contact), menu.ts (full menu)
  routes/       index.tsx (the page), __root.tsx (app shell + head tags)
  styles.css    theme tokens, day/night palette, animation utilities
  test/         Vitest specs
```
