import styles from './OrdersTable.module.scss';
import type { Order } from '../../types/order';

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Order</th>
          <th>Client</th>
          <th>Title</th>
          <th>Price</th>
          <th>Status</th>
          <th>Manager</th>
          <th>Deadline</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.order_number}</td>
            <td>{order.client_name}</td>
            <td>{order.title}</td>
            <td>{Number(order.total_price).toFixed(2)} PLN</td>
            <td>{order.status}</td>
            <td>{order.created_by_name}</td>
            <td>
              {order.deadline
                ? new Date(order.deadline).toLocaleDateString()
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
