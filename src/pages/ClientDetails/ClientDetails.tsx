import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getClientById } from '../../services/clientService';
import type { Client } from '../../types/client';
import styles from './ClientDetails.module.scss';
import { getClientOrders } from '../../services/orderService';
import ClientActions from '../../components/ClientActions/ClientActions';

interface Order {
  id: number;
  order_number: string;
  status: string;
  total_price: number | string;
}

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState<Client | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleArchive = async () => {
    navigate('/clients');
  }

  const loadClient = async () => {
    if (!id) return;
    const clientId = Number(id);

    const data = await getClientById(clientId);

    setClient(data);

    const clientOrders = await getClientOrders(clientId);

    setOrders(clientOrders);
  };

  useEffect(() => {
    if (!id) return;

    const fetchClient = async () => {
      const clientId = Number(id);

      const data = await getClientById(clientId);

      setClient(data);

      const clientOrders = await getClientOrders(clientId);

      setOrders(clientOrders);
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

            {orders.length === 0 ? (
              <div className={styles.empty}>No orders yet</div>
            ) : (
              <div>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={styles.order}>
                    <strong>
                      <Link to={`/orders/${order.id}`}>
                        {order.order_number}
                      </Link>
                    </strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Statistics</h2>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span>Total Orders</span>
                <strong>{orders.length}</strong>
              </div>

              <div className={styles.stat}>
                <span>Active Orders</span>
                <strong>
                  {orders.filter((order) => order.status === 'active').length}
                </strong>
              </div>

              <div className={styles.stat}>
                <span>Completed</span>
                <strong>
                  {
                    orders.filter((order) => order.status === 'completed')
                      .length
                  }
                </strong>
              </div>

              <div className={styles.stat}>
                <span>Total Revenue</span>
                <strong>
                  {orders
                    .reduce(
                      (total, order) => total + Number(order.total_price),
                      0,
                    )
                    .toFixed(2)}{' '}
                  PLN
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientActions
      onUpdated={loadClient}
      onArchived={handleArchive}
      client={client} />

      <button
        className={styles.backButton}
        onClick={() => navigate('/clients')}>
        Back to Clients
      </button>
    </div>
  );
};

export default ClientDetails;
