import { useNavigate } from "react-router-dom";
import styles from './NewOrder.module.scss';


const NewOrderPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.newOrder}>
      <h1 className={styles.title}>New Order Page</h1>
      <button className={styles.backButton} onClick={() => navigate('/orders')}>back to Orders</button>
    </div>
  );
}

export default NewOrderPage;