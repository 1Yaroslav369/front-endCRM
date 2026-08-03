import { useState } from 'react';
import Button from '../Buttons/AddButon';
import { archiveClient } from '../../services/clientService';
import type { Client } from '../../types/client';
import ClientModal from '../ClientModal/ClientsModal';
import styles from './ClientActions.module.scss';

interface Props {
  client: Client;
}

const ClientActions = ({ client }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleArchive = async () => {
    try {
      await archiveClient(client.id);
    } catch (error) {
      console.error('Archive client failed', error);
    }
  };

  return (
    <>
      <Button
        className={styles.edit}
        onClick={() => setIsEditOpen(true)}>
        Edit
      </Button>

      <Button
        className={styles.archive}
        onClick={handleArchive}>
        Archive
      </Button>

      {isEditOpen && (
        <ClientModal
          mode="edit"
          client={client}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            setIsEditOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ClientActions;
