export type OrderStatus =
  | 'NEW'
  | 'OFFER'
  | 'ACCEPTED'
  | 'PRODUCTION'
  | 'READY'
  | 'INSTALLATION'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Order {
  id: number;

  client_id: number;

  client_name: string;

  order_number: string;

  title: string;

  status: OrderStatus;

  total_price: number;

  deadline: string | null;

  comment: string | null;

  created_by: number;

  created_by_name: string;

  created_at: string;
}
