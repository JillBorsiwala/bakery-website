const fallbackTimestamp = '2026-08-30T00:00:00Z';

const fallbackProducts = [
  {
    id: 101,
    product_id: 101,
    name: 'Butter Croissant',
    price: 80,
    description: 'Flaky, golden, and baked fresh every morning.',
    category: 'pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
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
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800',
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
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800',
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
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800',
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
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800',
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
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800',
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
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
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
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800',
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
    image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800',
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
