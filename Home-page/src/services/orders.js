import { apiRequest, unwrapSuccessData } from './api';

export async function createOrder(orderPayload) {
  const payload = await apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(orderPayload),
  });

  return unwrapSuccessData(payload);
}
