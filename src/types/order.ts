export type OrderStatus =
  | 'OFFER_ACCEPTED'
  | 'ADVANCE_PAID'
  | 'IN_PRODUCTION'
  | 'READY'
  | 'DELIVERED'
  | 'INSTALLATION'
  | 'COMPLETED'
  | 'SETTLED';

export interface Order {
  id: number;

  orderNumber: string;

  client: string;

  amount: number;

  advance: number;

  remaining: number;

  installationDate: string;

  margin: number;

  manager: string;

  status: OrderStatus;
}
