// Supported currencies used by the calculator
export type CalculatorCurrency = 'EUR' | 'UAH' | 'PLN';

// Door side
export type DoorSide = 'A' | 'B';

// Opening calculation mode
export type OpeningMode = 'AUTO' | 'CUSTOM';

// Product option categories
export type CalculatorOptionCategory = 'FILLING' | 'PROFILE_FINISH';

// Supported option pricing types
export type CalculatorOptionPricingType = 'FIXED' | 'PER_PIECE' | 'PER_M2';

// Supported service pricing types
export type CalculatorServicePricingType =
  | 'FIXED'
  | 'PER_PIECE'
  | 'PER_M2'
  | 'PER_METER'
  | 'BY_SIZE'
  | 'RULE';

// Product returned by the calculator configuration
export interface CalculatorProduct {
  id: number;
  supplier_id: number;
  name: string;
  code: string;
  is_active: number;
}

// Product option returned by the calculator configuration
export interface CalculatorOption {
  id: number;
  product_id: number;
  name: string;
  code: string;
  category: CalculatorOptionCategory;
  pricing_type: CalculatorOptionPricingType;
  price: number;
  currency: CalculatorCurrency;
  is_active: number;
}

// Lock option
export interface CalculatorLock {
  id: number;
  product_id: number;
  name: string;
  code: string;
  price: number;
  currency: CalculatorCurrency;
  is_active: number;
}

// Handle option
export interface CalculatorHandle {
  id: number;
  product_id: number;
  name: string;
  code: string;
  price: number;
  currency: CalculatorCurrency;
  is_active: number;
}

// Ventilation option
export interface CalculatorVentilation {
  id: number;
  product_id: number;
  name: string;
  code: string;
  price: number;
  currency: CalculatorCurrency;
  is_active: number;
}

// Product service
export interface CalculatorService {
  id: number;
  product_id: number;
  name: string;
  code: string;
  pricing_type: CalculatorServicePricingType;
  price: number;
  currency: CalculatorCurrency;
  is_active: number;
}

// Side of a door variant
export interface CalculatorSide {
  side: DoorSide;
  option_id: number;
}

// Additional service assigned to a door variant
export interface CalculatorVariantService {
  service_id: number;
  quantity: number;
  rule_code?: string | null;
}

// One door variant sent to the backend
export interface CalculatorVariant {
  variant_number: number;
  door_code: string;

  quantity: number;
  room?: string | null;

  leaf_width: number;
  leaf_height: number;

  opening_mode?: OpeningMode;
  opening_width?: number | null;
  opening_height?: number | null;

  lock_code?: string | null;
  handle_code?: string | null;
  ventilation_code?: string | null;

  lock_option_id?: number | null;
  handle_option_id?: number | null;
  ventilation_option_id?: number | null;

  custom_handle_cost?: number | null;
  custom_handle_currency?: CalculatorCurrency;

  sides: CalculatorSide[];

  services?: CalculatorVariantService[];
}

// Data required to create a calculator item
export interface CreateCalculatorData {
  product_id: number;
  title: string;

  side_a_option_id?: number | null;
  side_b_option_id?: number | null;

  profile_finish_option_id?: number | null;

  installation_enabled: boolean;

  vat: 0 | 5 | 8 | 23;

  eur_rate: number;
  uah_to_pln_rate?: number | null;

  markup_percent?: number;
  discount_percent?: number;

  variants: CalculatorVariant[];
}

// Product calculator configuration
export interface CalculatorConfig {
  product: CalculatorProduct;
  options: CalculatorOption[];
  services: CalculatorService[];
  locks: CalculatorLock[];
  handles: CalculatorHandle[];
  ventilations: CalculatorVentilation[];
}

// Variant returned after calculation
export interface CalculatedVariant {
  id: number;

  variant_number: number;
  door_code: string;

  quantity: number;

  leaf_width: number;
  leaf_height: number;

  opening_mode: OpeningMode;
  opening_width: number;
  opening_height: number;

  price_pln: number;
}

// Calculator result returned by POST /calculator
export interface CalculatorResult {
  calculator_item_id: number;

  product_id: number;
  title: string;

  currency: 'PLN';

  vat: 0 | 5 | 8 | 23;

  eur_rate: number;
  uah_to_pln_rate: number | null;

  markup_percent: number;
  discount_percent: number;

  total_cost_eur: number;
  total_before_discount_eur: number;
  total_discount_eur: number;

  total_net_pln: number;
  vat_amount_pln: number;
  total_gross_pln: number;

  variants: CalculatedVariant[];
}

// GET /calculator/:productId response
export interface CalculatorConfigResponse {
  status: number;
  data: CalculatorConfig;
}

// POST /calculator response
export interface CalculatorResponse {
  status: number;
  message: string;
  data: CalculatorResult;
}
