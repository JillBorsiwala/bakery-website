import { apiRequest, unwrapSuccessData } from './api';

function normalizeProduct(product) {
  return {
    id: product.product_id,
    product_id: product.product_id,
    name: product.product_name,
    price: Number(product.price),
    description: product.description,
    category: product.category,
    image: product.image_url,
    badge: product.is_special ? 'Speciality' : undefined,
    is_special: product.is_special,
    created_at: product.created_at,
  };
}

function normalizeProducts(products) {
  return products.map(normalizeProduct);
}

export async function fetchProducts() {
  const payload = await apiRequest('/products');
  return normalizeProducts(unwrapSuccessData(payload) ?? []);
}

export async function fetchSpecialityProducts() {
  const payload = await apiRequest('/products/speciality');
  return normalizeProducts(unwrapSuccessData(payload) ?? []);
}
