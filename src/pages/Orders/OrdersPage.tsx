import { useEffect, useState } from 'react';
import OrdersTable from '../../components/OrdersTable/OrdersTable';
import { getOrders } from '../../services/orderService';
import type { Order } from '../../types/order';
import styles from './Orders.module.scss';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to load orders', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className={styles.orders}>
      <div className={styles.header}>
        <h1>Orders</h1>

        <button>Create Order</button>
      </div>

      <OrdersTable orders={orders} />
    </section>
  );
};

export default OrdersPage;
