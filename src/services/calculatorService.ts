import api from '../api/axios';

import type {
  CalculatorConfig,
  CalculatorResult,
  CreateCalculatorData,
} from '../types/calculator';

// Get calculator configuration for a product
export const getCalculatorConfig = async (
  productId: number,
): Promise<CalculatorConfig> => {
  const response = await api.get(`/calculator/${productId}`);

  return response.data.data;
};

// Create and calculate a calculator item
export const createCalculator = async (
  data: CreateCalculatorData,
): Promise<CalculatorResult> => {
  const response = await api.post('/calculator', data);

  return response.data.data;
};
