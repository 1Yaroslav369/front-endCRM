import styles from "./OrdersTable.module.scss";
import  {mockOrders}  from "../../mock/orders";

const OrdersTable = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>№</th>
          <th>Client</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Advance</th>
          <th>Remaining</th>
          <th>Installation</th>
          <th>Margin</th>
          <th>Manager</th>
        </tr>
      </thead>

      <tbody>
        {mockOrders.map((order) => (
          <tr key={order.id}>
            <td>{order.orderNumber}</td>
            <td>{order.client}</td>
            <td>{order.amount}</td>
            <td>{order.status}</td>
            <td>{order.advance}</td>
            <td>{order.remaining}</td>
            <td>{order.installationDate}</td>
            <td>{order.margin}</td>
            <td>{order.manager}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;