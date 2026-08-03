import api from '../api/axios';

import type { Order } from '../types/order';

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders');

  return response.data;
};

export const getClientOrders = async (clientId: number): Promise<Order[]> => {
  const response = await api.get(`/orders?client_id=${clientId}`);

  return response.data;
};
