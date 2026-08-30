import { apiRequest, unwrapSuccessData } from './api';
import { getFallbackProducts, getFallbackSpecialityProducts } from '../data/products';

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

function withFallbackProducts(products, fallbackProducts, predicate = () => true) {
  const normalizedProducts = normalizeProducts(Array.isArray(products) ? products : []);
  const filteredProducts = normalizedProducts.filter(predicate);

  if (filteredProducts.length > 0) {
    return filteredProducts;
  }

  return fallbackProducts();
}

export async function fetchProducts() {
  try {
    const payload = await apiRequest('/products');
    return withFallbackProducts(
      unwrapSuccessData(payload) ?? [],
      getFallbackProducts,
      (product) => !product.is_special,
    );
  } catch {
    return getFallbackProducts();
  }
}

export async function fetchSpecialityProducts() {
  try {
    const payload = await apiRequest('/products/speciality');
    return withFallbackProducts(
      unwrapSuccessData(payload) ?? [],
      getFallbackSpecialityProducts,
      (product) => product.is_special,
    );
  } catch {
    return getFallbackSpecialityProducts();
  }
}
