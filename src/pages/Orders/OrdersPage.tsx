import OrdersTable from "../../components/OrdersTable/OrdersTable";
import styles from "./Orders.module.scss";

const OrdersPage = () => {
  return (
    <section className={styles.orders}>
      <div className={styles.header}>
        <h1>Orders</h1>

        <button>Create Order</button>
      </div>

      <OrdersTable />
    </section>
  );
};

export default OrdersPage;