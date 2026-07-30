import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getClientById } from '../../services/clientService';

import type { Client } from '../../types/client';

import styles from './ClientDetails.module.scss';

const ClientDetails = () => {
  const { id } = useParams();

  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchClient = async () => {
      const data = await getClientById(Number(id));

      setClient(data);
    };

    fetchClient();
  }, [id]);

  if (!client) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{client.name}</h1>
          <span>Client Card</span>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Client Information</h2>

            <div className={styles.info}>
              <div className={styles.item}>
                <span>NIP</span>
                <strong>{client.nip}</strong>
              </div>

              <div className={styles.item}>
                <span>Phone</span>
                <strong>{client.phone}</strong>
              </div>

              <div className={styles.item}>
                <span>Email</span>
                <strong>{client.email}</strong>
              </div>

              <div className={styles.item}>
                <span>City</span>
                <strong>{client.city}</strong>
              </div>

              <div className={styles.item}>
                <span>Address</span>
                <strong>{client.address}</strong>
              </div>

              <div className={styles.item}>
                <span>Created By</span>
                <strong>{client.created_by_name}</strong>
              </div>

              <div className={styles.item}>
                <span>Created</span>
                <strong>
                  {new Date(client.created_at).toLocaleDateString()}
                </strong>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Recent Orders</h2>

            <div className={styles.empty}>No orders yet</div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Statistics</h2>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span>Total Orders</span>
                <strong>0</strong>
              </div>

              <div className={styles.stat}>
                <span>Active Orders</span>
                <strong>0</strong>
              </div>

              <div className={styles.stat}>
                <span>Completed</span>
                <strong>0</strong>
              </div>

              <div className={styles.stat}>
                <span>Total Revenue</span>
                <strong>0 PLN</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
      className={styles.backButton}
      onClick={() => window.history.back()}>Back to Clients</button>
    </div>
  );
};

export default ClientDetails;
