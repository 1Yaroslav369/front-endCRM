import styles from './NewOrder.module.scss';
import { useNavigate } from 'react-router-dom';

const NewOrderPage = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1>Create Order</h1>
      </div>

      <form className={styles.form}>
        {/* CLIENT */}

        <div className={styles.section}>
          <h2>Client</h2>

          <div className={styles.field}>
            <label>Client </label>

            <input
              type="text"
              placeholder="Search client..."
            />
          </div>
        </div>

        {/* ORDER DETAILS */}

        <div className={styles.section}>
          <h2>Order Details</h2>

          <div className={styles.field}>
            <label>Title </label>

            <input
              type="text"
              placeholder="Order title"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Deadline</label>

              <input type="date" />
            </div>

            <div className={styles.field}>
              <label>Status</label>

              <select>
                <option>New</option>
                <option>In production</option>
                <option>Installation</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* FINANCE */}

        <div className={styles.section}>
          <h2>Finance</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Total price</label>

              <input
                type="number"
                placeholder="0"
              />
            </div>

            <div className={styles.field}>
              <label>VAT</label>

              <select>
                <option value="23">23%</option>

                <option value="8">8%</option>

                <option value="5">5%</option>

                <option value="0">0%</option>
              </select>
            </div>
          </div>
        </div>

        {/* COMMENT */}

        <div className={styles.section}>
          <h2>Additional Information</h2>

          <div className={styles.field}>
            <label>Comment</label>

            <textarea placeholder="Additional notes..." />
          </div>
        </div>

        {/* BUTTONS */}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => navigate('/orders')}>
            Cancel
          </button>

          <button type="submit">Create Order</button>
        </div>
      </form>
    </section>
  );
};

export default NewOrderPage;
