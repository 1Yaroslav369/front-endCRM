import { useEffect, useState } from 'react';

import { getClients } from '../../services/clientService';
import type { Client } from '../../types/client';

import ClientsTable from '../../components/ClientsTable/ClientsTable';
import Button from '../../components/Buttons/AddButon';
import CreateClientModal from '../../components/ClientModal/ClientsModal';
import styles from './ClientsPage.module.scss';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const refreshClients = async () => {
    try {
      const data = await getClients();

      setClients(data);
    } catch (error) {
      console.error('Failed to refresh clients', error);
    }
  };

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await getClients();

        setClients(data);
      } catch (error) {
        console.error('Failed to fetch clients', error);
      } finally {
        setLoading(false);
      }
    };

    void loadClients();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.titleHidden}>Clients</h1>

        <Button onClick={() => setIsCreateModalOpen(true)}>Add Client</Button>
      </div>

      <ClientsTable
        clients={clients}
        refreshClients={refreshClients}
      />

      {isCreateModalOpen && (
        <CreateClientModal
          mode="create"
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={refreshClients}
        />
      )}
    </div>
  );
};

export default ClientsPage;
