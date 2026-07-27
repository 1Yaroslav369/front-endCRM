import type { Order } from '../types/order';

export const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    client: 'Jan Kowalski',
    amount: 25000,
    advance: 5000,
    remaining: 20000,
    installationDate: '12.08.2026',
    margin: 7000,
    manager: 'Victor',
    status: 'IN_PRODUCTION',
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    client: 'Adam Nowak',
    amount: 18500,
    advance: 8000,
    remaining: 10500,
    installationDate: '15.08.2026',
    margin: 4300,
    manager: 'Victor',
    status: 'INSTALLATION',
  },
];
