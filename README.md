# Just Yummy Bakery — Frontend

React + Vite single-page application for the Just Yummy Bakery ordering system.

## Overview

A responsive, production-ready bakery website that lets customers browse the menu, view speciality items, search products, build an order via a cart, and submit orders to the backend API. It also includes a fully functional contact form.

### Tech Stack

- **React 19** — UI library with hooks
- **Vite 5** — Build tool and dev server
- **@vitejs/plugin-react** — Fast Refresh and JSX support
- **CSS** — Vanilla CSS with CSS custom properties (no CSS framework)

### Key Features

- **Dynamic Menu** — Fetches and renders regular menu items from the backend API, with a local fallback catalog when the backend is unavailable
- **Dynamic Speciality Section** — Fetches and renders speciality items; each card is clickable and opens the Quantity Modal (identical behaviour to menu items)
- **Offline-Friendly Fallback Data** — Ships with built-in product data and inline SVG placeholders so the menu and speciality sections still render cleanly without external image hosts
- **Dynamic Cart** — React Context-based cart with duplicate-item merging and live total calculation
- **Dynamic Order Submission** — Submits cart items to the backend with customer name validation
- **Product Search** — Modal-based search across all products
- **Quantity Selection** — Modal with input validation (1–100 range)
- **Contact Form** — Client-side validation, `mailto:` email composition, success feedback, and form reset
- **Responsive Design** — Mobile-first with hamburger navigation and adaptive grid layouts

## Architecture

```
Home-page/
├── .git/                   # Git metadata for the GitHub repository
├── .gitignore             # Ignore generated frontend outputs
├── index.html              # HTML entry point (loads Vite bundle)
├── package-lock.json       # Locked dependency versions
├── package.json            # Dependencies and scripts
├── README.md               # Frontend documentation
├── src/
│   ├── main.jsx            # React entry point (mounts App into #root)
│   ├── App.jsx             # Root component — orchestrates all state and modals
│   ├── styles/
│   │   └── App.css         # Global styles (CSS custom properties, responsive)
│   ├── components/
│   │   ├── About/          # About Us section
│   │   ├── Cart/           # Order summary + submit button
│   │   ├── Contact/        # Contact info + functional contact form
│   │   ├── CustomerModal/  # Customer name input modal (pre-order submission)
│   │   ├── Footer/         # Site footer
│   │   ├── Hero/           # Landing section with CTA
│   │   ├── Menu/           # Regular menu product grid
│   │   ├── Navbar/         # Fixed navigation with mobile hamburger
│   │   ├── ProductCard/    # Reusable product card (menu + speciality variants)
│   │   ├── QuantityModal/  # Quantity selection modal
│   │   ├── SearchModal/    # Product search modal
│   │   └── Speciality/     # Speciality product grid
│   ├── context/
│   │   └── CartContext.jsx # Cart state management (React Context)
│   ├── data/
│   │   └── products.js     # Fallback product catalog used when API data is unavailable
│   ├── hooks/
│   │   ├── useBodyScrollLock.js  # Locks body scroll when modals are open
│   │   └── useEscapeKey.js       # Closes modals on Escape key
│   ├── services/
│   │   ├── api.js          # Low-level fetch wrapper with error handling
│   │   ├── products.js     # Product API calls (fetch all, menu, speciality)
│   │   └── orders.js       # Order API call (create order)
│   └── utils/
│       └── calculateTotal.js  # Cart total calculation + currency formatting
├── style.css               # Legacy CSS (not imported by the app)
└── vite.config.js          # Vite config with dev-server proxy to backend
```

### Component Hierarchy

```
App (CartProvider)
├── Navbar
├── Hero
├── About
├── Menu
│   └── ProductCard (variant="menu")
├── Cart
├── Speciality
│   └── ProductCard (variant="speciality")
├── Contact
├── Footer
├── SearchModal
├── QuantityModal
└── CustomerModal
```

### State Management

- **CartContext** (`src/context/CartContext.jsx`): Provides `cartItems`, `addItem`, `removeItem`, and `setCartItems` via React Context. The `addItem` function merges duplicate items by `product.id`, incrementing the quantity.
- **App-level state** (`src/App.jsx`): Manages modal visibility (`isQuantityOpen`, `isCustomerOpen`, `isSearchOpen`), selected product, product lists, loading/error states, and order submission state.

### API Integration

The frontend communicates with the FastAPI backend through a layered service architecture:

- **`services/api.js`**: Low-level `apiRequest()` wrapper around `fetch()` with automatic JSON parsing, error handling (`ApiError`), and `unwrapSuccessData()` helper for the standard `{ success, message, data }` envelope.
- **`services/products.js`**: `fetchProducts()` and `fetchSpecialityProducts()` — normalize backend product fields (`product_id` → `id`, `product_name` → `name`, `image_url` → `image`, etc.) into a frontend-friendly shape.
- **`services/orders.js`**: `createOrder()` — POSTs the order payload to `/api/v1/orders`.

The Vite dev server proxies `/api` requests to `http://127.0.0.1:8000` (the backend).

### Product Data Flow

1. On mount, `App.jsx` fetches all products and speciality products in parallel via `Promise.allSettled`.
2. `services/products.js` normalizes API responses and falls back to a local product catalog when the backend returns no data or is unavailable.
3. Menu items are filtered from the full product list (`!item.is_special`).
4. Both `Menu` and `Speciality` render `ProductCard` components.
5. Clicking any product (menu or speciality) calls `handleSelectProduct`, which sets the selected product and opens the `QuantityModal`.
6. Confirming the quantity calls `addItem` on the `CartContext`, which merges duplicates.
7. The `Cart` component displays all cart items with subtotals and a total.
8. Clicking "Submit Order" opens the `CustomerModal` for name entry.
9. Confirming the customer name sends the order to the backend via `createOrder()`.

### Contact Form

The contact form is fully client-side:
- **Validation**: All fields required, email format validation, whitespace trimming.
- **Submission**: Composes a `mailto:` link to `12302040701074@mbit.edu.in` with subject "Website Contact Form" and body containing the user's name, email, and message.
- **UX**: Button disabled and labeled "Sending..." during processing, success feedback shown after submission, form reset on success, and multiple submissions prevented via an `isProcessing` guard.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `/api/v1` | Base URL for API requests |

## Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview the production build locally
```

## Development

### Prerequisites

- Node.js 20+
- The backend API running on `http://127.0.0.1:8000` (or update the Vite proxy in `vite.config.js`)

### Quick Start

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`. The Vite dev server proxies `/api` requests to the backend automatically.

### Production Build

```bash
npm run build
```

The build output is in `dist/`. Serve it with any static file server:

```bash
npx serve dist
```

## Styling

All styles are in `src/styles/App.css` using CSS custom properties for theming:

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#fff8f0` | Page background |
| `--surface` | `#ffffff` | Card/surface background |
| `--surface-soft` | `#fef5ea` | Speciality card background |
| `--accent` | `#e8a87c` | Primary accent (buttons, links) |
| `--accent-dark` | `#d4a574` | Darker accent (gradients) |
| `--text` | `#3e2723` | Primary text |
| `--text-soft` | `#6d4c41` | Secondary text |
| `--muted` | `#8d6e63` | Muted text |
| `--border` | `#f5e6d3` | Border color |
| `--blue` | `#2f6fed` | Order button color |
| `--blue-dark` | `#245bd0` | Order button hover |

The design is responsive with breakpoints at 992px, 768px, and 540px.
