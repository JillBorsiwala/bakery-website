const fallbackTimestamp = '2026-08-30T00:00:00Z';

function createProductImage(label, backgroundColor, accentColor) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600" fill="none">
      <rect width="900" height="600" rx="48" fill="${backgroundColor}" />
      <circle cx="680" cy="140" r="120" fill="${accentColor}" fill-opacity="0.24" />
      <circle cx="210" cy="470" r="160" fill="#fff" fill-opacity="0.18" />
      <path d="M170 400C170 305 247 228 342 228H558C653 228 730 305 730 400V406C730 471 677 524 612 524H288C223 524 170 471 170 406V400Z" fill="#fff" fill-opacity="0.82" />
      <path d="M235 371C235 334 265 304 302 304H598C635 304 665 334 665 371V389C665 421 639 447 607 447H293C261 447 235 421 235 389V371Z" fill="${accentColor}" fill-opacity="0.18" />
      <path d="M282 300C282 247 325 204 378 204H522C575 204 618 247 618 300" stroke="${accentColor}" stroke-width="18" stroke-linecap="round" />
      <text x="450" y="292" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700" fill="#5D4037">${label}</text>
      <text x="450" y="352" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#7a5b4f">Freshly baked special</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
}

const fallbackProducts = [
  {
    id: 101,
    product_id: 101,
    name: 'Butter Croissant',
    price: 80,
    description: 'Flaky, golden, and baked fresh every morning.',
    category: 'pastry',
    image: createProductImage('Croissant', '#f7d9b8', '#e8a87c'),
    is_special: false,
    created_at: fallbackTimestamp,
  },
  {
    id: 102,
    product_id: 102,
    name: 'Choco Chip Muffin',
    price: 95,
    description: 'Soft vanilla muffin loaded with chocolate chips.',
    category: 'muffin',
    image: createProductImage('Muffin', '#f2c9bf', '#d97d54'),
    is_special: false,
    created_at: fallbackTimestamp,
  },
  {
    id: 103,
    product_id: 103,
    name: 'Milk Bread Loaf',
    price: 120,
    description: 'Tender, pillowy loaf perfect for toast and sandwiches.',
    category: 'bread',
    image: createProductImage('Bread', '#ead7bd', '#c18b51'),
    is_special: false,
    created_at: fallbackTimestamp,
  },
  {
    id: 104,
    product_id: 104,
    name: 'Blueberry Danish',
    price: 110,
    description: 'Buttery layers finished with a glossy berry glaze.',
    category: 'danish',
    image: createProductImage('Danish', '#f4ddd3', '#d59b78'),
    is_special: false,
    created_at: fallbackTimestamp,
  },
  {
    id: 105,
    product_id: 105,
    name: 'Red Velvet Slice',
    price: 150,
    description: 'Velvety cake with cream cheese frosting and cocoa crumb.',
    category: 'cake',
    image: createProductImage('Cake', '#f1d3cf', '#c96b63'),
    is_special: false,
    created_at: fallbackTimestamp,
  },
  {
    id: 201,
    product_id: 201,
    name: 'Saffron Pistachio Tart',
    price: 220,
    description: 'A rich tart with saffron custard, pistachios, and almond crust.',
    category: 'signature',
    image: createProductImage('Tart', '#f0e0b8', '#c29a4b'),
    badge: 'House Special',
    is_special: true,
    created_at: fallbackTimestamp,
  },
  {
    id: 202,
    product_id: 202,
    name: 'Triple Chocolate Dome',
    price: 240,
    description: 'Decadent mousse cake with a glossy ganache finish.',
    category: 'signature',
    image: createProductImage('Chocolate', '#eed6d0', '#9f5f56'),
    badge: 'Bestseller',
    is_special: true,
    created_at: fallbackTimestamp,
  },
  {
    id: 203,
    product_id: 203,
    name: 'Rose Berry Cheesecake',
    price: 230,
    description: 'Silky cheesecake layered with rose cream and berry compote.',
    category: 'signature',
    image: createProductImage('Cheesecake', '#ead9e8', '#a56b95'),
    badge: 'Chef Pick',
    is_special: true,
    created_at: fallbackTimestamp,
  },
  {
    id: 204,
    product_id: 204,
    name: 'Caramel Crunch Eclair',
    price: 190,
    description: 'Choux pastry filled with caramel cream and praline crunch.',
    category: 'signature',
    image: createProductImage('Eclair', '#f1dfcb', '#b27b52'),
    badge: 'Limited',
    is_special: true,
    created_at: fallbackTimestamp,
  },
];

export function getFallbackProducts() {
  return fallbackProducts.map((product) => ({ ...product }));
}

export function getFallbackSpecialityProducts() {
  return fallbackProducts
    .filter((product) => product.is_special)
    .map((product) => ({ ...product }));
}
